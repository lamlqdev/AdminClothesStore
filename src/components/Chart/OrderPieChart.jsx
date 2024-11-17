import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";

import Chart from "react-apexcharts";
import { fetchProducts } from "../../api/productAPI";

const chartConfig = {
  type: "pie",
  width: 280,
  height: 280,
  series: [44, 55, 13, 43, 22],
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
    colors: ["#020617", "#ff8f00", "#00897b", "#1e88e5", "#d81b60"],
    legend: {
      show: true,
    },
  },
};

export default function ProductPieChart() {
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (!products) return null;

  const topProducts = products.sort((a, b) => b.sale - a.sale).slice(0, 5);

  const productNames = topProducts.map((product) => product.name);
  const productSales = topProducts.map((product) => product.sale);

  const options = {
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
    colors: ["#020617", "#ff8f00", "#00897b", "#1e88e5", "#d81b60"],
    legend: {
      show: true,
    },
    labels: productNames,
  };

  const series = productSales;

  return (
    <Card>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col ml-4 gap-4 rounded-none md:flex-row md:items-center"
      />
      <div>
        <Typography variant="h6" color="blue-gray" className="ml-4 mt-2">
          Top 5 sale products
        </Typography>
      </div>
      <Chart options={options} series={series} type="pie" />
    </Card>
  );
}
