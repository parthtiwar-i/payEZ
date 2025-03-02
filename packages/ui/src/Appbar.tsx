import React, { useState } from "react";
import { Button } from "./button";
import {
  Menu,
  X,
  Home,
  Search,
  Bell,
  Settings,
  User,
  HelpCircle,
} from "lucide-react";

interface AppbarProps {
  user?: {
    id?: string | null;
  };
  onSignin: () => void;
  onSignout: () => void;
}

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Floating App Bar with Neon Effect */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-4 mt-4 bg-black/80 backdrop-blur-md rounded-xl shadow-lg border border-purple-500/30 relative overflow-hidden">
          {/* Neon glow effects */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 opacity-20 blur-xl"></div>
          <div className="absolute -bottom-4 left-1/4 w-1/2 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-sm"></div>

          {/* App Bar Content */}
          <div className="relative px-4 py-3 flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                PayEZ
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <NavItem icon={<Home size={18} />} label="Home" />
              <NavItem icon={<Search size={18} />} label="Search" />
              <NavItem icon={<Bell size={18} />} label="Notifications" />
              <NavItem icon={<Settings size={18} />} label="Settings" />
              <NavItem icon={<HelpCircle size={18} />} label="Help" />
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-3">
              {user && (
                <div className="hidden md:flex items-center mr-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white">
                    {user.id ? (
                      user.id.charAt(0).toUpperCase()
                    ) : (
                      <User size={16} />
                    )}
                  </div>
                  <span className="ml-2 text-white text-sm">
                    {user.id || "User"}
                  </span>
                </div>
              )}

              <Button
                variant={user ? "outline" : "primary"}
                size="sm"
                onClick={user ? onSignout : onSignin}
                className={
                  user
                    ? "border-pink-500 text-pink-500 hover:bg-pink-500/10"
                    : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                }
              >
                {user ? "Logout" : "Login"}
              </Button>

              {/* Mobile menu button */}
              <button
                className="md:hidden text-white hover:text-purple-300 transition-colors"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mx-4 mt-2 bg-black/80 backdrop-blur-md rounded-xl shadow-lg border border-purple-500/30 overflow-hidden">
            <div className="p-4 flex flex-col space-y-4">
              <MobileNavItem icon={<Home size={18} />} label="Home" />
              <MobileNavItem icon={<Search size={18} />} label="Search" />
              <MobileNavItem icon={<Bell size={18} />} label="Notifications" />
              <MobileNavItem icon={<Settings size={18} />} label="Settings" />
              <MobileNavItem icon={<HelpCircle size={18} />} label="Help" />
            </div>
          </div>
        )}
      </div>

      {/* Spacer to prevent content from being hidden behind the fixed app bar */}
      <div className="h-20"></div>
    </>
  );
};

// Desktop Navigation Item
const NavItem = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <a
    href="#"
    className="flex items-center text-gray-300 hover:text-white transition-colors group"
  >
    <span className="mr-1">{icon}</span>
    <span className="text-sm">{label}</span>
    <span
      className="block absolute h-0.5 w-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"
      style={{ bottom: "-4px" }}
    ></span>
  </a>
);

// Mobile Navigation Item
const MobileNavItem = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <a
    href="#"
    className="flex items-center text-gray-300 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
  >
    <span className="mr-3">{icon}</span>
    <span>{label}</span>
  </a>
);
