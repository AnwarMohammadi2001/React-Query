import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState("dashboard");
  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-100">
      <Sidebar
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
      />
      <div className="min-h-screen">
        <main className=" dark:bg-gray-700 ">
          <MainContent activeComponent={activeComponent} />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
