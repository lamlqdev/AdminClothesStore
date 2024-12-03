import { useLoaderData } from "react-router-dom";
import { Package, Users, ShoppingBag, HandCoins } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

import RevevueBarChart from "../components/Chart/RevenueBarChart";
import ProductPieChart from "../components/Chart/OrderPieChart";
import OrderLineChart from "../components/Chart/OrderLineChart";
import OrderStatusPieChart from "../components/Chart/OrderStatusPieChart";
import CardDataStat from "../components/CardDataStat";

export default function DashBoardPage() {
  const { usersCount, productsCount, ordersCount, orders } = useLoaderData();
  const totalRevenue = orders.reduce(
    (acc, order) => acc + Number(order.total || 0),
    0
  );

  return (
    <>
      <section className="text-gray-700 body-font">
        <div className="container px-5 mx-auto">
          <div className="flex flex-wrap -m-4 text-center">
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <CardDataStat icon={Package} title="Orders" data={ordersCount} />
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <CardDataStat icon={Users} title="Users" data={usersCount} />
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <CardDataStat
                icon={ShoppingBag}
                title="Products"
                data={productsCount}
              />
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <CardDataStat
                icon={HandCoins}
                title="Profits"
                data={`${totalRevenue}$`}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4 my-4">
          <div className="w-7/12">
            <RevevueBarChart orders={orders} />
          </div>
          <div className="w-5/12">
            <ProductPieChart />
          </div>
        </div>

        <div className="flex gap-4 mb-4">
          <div className="w-7/12">
            <OrderLineChart orders={orders} />
          </div>
          <div className="w-5/12">
            <OrderStatusPieChart orders={orders} />
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

  const orders = ordersSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return {
    usersCount,
    productsCount,
    ordersCount,
    orders,
  };
}
