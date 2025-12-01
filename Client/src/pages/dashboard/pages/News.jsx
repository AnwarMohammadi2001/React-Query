import { useQuery } from "@tanstack/react-query";
import React from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchNews = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/api/news`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to fetch news");
  }
  return res.json();
};

const News = () => {
  const {
    data: news = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["news"],
    queryFn: fetchNews,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      {" "}
      <h2 className="text-2xl font-bold mb-6">News</h2>
      {news.length === 0 && <p className="text-gray-500">No news found.</p>}
      {news.map((item) => (
        <div
          key={item.id}
          className="mb-6 p-4 border rounded shadow-sm bg-white"
        >
          {" "}
          <h3 className="text-xl font-semibold">{item.title}</h3>{" "}
          <p className="text-gray-700 mt-2">{item.content}</p>
          {item.image && (
            <img
              src={`${BASE_URL}/uploads/${item.image}`}
              alt={item.title}
              className="mt-2 max-w-full h-auto rounded"
            />
          )}{" "}
          <p className="text-sm text-gray-500 mt-2">
            Category: <span className="font-medium">{item.category}</span>{" "}
          </p>
          {item.User && (
            <p className="text-sm text-gray-400 mt-1">
              Author: {item.User.name} ({item.User.email}){" "}
            </p>
          )}{" "}
          <p className="text-xs text-gray-400 mt-1">
            Created at: {new Date(item.createdAt).toLocaleString()}{" "}
          </p>{" "}
        </div>
      ))}{" "}
    </div>
  );
};

export default News;
