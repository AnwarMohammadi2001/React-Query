

import DashboardHomePage from "./DashboardHomePage";

const MainContent = ({ activeComponent }) => {
  switch (activeComponent) {
    case "dashboard":
      return <DashboardHomePage />;
    case "projects":
      return <DashboardHomePage />;
    case "profile":
      return <DashboardHomePage />;
    case "about":
      return <DashboardHomePage />;
    case "message":
      return <DashboardHomePage />;
    case "skills":
      return <DashboardHomePage />;
    case "logout":
      return <DashboardHomePage />;
    default:
      return <DashboardHomePage />;
  }
};

export default MainContent;
