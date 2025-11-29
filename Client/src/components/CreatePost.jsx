import {
  useMutation,
  useQuery,
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query";
import React, { useState } from "react";
const createPost = async (newPost) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  });
  return response.json();
};

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createPost,
    onMutate: async (newPost) => {
      await queryClient.cancelQueries(["posts"]);
      const previousPosts = queryClient.getQueryData(["posts"]);

      queryClient.setQueryData(["posts"], (old) => [
        ...(old || []),
        { id: Date.now(), ...newPost },
      ]);

      return { previousPosts };
    },

    onError: (error, newPost, context) => {
      queryClient.setQueryData(["posts"], context.previousPosts);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const sumbmitPost = (e) => {
    e.preventDefault();
    console.log("Post Submitted:", title);
    mutate({ title: title, body: "This is a new post." });
    setTitle(""); // درست همین‌جا!
  };

  return (
    <div className="flex justify-center py-20">
      <form onSubmit={sumbmitPost} className="flex items-center gap-x-5">
        <input
          type="text"
          className="rounded-md border focus:outline-none focus:ring-1 py-2 px-2 w-[300px] ring-emerald-200"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Post Title..."
          value={title}
        />
        <button
          type="submit"
          className="border bg-gray-300 rounded-md py-2 px-4 cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
