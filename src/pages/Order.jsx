import Breadcrumb from "../components/Breadcrump";
import OrderLineChart from "../components/Chart/OrderLineChart";
import OrderStatusPieChart from "../components/Chart/OrderStatusPieChart";
import OrderTable from "../components/Table/OrderTable";

export default function OrderPage() {
  return (
    <>
      <Breadcrumb pageName="Order" />
      <div className="flex gap-4 mb-4">
        <div className="w-7/12">
          <OrderLineChart />
        </div>
        <div className="w-5/12">
          <OrderStatusPieChart />
        </div>
      </div>
      <OrderTable />
    </>
  );
}
