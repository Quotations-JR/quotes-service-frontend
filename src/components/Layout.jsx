import { Outlet } from "react-router-dom";
import  Sidebar from "./Sidebar"

export default function Layout() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      
      {/* Sidebar fijo a la izquierda */}
      <Sidebar />

      {/*SOLO esto scroll */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}