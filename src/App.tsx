import React from "react";
import { Route, Routes } from "react-router-dom"
import AppHeader from "./components/app-header";
import AppSidebar from "./components/app-sidebar";
import { useSidebar } from "./contexts/sidebar-context";

const Dashboard = React.lazy(() => import('./pages/dashboard'));
const Login = React.lazy(() => import('./pages/login'));
const Register = React.lazy(() => import('./pages/register'));

function App() {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  
  return (
    <div className='min-h-screen xl:flex'>
      <div>
        <AppSidebar />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
        <div className='p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6'>
          <React.Suspense  fallback={<div>loading....</div>}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </React.Suspense>
        </div>
      </div>
    </div>
  )
}

export default App
