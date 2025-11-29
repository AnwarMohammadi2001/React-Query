import React from "react";

import QueryFetch from "../components/QueryFetch";
import News from "../components/Navbar/News";
import TestQuery from "../components/TestQuery";
import CreatePost from "../components/CreatePost";

const Home = () => {
  return (
    <div className="min-h-screen ">
      {/* <div className="py-5 text-center">
        <h2 className="text-lg font-semibold text-gray-600">
          Query Fetch Component using React Query to fetch products from API
        </h2>
      </div> */}
      {/* <QueryFetch /> */}
      {/* <News /> */}
      <CreatePost />
      <TestQuery />
    </div>
  );
};

export default Home;
