import { Search } from "lucide-react";
import DropdownUser from "./DropdownUser";
import DropdownMessage from "./DropdownMessage";
import DropdownNotification from "./DropdownNotification";

export default function Header() {
  return (
    <header className="top-0 flex w-full bg-white shadow-md relative z-10">
      <div className="flex flex-grow items-center justify-between px-4 py-4  md:px-6 2xl:px-11">
        <div className="hidden sm:block">
          <form action="https://formbold.com/s/unique_form_id" method="POST">
            <div className="relative">
              <button className="absolute left-0 top-1/2 -translate-y-1/2">
                <Search className="text-body hover:text-primary" size={20} />
              </button>
              <input
                type="text"
                placeholder="Type to search..."
                className="w-full bg-transparent pl-9 pr-4 text-black focus:outline-none"
              />
            </div>
          </form>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex pr-2 items-center gap-4 2xsm:gap-4">
            <DropdownNotification />
            <DropdownMessage />
          </ul>
          <DropdownUser />
        </div>
      </div>
    </header>
  );
}
