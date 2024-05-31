const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv/config");
const cors = require("cors");

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err.stack);
    return;
  }
  console.log("Connected to MySQL as ID: " + connection.threadId);

  // Create database if not exists
  connection.query(
    `CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DATABASE}`,
    (err, result) => {
      if (err) {
        console.error("Error creating database: " + err.message);
        return;
      }
      console.log("Database created (if it did not exist)");
    }
  );

  // Create table if not exists
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS Message (
      id INT AUTO_INCREMENT PRIMARY KEY,
      sender VARCHAR(255),
      category VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      shortDescription VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      replies INT DEFAULT 0,
      views INT DEFAULT 0,
      imageURL VARCHAR(255),
      URL VARCHAR(255)
    )
  `;
  connection.query(createTableQuery, (err, result) => {
    if (err) {
      console.error("Error creating table: " + err.message);
      return;
    }
    console.log("Table created (if it did not exist)");
  });
});

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

// Your routes...
app.post("/blogs", (req, res) => {
  const { sender, category, title, shortDescription, content, imageURL, URL,password } =
    req.body;
  const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");

  if(password !== process.env.BLOG_CREATION_PASSWORD) return res.status(401).json({ error: "Unauthorized" });
  const query =
    "INSERT INTO Message (sender, category, title, shortDescription, content, timestamp, imageURL, URL) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  connection.query(
    query,
    [
      sender,
      category,
      title,
      shortDescription,
      content,
      timestamp,
      imageURL,
      URL,
    ],
    (err, results) => {
      if (err) {
        console.error("Error inserting new blog: " + err.message);
        res.status(500).json({ error: err.message });
        return;
      }
      console.log("New blog inserted with ID: " + results.insertId);
      res.status(201).json({ id: results.insertId });
    }
  );
});

app.get("/categories", (req, res) => {
  const query = "SELECT DISTINCT category FROM Message";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching categories: " + err.message);
      res.status(500).json({ error: err.message });
      return;
    }
    if (!results || results.length === 0) {
      console.log("No categories found");
      res.status(404).json({ error: "No categories found" });
      return;
    }
    res.status(200).json(results);
  });
});

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM Message WHERE id = ?";
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching blog: " + err.message);
      res.status(500).json({ error: err.message });
      return;
    }
    if (!results || results.length === 0) {
      console.log("Blog not found");
      res.status(404).json({ error: "Blog not found" });
      return;
    }
    // Update blog views
    const updateViewsQuery =
      "UPDATE Message SET views = views + 1 WHERE id = ?";
    connection.query(updateViewsQuery, [id], (err, result) => {
      if (err) {
        console.error("Error updating blog views: " + err.message);
        res.status(500).json({ error: err.message });
        return;
      }
      console.log("Blog views updated");
      res.status(200).json(results[0]);
    });
  });
});

app.get("/blogs/category/:category", (req, res) => {
  const category = req.params.category;
  const query =
    category === "All"
      ? "SELECT * FROM Message ORDER BY timestamp DESC LIMIT 20"
      : "SELECT * FROM Message WHERE category = ? ORDER BY timestamp DESC";
  const params = category === "All" ? [] : [category];

  connection.query(query, params, (err, results) => {
    if (err) {
      console.error("Error fetching blogs: " + err.message);
      res.status(500).json({ error: err.message });
      return;
    }
    if (!results || results.length === 0) {
      console.log("No blogs found");
      res.status(404).json({ error: "No blogs found" });
      return;
    }

    res.status(200).json(results);
  });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
