import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";

const chartConfig = {
  type: "pie",
  width: 280,
  height: 280,
  series: [30, 50, 20],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    title: {
      show: "",
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#ff8f00", "#1e88e5", "#00897b"],
    legend: {
      show: true,
      position: "bottom",
    },
    labels: ["Pending", "Delivered", "In Transmit"],
  },
};

export default function OrderStatusPieChart() {
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
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
}
