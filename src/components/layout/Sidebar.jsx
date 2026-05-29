
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from "lucide-react";

export function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const navigationItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Analytics", path: "/analytics", icon: BarChart3 },
    { name: "Users & Salons", path: "/users", icon: Users },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between bg-white dark:bg-neutral-900 border-r border-neutral-200/80 dark:border-neutral-800/80 text-neutral-800 dark:text-neutral-200 transition-all duration-300">
      {/* Sidebar Header */}
      <div>
        <div className={`p-6 flex items-center justify-between ${collapsed ? "justify-center" : ""}`}>
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 flex items-center justify-center rounded-lg bg-gradient-to-tr from-pink-500 to-blue-500 text-white shadow-sm flex-shrink-0">
              <Sparkles size={18} />
            </div>
            {!collapsed && (
              <span className="font-semibold text-lg tracking-tight bg-gradient-to-r from-pink-500 to-blue-600 bg-clip-text text-transparent dark:from-pink-400 dark:to-blue-400">
                Temi Beauty
              </span>
            )}
          </div>
          {/* Collapse button on desktop */}
          {!collapsed && (
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="px-4 py-2 space-y-1.5">
          {navigationItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setMobileOpen(false)} // Close drawer on mobile click
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group
                ${isActive
                  ? "bg-blue-50/80 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400 border-l-2 border-blue-600 dark:border-blue-400"
                  : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800/40 dark:hover:text-neutral-200"
                }
                ${collapsed ? "justify-center" : ""}
              `}
            >
              <item.icon
                size={20}
                className={`transition-colors flex-shrink-0 ${
                  collapsed ? "" : "group-hover:scale-105 transition-transform"
                }`}
              />
              {!collapsed && <span>{item.name}</span>}
              {collapsed && (
                <div className="absolute left-16 bg-neutral-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap shadow-md">
                  {item.name}
                </div>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-neutral-100 dark:border-neutral-800/60">
        {!collapsed && user && (
          <div className="flex items-center gap-3 mb-4 px-2">
            <img
              src={user.avatar}
              alt={user.name}
              className="h-9 w-9 rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800"
            />
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate">{user.name}</p>
              <p className="text-xs text-neutral-400 truncate capitalize">{user.role}</p>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className={`
            w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20 transition-all cursor-pointer
            ${collapsed ? "justify-center" : ""}
          `}
        >
          <LogOut size={20} className="flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:block h-screen sticky top-0 transition-all duration-300 z-30 ${collapsed ? "w-20" : "w-64"}`}>
        {sidebarContent}
      </aside>

      {/* Expand button on desktop when collapsed */}
      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="hidden lg:flex fixed bottom-6 left-6 p-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-md hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 z-40 cursor-pointer"
        >
          <ChevronRight size={18} />
        </button>
      )}

      {/* Mobile Sidebar overlay drawer */}
      <div
        className={`fixed inset-0 bg-neutral-950/50 transition-opacity duration-300 lg:hidden z-40 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      <aside
        className={`fixed top-0 bottom-0 left-0 w-64 bg-white dark:bg-neutral-900 transition-transform duration-300 ease-in-out lg:hidden z-50 transform ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
