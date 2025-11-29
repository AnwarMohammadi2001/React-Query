import React from "react";

import QueryFetch from "../components/QueryFetch";
import News from "../components/Navbar/News";
import TestQuery from "../components/TestQuery";
import CreatePost from "../components/CreatePost";

const Home = () => {
  return (
    <div className="min-h-screen ">

      <CreatePost />
      {/* <TestQuery /> */}
    </div>
  );
};

export default Home;
