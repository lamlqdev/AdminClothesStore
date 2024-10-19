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
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <SidebarLayout>
      <Link to="/">
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" />
      </Link>

      <Link to="order">
        <SidebarItem icon={<ShoppingBag size={20} />} text="Orders" />
      </Link>

      <Link to="crm">
        <SidebarItem icon={<Users size={20} />} text="CRM" />
      </Link>

      <Link to="ecommerce">
        <SidebarItem icon={<Store size={20} />} text="E-Commerce" />
      </Link>

      <Link to="category">
        <SidebarItem icon={<PackageSearch size={20} />} text="Category" />
      </Link>

      <hr className="my-3" />
      <Link to="setting">
        <SidebarItem icon={<Settings size={20} />} text="Settings" />
      </Link>

      <SidebarItem icon={<HelpCircle size={20} />} text="Help" />
    </SidebarLayout>
  );
}
