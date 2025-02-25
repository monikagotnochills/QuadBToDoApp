import React, { useEffect, useRef, useState } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { SidebarItem } from "./Sidebar";
import {
  LayoutDashboard,
  Gauge,
  ClipboardCheck,
  NotebookPen,
  Sun,
  Moon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const MobileHeader = ({ darkMode, toggleDarkMode }) => {
  const mobileMenuRef = useRef();
  const [showMobileMainDropdown, setShowMobileMainDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setShowMobileMainDropdown(false);
      }
    };

    if (showMobileMainDropdown) {
      document.addEventListener("mousedown", handler);
    }
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [showMobileMainDropdown]);

  return (
    <div
      className={`sm:hidden flex justify-between items-center w-full px-4 py-3 transition-all duration-300 z-50 ${
        darkMode ? "bg-gray-900 border-b border-gray-700" : "bg-white border-b border-gray-300"
      }`}
    >
      {/* Logo & App Name */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <LayoutDashboard size={30} className={darkMode ? "text-gray-200" : "text-gray-800"} />
        <span className={`font-semibold text-xl ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
          Prod Tasks
        </span>
      </div>

      {/* Dark Mode Toggle */}

      {/* Mobile Menu */}
      <div className="relative" ref={mobileMenuRef}>
        <button
          onClick={() => setShowMobileMainDropdown(!showMobileMainDropdown)}
          className="p-2 border-2 rounded-lg transition-all duration-200 focus:outline-none"
        >
          {showMobileMainDropdown ? (
            <IoMdClose className={darkMode ? "text-gray-200" : "text-gray-800"} size={28} />
          ) : (
            <HiOutlineMenuAlt2 className={darkMode ? "text-gray-200" : "text-gray-800"} size={28} />
          )}
        </button>

        {/* Dropdown Menu */}
        {showMobileMainDropdown && (
          <div
            className={`absolute top-full right-0 mt-3 p-3 rounded-lg shadow-xl w-52 transition-all duration-300 transform scale-95 origin-top-right ${
              darkMode ? "bg-gray-800 border border-gray-700 text-gray-200" : "bg-white border border-gray-300 text-gray-800"
            }`}
          >
            <ul className="flex flex-col gap-2">
              <SidebarItem icon={<LayoutDashboard size={20} />} text="Tasks" path="/" />
              <SidebarItem icon={<Gauge size={20} />} text="Important" path="/important" />
              <SidebarItem icon={<ClipboardCheck size={20} />} text="Completed" path="/completed" />
              <SidebarItem icon={<NotebookPen size={20} />} text="ToDo" path="/todo" />
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileHeader;
