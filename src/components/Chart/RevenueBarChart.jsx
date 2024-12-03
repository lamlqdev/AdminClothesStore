import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

const TABS = [
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
];

export default function RevenueBarChart({ orders }) {
  const [activeTab, setActiveTab] = useState("week");
  const [chartData, setChartData] = useState({
    categories: [],
    series: [],
  });

  useEffect(() => {
    if (activeTab === "week") {
      setChartData(calculateWeeklyData(orders));
    } else if (activeTab === "month") {
      setChartData(calculateMonthlyData(orders));
    }
  }, [activeTab, orders]);

  const calculateWeeklyData = (orders) => {
    // Lấy ngày đầu tuần (thứ Hai) và ngày cuối tuần (Chủ Nhật)
    const startOfWeek = dayjs().startOf("week").add(1, "day"); // Thứ Hai
    const endOfWeek = dayjs().endOf("week").add(1, "day"); // Chủ Nhật

    // Tạo mảng 7 ngày
    const days = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, "day"));

    // Tính tổng profit cho từng ngày
    const dailyTotals = days.map((day) => {
      const dayOrders = orders.filter((order) =>
        dayjs(order.orderTime.toDate()).isSame(day, "day")
      );
      return dayOrders.reduce(
        (acc, order) => acc + Number(order.total || 0),
        0
      );
    });

    return {
      categories: days.map((day) => day.format("ddd")),
      series: [{ name: "Profit", data: dailyTotals }],
    };
  };

  const calculateMonthlyData = (orders) => {
    // Lấy 12 tháng gần đây
    const months = Array.from({ length: 12 }, (_, i) =>
      dayjs().subtract(i, "month")
    ).reverse();

    // Tính tổng profit cho từng tháng
    const monthlyTotals = months.map((month) => {
      const monthOrders = orders.filter((order) =>
        dayjs(order.orderTime.toDate()).isSame(month, "month")
      );
      return monthOrders.reduce(
        (acc, order) => acc + Number(order.total || 0),
        0
      );
    });

    return {
      categories: months.map((month) => month.format("MMM")),
      series: [{ name: "Profit", data: monthlyTotals }],
    };
  };

  const chartConfig = {
    type: "bar",
    height: 280,
    series: chartData.series,
    options: {
      chart: { toolbar: { show: false } },
      colors: ["#6366F1"],
      plotOptions: { bar: { columnWidth: "40%", borderRadius: 2 } },
      xaxis: { categories: chartData.categories },
      yaxis: { labels: { style: { fontSize: "12px" } } },
      grid: { borderColor: "#ddd", strokeDashArray: 5 },
      tooltip: { theme: "dark" },
    },
  };

  return (
    <Card>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 mx-4 justify-between rounded-none md:flex-row md:items-center"
      >
        <Typography variant="h6" color="blue-gray">
          Total Revenue
        </Typography>
        <div className="flex gap-2 w-full md:w-max">
          {TABS.map(({ label, value }) => (
            <Button
              key={value}
              onClick={() => setActiveTab(value)}
              className={`px-3 py-2 text-sm rounded-md ${
                activeTab === value
                  ? "bg-primaryColor text-white"
                  : "bg-transparent text-gray-700 hover:bg-gray-300"
              }`}
            >
              {label}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardBody className="px-2 pb-0">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
}
