import { Outlet } from "react-router-dom";
// import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-800">
      <main className="flex-grow ">
        <Outlet /> {/* Nested route renders here */}
      </main>
      {/* <Footer /> */}
    </div>
  );
}
