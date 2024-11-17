import { useLoaderData } from "react-router-dom";
import { Package, Users, ShoppingBag, HandCoins } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

import RevevueBarChart from "../components/Chart/RevenueBarChart";
import ProductPieChart from "../components/Chart/OrderPieChart";
import CardDataStat from "../components/CardDataStat";

export default function DashBoardPage() {
  const { users, products, orders } = useLoaderData();
  return (
    <>
      <section className="text-gray-700 body-font">
        <div className="container px-5 mx-auto">
          <div className="flex flex-wrap -m-4 text-center">
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <CardDataStat icon={Package} title="Orders" data={orders} />
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <CardDataStat icon={Users} title="Users" data={users} />
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <CardDataStat
                icon={ShoppingBag}
                title="Products"
                data={products}
              />
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <CardDataStat icon={HandCoins} title="Profits" data="46" />
            </div>
          </div>
        </div>

        <div className="flex gap-4 my-4">
          <div className="w-7/12">
            <RevevueBarChart />
          </div>
          <div className="w-5/12">
            <ProductPieChart />
          </div>
        </div>
      </section>
    </>
  );
}

export async function loader() {
  const usersSnapshot = await getDocs(collection(db, "users"));
  const productsSnapshot = await getDocs(collection(db, "Products"));
  const ordersSnapshot = await getDocs(collection(db, "Orders"));

  const usersCount = usersSnapshot.size;
  const productsCount = productsSnapshot.size;
  const ordersCount = ordersSnapshot.size;

  return {
    users: usersCount,
    products: productsCount,
    orders: ordersCount,
  };
}
