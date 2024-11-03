import { useNavigate } from "react-router-dom";

import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";

import {
  PencilIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

export default function ProductTable() {
  const TABLE_HEAD = [
    "ID Product",
    "Product Name",
    "Category",
    "Price",
    "Quantity",
    "Action",
  ];

  const PRODUCTS = [
    {
      id: "P001",
      name: "T-Shirt",
      category: "Clothing",
      price: "$20",
      quantity: 50,
    },
    {
      id: "P002",
      name: "Jeans",
      category: "Clothing",
      price: "$40",
      quantity: 30,
    },
    {
      id: "P003",
      name: "Sneakers",
      category: "Footwear",
      price: "$60",
      quantity: 20,
    },
    {
      id: "P004",
      name: "Hat",
      category: "Accessories",
      price: "$15",
      quantity: 100,
    },
  ];

  const categories = ["All", "Clothing", "Footwear", "Accessories"];

  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate("/add-product");
  };

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mx-4 flex my-4 items-center gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Product list
            </Typography>
          </div>
          <div className="w-full md:w-1/3 lg:w-1/4">
            <select className="border border-gray-300 rounded-lg shadow-sm px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300">
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-72">
            <div className="relative w-full">
              <Input
                placeholder="Search product..."
                className="border border-gray-300 rounded-lg shadow-sm pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              />
              <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            </div>
          </div>
          <Button
            className="flex items-center gap-2"
            onClick={handleAddProduct}
            color="blue"
          >
            <PlusIcon className="h-5 w-5" />
            Add Product
          </Button>
        </div>
      </CardHeader>

      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {PRODUCTS.map((product) => (
              <tr key={product.id} className="even:bg-blue-gray-50/50">
                <td className="p-4 border-b border-blue-gray-100">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {product.id}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-100">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {product.name}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-100">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {product.category}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-100">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {product.price}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-100">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {product.quantity}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-100">
                  <button className="text-blue-500 hover:text-blue-700">
                    <PencilIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
