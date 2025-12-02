import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// Layouts
import MainLayout from "../layouts/MainLayout";
import Navbar from "../components/Navbar/Navbar";
import Login from "../features/aut/Login";
import Register from "../features/aut/Register";
import PrivateRoute from "../features/aut/PrivateRoute"; // import private route

// Lazy loaded pages
const Home = lazy(() => import("../pages/Home"));
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard")); // your dashboard page

export default function AppRoutes() {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
      <Routes>
        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* 404 Route */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Suspense>
  );
}
