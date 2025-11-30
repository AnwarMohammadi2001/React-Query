import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState("dashboard");
  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-100">
      <Sidebar
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
      />
      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        <main className="flex-1 overflow-y-auto dark:bg-gray-700 ">
          <MainContent activeComponent={activeComponent} />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
