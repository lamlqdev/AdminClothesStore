import { useState } from "react";
import ClickOutside from "../../ClickOutside";
import { Link } from "react-router-dom";
import { MessageSquareText } from "lucide-react";

export default function DropdownMessage() {
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
          className="relative flex h-9 w-9 items-center justify-center rounded-full border-[0.5px]"
          to="#"
        >
          <MessageSquareText size={20} />
          {notifying && (
            <span className="absolute top-0.5 right-0.5  h-1.5 w-1.5 rounded-full bg-red-500 animate-ping opacity-75"></span>
          )}
        </Link>

        {dropdownOpen && (
          <div
            className={`absolute -right-16 mt-2 flex h-90 w-75 flex-col rounded-md border bg-white sm:right-0 sm:w-80 shadow-md`}
          >
            <div className="px-4 py-3">
              <h5 className="text-sm font-medium">Messages</h5>
            </div>

            <ul className="flex h-auto flex-col overflow-y-auto">
              <li>
                <Link
                  className="flex gap-4 border-t border-stroke px-4 py-3 hover:bg-gray-200"
                  to="#"
                >
                  <div className="h-12 w-12 rounded-full overflow-hidden">
                    <img
                      src="https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyJTIwaHVtYW58ZW58MHx8MHx8fDA%3D"
                      alt="User"
                    />
                  </div>

                  <div>
                    <h6 className="text-sm font-medium text-black hover:bg-gray-200">
                      Mariya Desoja
                    </h6>
                    <p className="text-sm">I like your confidence 💪</p>
                    <p className="text-xs">2min ago</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  className="flex gap-4 border-t border-stroke px-4 py-3 hover:bg-gray-200"
                  to="#"
                >
                  <div className="h-12 w-12 rounded-full overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyJTIwaHVtYW58ZW58MHx8MHx8fDA%3D"
                      alt="User"
                    />
                  </div>

                  <div>
                    <h6 className="text-sm font-medium text-black">
                      Robert Jhon
                    </h6>
                    <p className="text-sm">Can you share your offer?</p>
                    <p className="text-xs">10min ago</p>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </li>
    </ClickOutside>
  );
}
