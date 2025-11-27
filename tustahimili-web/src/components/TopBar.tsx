// src/components/TopBar.tsx
import { FaBars, FaUserCircle } from "react-icons/fa";
import { useUser } from "@/context/useUser";

type TopHeaderProps = {
  onToggleSidebar: () => void;
  breadcrumb: string;
};

export default function TopHeader({ onToggleSidebar, breadcrumb }: TopHeaderProps) {
  const { user } = useUser();

  return (
    <header className="flex items-center justify-between bg-white p-4 shadow-md relative z-30">
      
      {/* Left: Sidebar Toggle + Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="md:hidden text-gray-600 text-xl p-2 rounded hover:bg-gray-200 transition"
        >
          <FaBars />
        </button>

        <h1 className="text-gray-700 font-medium text-lg">
          {breadcrumb}
        </h1>
      </div>

      {/* Right: Search + User */}
      <div className="flex items-center gap-4">

        {/* Search (hidden on mobile) */}
        <input
          type="text"
          placeholder="Search..."
          className="hidden md:block px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* User section */}
        <div className="flex items-center gap-2">
          <span className="hidden md:block text-gray-700 font-medium">
            {user?.name ?? "User"}
          </span>
          <FaUserCircle className="text-2xl text-gray-500" />
        </div>
      </div>
    </header>
  );
}
