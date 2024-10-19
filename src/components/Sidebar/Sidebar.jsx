import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { createContext, useState } from "react";

export const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 mb-5 flex justify-between items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/128/7562/7562565.png"
            className={`overflow-hidden transition-all ${
              sidebarOpen ? "w-8 h-8" : "w-0"
            }`}
            alt="logo clothes shop"
          />
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {sidebarOpen ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ sidebarOpen }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${
                sidebarOpen ? "w-52 ml-3" : "w-0"
              }
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">Group 3</h4>
              <span className="text-xs text-gray-600">
                work.lamsun@gmail.com
              </span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}
