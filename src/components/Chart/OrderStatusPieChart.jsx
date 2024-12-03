import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";

function calculateOrderStatus(orders) {
  const statusCount = {};

  orders.forEach((order) => {
    if (statusCount[order.orderStatus]) {
      statusCount[order.orderStatus]++;
    } else {
      statusCount[order.orderStatus] = 1;
    }
  });

  return statusCount;
}

export default function OrderStatusPieChart({ orders }) {
  const statusCount = calculateOrderStatus(orders);
  const totalOrders = orders.length;
  const chartData = {
    series: Object.values(statusCount),
    options: {
      chart: {
        type: "pie",
        toolbar: {
          show: false,
        },
      },
      title: {
        show: false,
      },
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          return opts.w.config.series[opts.seriesIndex];
        },
        style: {
          fontSize: "14px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: "bold",
          colors: ["#fff"],
        },
        dropShadow: {
          enabled: false,
        },
      },
      colors: [
        "#ff8f00",
        "#1e88e5",
        "#00897b",
        "#d32f2f",
        "#7b1fa2",
        "#1976d2",
      ],
      legend: {
        show: true,
        position: "bottom",
      },
      labels: Object.keys(statusCount),
    },
  };

  return (
    <Card>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col ml-4 gap-4 rounded-none md:flex-row md:items-center"
      >
        <div>
          <Typography variant="h6" color="blue-gray">
            Orders Status Overview
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="mt-4 p-3 grid place-items-center px-2">
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="pie"
          height={280}
        />
      </CardBody>
    </Card>
  );
}
