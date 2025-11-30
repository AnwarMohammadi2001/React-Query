

import DashboardHomePage from "./DashboardHomePage";
import Authors from "./pages/Authors";
import NewNews from "./pages/NewNews";
import News from "./pages/News";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";

const MainContent = ({ activeComponent }) => {
  switch (activeComponent) {
    case "dashboard":
      return <DashboardHomePage />;
    case "news":
      return <News />;
    case "profile":
      return <Profile />;
    case "newnews":
      return <NewNews />;
    case "setting":
      return <Setting />;
    case "author":
      return <Authors />;
    case "logout":
      return <DashboardHomePage />;
    default:
      return <DashboardHomePage />;
  }
};

export default MainContent;
