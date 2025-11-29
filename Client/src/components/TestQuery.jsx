import React from "react";
import { useQuery } from "@tanstack/react-query";

const fetchData = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const TestQuery = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchData,
  });
  if (isLoading) return <div>
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  </div>;
  if (error) return <div>
    <div>
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
            <div>
                <img src="no-data.svg" alt="errore ocure image" className="h-[150px]" />
            </div>
            <div className="text-center">
                Error: {error.message}
            </div>
        </div>
    </div>
  </div>;
  return (
    <div className="max-w-5xl mx-auto ">
      <h2 className="text-2xl font-bold mb-4 py-5">Posts</h2>
      {data.map((post, index) => (
        <div key={index} className="mb-4 p-4 border-b ">
            <p>post {index + 1}</p>
          <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default TestQuery;
