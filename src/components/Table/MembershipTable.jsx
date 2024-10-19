import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

export default function MembershipTable() {
  const TABLE_HEAD = [
    "Membership name",
    "Minimum spend amount",
    "Discount rate",
    "Manage",
  ];

  const TABLE_ROW = [
    {
      id: 1,
      name: "Gold",
      minSpend: "$1000",
      discountRate: "10%",
    },
    {
      id: 2,
      name: "Silver",
      minSpend: "$500",
      discountRate: "5%",
    },
    {
      id: 3,
      name: "Bronze",
      minSpend: "$200",
      discountRate: "2%",
    },
  ];

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-3 flex mx-4 items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Membership list
            </Typography>
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded">
            Create membership
          </button>
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
            {TABLE_ROW.map((row) => (
              <tr key={row.id} className="even:bg-blue-gray-50/50">
                <td className="p-4 border-b border-blue-gray-100">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {row.name}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-100">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {row.minSpend}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-100">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {row.discountRate}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-100">
                  <div className="flex items-center space-x-2">
                    <button className="bg-blue-400 hover:bg-blue-500 text-white py-1 px-3 rounded text-sm">
                      Edit
                    </button>
                    <button className="bg-red-400 hover:bg-red-500 text-white py-1 px-3 rounded text-sm">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
