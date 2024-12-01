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
      </nav>
    </aside>
  );
}
