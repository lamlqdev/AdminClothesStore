import CardDataStat from "../components/CardDataStat";
import { Eye, Users, ShoppingBag, HandCoins } from "lucide-react";
import RevevueBarChart from "../components/Chart/RevenueBarChart";
import OrderPieChart from "../components/Chart/OrderPieChart";
import { useLoaderData } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function DashBoardPage() {
  const { users, products } = useLoaderData();
  return (
    <>
      <section className="text-gray-700 body-font">
        <div className="container px-5 mx-auto">
          <div className="flex flex-wrap -m-4 text-center">
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <CardDataStat icon={Eye} title="Visit" data="120" />
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
            <OrderPieChart />
          </div>
        </div>
      </section>
    </>
  );
}

export async function loader() {
  const usersSnapshot = await getDocs(collection(db, "users"));
  const productsSnapshot = await getDocs(collection(db, "Products"));

  const usersCount = usersSnapshot.size;
  const productsCount = productsSnapshot.size;

  return {
    users: usersCount,
    products: productsCount,
  };
}
