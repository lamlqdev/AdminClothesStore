import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { Edit, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import CategoryModal from "../Modal/ManageCategoryModal";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function CategoryTable({ categories: initialCategories }) {
  const [isModalManageOpen, setModalManageOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [categories, setCategories] = useState(initialCategories);

  const TABLE_HEAD = ["Category ID", "Category name", "Manage"];

  const handleCreateClick = () => {
    setCategoryToEdit(null);
    setModalManageOpen(true);
  };

  const handleEditClick = (category) => {
    setCategoryToEdit(category);
    setModalManageOpen(true);
  };

  const toggleVisibility = async (categoryId, currentVisibility) => {
    try {
      const categoryRef = doc(db, "Categories", categoryId);
      await updateDoc(categoryRef, { isVisible: !currentVisibility });

      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === categoryId
            ? { ...category, isVisible: !currentVisibility }
            : category
        )
      );
      console.log("Visibility updated successfully!");
    } catch (error) {
      console.error("Error updating visibility: ", error);
      alert("There was an error updating visibility. Please try again.");
    }
  };

  return (
    <>
      {isModalManageOpen && (
        <CategoryModal
          open={isModalManageOpen}
          setOpen={setModalManageOpen}
          category={categoryToEdit}
        />
      )}
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
              {categories.map((category) => (
                <tr
                  key={category.categoryId}
                  className="even:bg-blue-gray-50/50"
                >
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
                      <Edit
                        className="text-blue-500 cursor-pointer"
                        size={20}
                        onClick={() => handleEditClick(category)}
                      />
                      {category.isVisible ? (
                        <Eye
                          className="text-green-500 cursor-pointer"
                          size={20}
                          onClick={() =>
                            toggleVisibility(category.id, category.isVisible)
                          }
                        />
                      ) : (
                        <EyeOff
                          className="text-red-500 cursor-pointer"
                          size={20}
                          onClick={() =>
                            toggleVisibility(category.id, category.isVisible)
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
    </>
  );
}
