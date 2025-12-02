import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";

const AddNewNews = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  // Mutation function
  const createNews = async (formData) => {
    const res = await fetch("http://localhost:5000/api/news", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to add news");

    return data;
  };

  // React Query Mutation
  const mutation = useMutation({
    mutationFn: createNews,
    onSuccess: () => {
      setMessage("News added successfully!");
      setTitle("");
      setContent("");
      setCategory("");
      setImage(null);
    },
    onError: (error) => {
      setMessage(error.message);
    },
  });

  // Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content || !category) {
      setMessage("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);

    if (image) formData.append("image", image);

    mutation.mutate(formData);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      {message && <p className="text-red-500 mb-3">{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 font-semibold">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="mt-4">
          <label className="block mb-1 font-semibold">Content *</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            rows={5}
            required
          />
        </div>

        <div className="mt-4">
          <label className="block mb-1 font-semibold">Category *</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="mt-4">
          <label className="block mb-1 font-semibold">Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full"
            accept="image/*"
          />
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="mt-5 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
        >
          {mutation.isPending ? "Adding..." : "Add News"}
        </button>
      </form>
    </div>
  );
};

export default AddNewNews;
