import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { Edit, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import CategoryModal from "../Modal/ManageCategoryModal";

export default function CategoryTable() {
  const TABLE_HEAD = ["Category ID", "Category name", "Manage"];
  const TABLE_ROWS = [
    { id: "CAT001", name: "T-Shirt", hidden: false },
    { id: "CAT002", name: "Jean", hidden: true },
    { id: "CAT003", name: "Skirt", hidden: false },
  ];

  const [categories, setCategories] = useState(TABLE_ROWS);

  const toggleVisibility = (id) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === id
          ? { ...category, hidden: !category.hidden }
          : category
      )
    );
  };

  const [openModal, setOpenModal] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  const handleCreateClick = () => {
    setCategoryToEdit(null);
    setOpenModal(true);
  };

  const handleEditClick = (category) => {
    setCategoryToEdit(category);
    setOpenModal(true);
  };

  return (
    <>
      <CategoryModal
        open={openModal}
        setOpen={setOpenModal}
        categoryToEdit={categoryToEdit}
        setCategoryToEdit={setCategoryToEdit}
      />
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-3 flex mx-4 items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Category list
              </Typography>
            </div>
            <button
              onClick={handleCreateClick}
              className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded"
            >
              Create category
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
              {categories.map((row) => (
                <tr key={row.id} className="even:bg-blue-gray-50/50">
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {row.id}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {row.name}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex gap-2">
                      <Edit
                        className="text-blue-500 cursor-pointer"
                        size={20}
                        onClick={() => handleEditClick(row)}
                      />
                      {row.hidden ? (
                        <EyeOff
                          className="text-red-500 cursor-pointer"
                          size={20}
                          onClick={() => toggleVisibility(row.id)}
                        />
                      ) : (
                        <Eye
                          className="text-green-500 cursor-pointer"
                          size={20}
                          onClick={() => toggleVisibility(row.id)}
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
    </>
  );
}
