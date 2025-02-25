import { BookCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

export default function Sidebar({ children }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <aside className="h-screen w-full">
      <nav
        className={`h-full flex-col border-r shadow-sm transition-colors ${
          isDarkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-700"
        }`}
      >
        <div className="flex items-center gap-1 p-3 cursor-pointer" onClick={() => navigate("/")}> 
          <BookCheck size={30} />
          <span className="ml-4 font-semibold text-xl">Prod Tasks</span>
        </div>

        <ul className="flex-1 px-3">{children}</ul>
      </nav>
    </aside>
  );
}

const checkPath = (path) => {
  return path === window.location.pathname;
};

export function SidebarItem({ icon, text, active, path }) {
  active = checkPath(path);
  const navigate = useNavigate();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? isDarkMode
              ? "bg-gradient-to-tr from-indigo-700 to-indigo-500 text-white"
              : "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : isDarkMode
            ? "hover:bg-gray-800 text-gray-300"
            : "hover:bg-indigo-50 text-gray-600"
        }
    `}
      onClick={() => navigate(path)}
    >
      {icon}
      <span className="overflow-hidden transition-all w-52 ml-3">
        {text}
      </span>
    </li>
  );
}
