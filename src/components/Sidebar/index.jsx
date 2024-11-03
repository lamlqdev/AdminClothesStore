import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Store,
  PackageSearch,
  Settings,
  HelpCircle,
} from "lucide-react";
import SidebarLayout from "./Sidebar";
import SidebarItem from "./SidebarItem";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <SidebarLayout>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `relative flex items-center py-2 px-3 my-1
          font-medium rounded-md cursor-pointer
          transition-colors group
          ${
            isActive
              ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
              : "hover:bg-indigo-50 text-gray-600"
          }`
        }
      >
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" />
      </NavLink>

      <NavLink
        to="order"
        className={({ isActive }) =>
          `relative flex items-center py-2 px-3 my-1
          font-medium rounded-md cursor-pointer
          transition-colors group
          ${
            isActive
              ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
              : "hover:bg-indigo-50 text-gray-600"
          }`
        }
      >
        <SidebarItem icon={<ShoppingBag size={20} />} text="Orders" />
      </NavLink>

      <NavLink
        to="crm"
        className={({ isActive }) =>
          `relative flex items-center py-2 px-3 my-1
          font-medium rounded-md cursor-pointer
          transition-colors group
          ${
            isActive
              ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
              : "hover:bg-indigo-50 text-gray-600"
          }`
        }
      >
        <SidebarItem icon={<Users size={20} />} text="CRM" />
      </NavLink>

      <NavLink
        to="ecommerce"
        className={({ isActive }) =>
          `relative flex items-center py-2 px-3 my-1
          font-medium rounded-md cursor-pointer
          transition-colors group
          ${
            isActive
              ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
              : "hover:bg-indigo-50 text-gray-600"
          }`
        }
      >
        <SidebarItem icon={<Store size={20} />} text="E-Commerce" />
      </NavLink>

      <NavLink
        to="category"
        className={({ isActive }) =>
          `relative flex items-center py-2 px-3 my-1
          font-medium rounded-md cursor-pointer
          transition-colors group
          ${
            isActive
              ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
              : "hover:bg-indigo-50 text-gray-600"
          }`
        }
      >
        <SidebarItem icon={<PackageSearch size={20} />} text="Category" />
      </NavLink>

      <hr className="my-3" />

      <NavLink
        to="setting"
        className={({ isActive }) =>
          `relative flex items-center py-2 px-3 my-1
          font-medium rounded-md cursor-pointer
          transition-colors group
          ${
            isActive
              ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
              : "hover:bg-indigo-50 text-gray-600"
          }`
        }
      >
        <SidebarItem icon={<Settings size={20} />} text="Settings" />
      </NavLink>

      <NavLink
        to="help"
        className={({ isActive }) =>
          `relative flex items-center py-2 px-3 my-1
          font-medium rounded-md cursor-pointer
          transition-colors group
          ${
            isActive
              ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-gray-600"
              : "hover:bg-indigo-50 text-gray-600"
          }`
        }
      >
        <SidebarItem icon={<HelpCircle size={20} />} text="Help" />
      </NavLink>
    </SidebarLayout>
  );
}
