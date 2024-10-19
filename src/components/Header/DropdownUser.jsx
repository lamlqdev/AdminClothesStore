import { useState } from "react";
import ClickOutside from "../../ClickOutside";
import { ChevronDown, User, BookOpen, Settings, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

export default function DropdownUser() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            Clothes store, Hello
          </span>
          <span className="block text-xs">Admin</span>
        </span>

        <span className="h-12 w-12 rounded-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww"
            alt="admin"
          />
        </span>
        <ChevronDown className="hidden sm:block" size={16} />
      </Link>
      {dropdownOpen && (
        <div className="absolute right-0 mt-4 z-50 flex w-62.5 flex-col rounded-md border bg-white shadow-md">
          <ul className="flex flex-col gap-6 border-b border-stroke px-6 py-4 ">
            <li>
              <Link
                to="#"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out lg:text-base"
              >
                <User size={22} />
                My Profile
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out lg:text-base"
              >
                <BookOpen size={22} />
                My Contacts
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <Settings size={22} />
                Settings
              </Link>
            </li>
          </ul>

          <button className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
            <LogOut size={22} />
            Log Out
          </button>
        </div>
      )}
    </ClickOutside>
  );
}
