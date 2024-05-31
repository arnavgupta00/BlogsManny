import Message from "@/components/schema/schema";

export default function messageList(): Message[] {
  const messages = [];

  const names = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Emily",
    "Frank",
    "Grace",
    "Henry",
    "Isabella",
    "Jack",
    "Katherine",
    "Liam",
    "Mia",
    "Noah",
    "Olivia",
    "Peter",
    "Quinn",
    "Ryan",
    "Sophia",
    "Thomas",
  ];

  const titles = [
    "Travel Tips for Budget-Conscious Backpackers",
    "The Ultimate Guide to Starting a Successful Blog",
    "10 Must-Have Skills for Landing Your Dream Job",
    "Healthy and Delicious Recipes for Busy Weeknights",
    "How to Master the Art of Public Speaking",
    "The Future of Artificial Intelligence: Opportunities and Challenges",
    "Tips for Building a Sustainable and Eco-Friendly Home",
    "Exploring the Wonders of the Natural World",
    "The Importance of Mental Health and Well-being",
    "Personal Finance Basics: Budgeting, Saving, and Investing",
  ];

  const content = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  ];

  const categories = [
    "Technology",
    "Science",
    "Art",
    "Music",
    "Sports",
    "Politics",
    "Fashion",
    "Food",
    "Travel",
    "Health",
    "Fitness",
    "Lifestyle",
    "Entertainment",
  ];

  for (let i = 1; i <= 20; i++) {
    const randomNameIndex = Math.floor(Math.random() * names.length);
    const randomTitleIndex = Math.floor(Math.random() * titles.length);
    const randomContentIndex = Math.floor(Math.random() * content.length);
    const randomCategoryIndex = Math.floor(Math.random() * categories.length);

    const message : Message = {
      id: i,
      sender: names[randomNameIndex],
      title: titles[randomTitleIndex],
      content: content[randomContentIndex],
      shortDescription: "This is a short description.",
      category: categories[randomCategoryIndex],
      timestamp: new Date().toLocaleString(),
      replies: Math.floor(Math.random() * 10),
      views: Math.floor(Math.random() * 100),
    };
    messages.push(message);
  }

  return messages;
}

export const catergoriesList = [
  "Technology",
  "Science",
  "Art",
  "Music",
  "Sports",
  "Politics",
  "Fashion",
  "Food",
  "Travel",
  "Health",
  "Fitness",
  "Lifestyle",
  "Entertainment",
];