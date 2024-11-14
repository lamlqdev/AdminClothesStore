import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { Edit, Eye, EyeOff } from "lucide-react";
import { queryClient, updateCategoryVisibility } from "../../api/firebaseApi";
import LoadingIndicator from "../UI/LoadingIndicator";

const TABLE_HEAD = ["Category ID", "Category name", "Manage"];

export default function CategoryTable({ categories }) {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: updateCategoryVisibility,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const handleVisibilityToggle = (categoryId, currentVisibility) => {
    const newVisibility = !currentVisibility;
    mutate({ id: categoryId, isVisible: newVisibility });
  };

  return (
    <Card className="h-full w-full">
      {isPending && <LoadingIndicator />}
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-2 flex mx-4 items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Category list
            </Typography>
          </div>
          <Link
            to="new"
            className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded"
          >
            Create category
          </Link>
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
            {categories.map((category) => (
              <tr key={category.categoryId} className="even:bg-blue-gray-50/50">
                <td className="p-4 border-b border-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {category.categoryId}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {category.name}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <div className="flex gap-2">
                    <Link to={`${category.id}/edit`}>
                      <Edit
                        className="text-blue-500 cursor-pointer"
                        size={20}
                      />
                    </Link>
                    {category.isVisible ? (
                      <Eye
                        className="text-green-500 cursor-pointer"
                        size={20}
                        onClick={() =>
                          handleVisibilityToggle(
                            category.id,
                            category.isVisible
                          )
                        }
                      />
                    ) : (
                      <EyeOff
                        className="text-red-500 cursor-pointer"
                        size={20}
                        onClick={() =>
                          handleVisibilityToggle(
                            category.id,
                            category.isVisible
                          )
                        }
                      />
                    )}
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
