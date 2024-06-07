"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { SetloginState } from "./loginState";
import { useRouter } from "next/navigation";


export default function Admin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const handleSubmit = async (e: FormEvent) => {
    SetloginState(formData.email, formData.password);
    router.push("/admin");
  }


  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          Admin Login
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="AdminEmail"
              className="block text-sm font-medium text-gray-700"
            >
              Admin Email
            </label>
            <input
              type="email"
              id="AdminEmail"
              placeholder="Admin Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="AdminPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Admin Password
            </label>
            <input
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              type="password"
              id="AdminPassword"
              placeholder="Admin Password"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
