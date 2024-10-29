import { useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

export default function CategoryModal({
  open,
  setOpen,
  categoryToEdit,
  setCategoryToEdit,
}) {
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if (categoryToEdit) {
      setCategoryName(categoryToEdit.name);
    } else {
      setCategoryName("");
    }
  }, [categoryToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryToEdit) {
      console.log("Updating category:", { categoryName });
    } else {
      console.log("Adding new category:", { categoryName });
    }
    setOpen(false);
    setCategoryToEdit(null);
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
        setCategoryToEdit(null);
      }}
      className="relative z-10"
    >
      <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-lg bg-white shadow-lg p-6">
          <DialogTitle className="text-lg font-semibold text-center leading-6 text-gray-900">
            {categoryToEdit ? "Edit Category" : "Add New Category"}
          </DialogTitle>
          <form onSubmit={handleSubmit} className="mt-4">
            <div>
              <label
                htmlFor="category-name"
                className="block text-sm font-medium text-gray-700"
              >
                Category Name
              </label>
              <input
                type="text"
                id="category-name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setCategoryToEdit(null);
                }}
                className="mr-2 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {categoryToEdit ? "Update Category" : "Add Category"}
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
