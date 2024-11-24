import { Search } from "lucide-react";
import DropdownUser from "./DropdownUser";
import DropdownMessage from "./DropdownMessage";
import DropdownNotification from "./DropdownNotification";

export default function Header() {
  return (
    <header className="top-0 flex w-full bg-white shadow-md relative z-10">
      <div className="flex flex-grow items-center justify-end px-4 py-4  md:px-6 2xl:px-11">
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
