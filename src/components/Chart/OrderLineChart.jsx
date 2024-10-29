import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { useState } from "react";

const TABS = [
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
  { label: "Year", value: "year" },
];

const chartConfig = {
  type: "line",
  height: 260,
  series: [
    {
      name: "Order",
      data: [50, 40, 300, 320, 450, 350, 200, 230, 400],
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#6366F1"],
    stroke: {
      lineCap: "round",
      curve: "smooth",
    },
    markers: {
      size: 0,
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
      categories: [
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
    },
    yaxis: {
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
    },
    grid: {
      show: true,
      borderColor: "#dddddd",
      strokeDashArray: 6,
      xaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 5,
        right: 20,
      },
    },
    fill: {
      opacity: 0.8,
    },
  },
};

export default function OrderLineChart() {
  const [activeTab, setActiveTab] = useState("month");

  return (
    <Card className="shadow-md">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-row ml-4 gap-4 justify-between rounded-none md:flex-row md:items-center"
      >
        <div>
          <Typography variant="h6" color="blue-gray">
            Order Statistic
          </Typography>
        </div>
        <ul className="flex gap-3 mr-4 text-sm">
          {TABS.map(({ label, value }) => (
            <li key={value}>
              <button
                onClick={() => setActiveTab(value)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === value
                    ? "bg-primaryColor text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </CardHeader>
      <CardBody className="px-2 pb-0 p-5">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
}

