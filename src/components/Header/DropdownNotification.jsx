import { useState } from "react";
import ClickOutside from "../../ClickOutside";
import { Link } from "react-router-dom";
import { Bell } from "lucide-react";

export default function DropdownNotification() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);
  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <li className="relative">
        <Link
          onClick={() => {
            setNotifying(false);
            setDropdownOpen(!dropdownOpen);
          }}
          className="relative flex h-9 w-9 items-center justify-center rounded-full border-[0.5px] "
          to="#"
        >
          <Bell size={20} />
          {notifying && (
            <span className="absolute top-0.5 right-0.5  h-1.5 w-1.5 rounded-full bg-red-500 animate-ping opacity-75"></span>
          )}
        </Link>
      </li>

      {dropdownOpen && (
        <div
          className={`absolute -right-27 mt-2 flex h-90 w-75 flex-col rounded-md border bg-white shadow-md sm:right-0 sm:w-80`}
        >
          <div className="px-4 py-3">
            <h5 className="text-sm font-medium">Notification</h5>
          </div>

          <ul className="flex h-auto flex-col overflow-y-auto">
            <li>
              <Link
                className="flex flex-col gap-2 border-t px-4 py-3 hover:bg-gray-200"
                to="#"
              >
                <p className="text-sm">
                  <span className="text-black">
                    It is a long established fact
                  </span>{" "}
                  that a reader will be distracted by the readable.
                </p>

                <p className="text-xs">24 Feb, 2025</p>
              </Link>
            </li>
            <li>
              <Link
                className="flex flex-col gap-2 border-t px-4 py-3 hover:bg-gray-200"
                to="#"
              >
                <p className="text-sm">
                  <span className="text-black">There are many variations</span>{" "}
                  of passages of Lorem Ipsum available, but the majority have
                  suffered
                </p>

                <p className="text-xs">04 Jan, 2025</p>
              </Link>
            </li>
            <li>
              <Link
                className="flex flex-col gap-2 border-t px-4 py-3 hover:bg-gray-200"
                to="#"
              >
                <p className="text-sm">
                  <span className="text-black">There are many variations</span>{" "}
                  of passages of Lorem Ipsum available
                </p>

                <p className="text-xs">01 Dec, 2024</p>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </ClickOutside>
  );
}
