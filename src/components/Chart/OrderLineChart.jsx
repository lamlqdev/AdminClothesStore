import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { useState, useEffect } from "react";

const TABS = [
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
];

const OrderLineChart = ({ orders }) => {
  const [selectedTab, setSelectedTab] = useState("week");
  const [chartData, setChartData] = useState({ categories: [], series: [] });

  useEffect(() => {
    const processData = () => {
      const vietnamTimezoneOffset = 7 * 60 * 60 * 1000; // Offset in milliseconds

      if (selectedTab === "week") {
        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - i);
          return new Date(date.getTime() + vietnamTimezoneOffset); // Adjust for Vietnam timezone
        }).reverse();

        const data = last7Days.map((date) => {
          const localDate = date.toISOString().split("T")[0];
          return orders.filter((order) => {
            const orderDate = new Date(
              order.orderTime.seconds * 1000 + vietnamTimezoneOffset
            );
            return orderDate.toISOString().split("T")[0] === localDate;
          }).length;
        });

        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        setChartData({
          categories: last7Days.map((date) => dayNames[date.getUTCDay()]), // Use getUTCDay for correct day name
          series: [{ name: "Orders", data }],
        });
      } else if (selectedTab === "month") {
        const months = Array.from({ length: 12 }, (_, i) => i + 1);

        const data = months.map((month) => {
          return orders.filter((order) => {
            const orderDate = new Date(
              order.orderTime.seconds * 1000 + vietnamTimezoneOffset
            );
            return orderDate.getUTCMonth() + 1 === month;
          }).length;
        });

        setChartData({
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          series: [{ name: "Orders", data }],
        });
      }
    };

    processData();
  }, [selectedTab, orders]);

  const chartConfig = {
    type: "line",
    height: 260,
    series: chartData.series,
    options: {
      xaxis: {
        categories: chartData.categories,
      },
      dataLabels: {
        enabled: true, // Enable data labels
      },
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
        <div>
          <Typography variant="h6" color="blue-gray">
            Order Line Chart
          </Typography>
        </div>
        <div className="flex gap-2 w-full md:w-max ml-3">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setSelectedTab(tab.value)}
              className={`px-3 py-2 text-sm gap-1 rounded-md transition-all duration-300 ${
                selectedTab === tab.value
                  ? "bg-primaryColor text-white"
                  : "bg-transparent text-gray-700 hover:bg-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardBody>
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
};

export default OrderLineChart;
