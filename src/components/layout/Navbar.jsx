import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import {
  Search,
  Sun,
  Moon,
  Menu,
  Bell,
  LogOut,
  User as UserIcon,
  Sparkles
} from "lucide-react";

export function Navbar({ setMobileOpen }) {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Derive page name from route path
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/") return "Dashboard Overview";
    if (path === "/analytics") return "Analytics & Reports";
    if (path === "/users") return "Salon Partnerships";
    if (path === "/settings") return "Account Settings";
    return "Temi Admin";
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="h-16 sticky top-0 flex items-center justify-between px-6 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800/80 z-20 text-neutral-800 dark:text-neutral-200">
      {/* Left side: Hamburger (mobile) & Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
        >
          <Menu size={20} />
        </button>
        <div className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded">
          <Sparkles size={12} />
          <span>SaaS Console</span>
        </div>
        <h1 className="text-base lg:text-lg font-semibold tracking-tight">
          {getPageTitle()}
        </h1>
      </div>

      {/* Right side: Search, Theme, Notification, Profile */}
      <div className="flex items-center gap-3 lg:gap-4">
        {/* Quick Search */}
        <div className="relative hidden md:block w-48 lg:w-64">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400 pointer-events-none">
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Search dashboard..."
            className="w-full pl-9 pr-4 py-1.5 text-sm rounded-lg border border-neutral-200 bg-neutral-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:border-neutral-800 dark:bg-neutral-950 dark:focus:bg-neutral-900 transition-colors"
          />
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 dark:text-neutral-400 cursor-pointer transition-colors"
          aria-label="Toggle Light/Dark Theme"
        >
          {isDark ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} />}
        </button>

        {/* Notification Bell */}
        <button className="relative p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 dark:text-neutral-400 cursor-pointer transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-pink-500" />
        </button>

        {/* Divider */}
        <div className="h-6 w-[1px] bg-neutral-200 dark:bg-neutral-800" />

        {/* Profile Dropdown */}
        {user && (
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="h-8 w-8 rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-50"
              />
              <span className="hidden sm:block text-sm font-medium">
                {user.name}
              </span>
            </button>

            {profileDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-30 cursor-default"
                  onClick={() => setProfileDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2.5 w-48 bg-white dark:bg-neutral-950 rounded-lg shadow-lg border border-neutral-200/80 dark:border-neutral-800/80 py-1.5 z-40 transform origin-top-right transition-all">
                  <div className="px-4 py-2 border-b border-neutral-100 dark:border-neutral-800/60">
                    <p className="text-sm font-semibold truncate">{user.name}</p>
                    <p className="text-xs text-neutral-400 truncate mt-0.5">
                      {user.email}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      navigate("/settings");
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900 flex items-center gap-2 cursor-pointer"
                  >
                    <UserIcon size={16} />
                    <span>My Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 flex items-center gap-2 border-t border-neutral-100 dark:border-neutral-800/60 cursor-pointer"
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
