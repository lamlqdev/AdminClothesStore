import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

export default function CategoryModal({ open, setOpen, category }) {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const id = formData.get("id");
    const name = formData.get("name");
    const icon = formData.get("icon");
    const library = formData.get("library");

    try {
      if (category) {
        const categoryRef = doc(db, "Categories", category.id);
        await updateDoc(categoryRef, {
          categoryId: id,
          name,
          icon,
          library,
          updatedAt: serverTimestamp(),
        });
      } else {
        await addDoc(collection(db, "Categories"), {
          categoryId: id,
          name,
          icon,
          library,
          isVisible: true,
          createdAt: serverTimestamp(),
        });
      }
      setOpen(false);
      navigate("/category");
    } catch (error) {
      console.error("Error updating membership: ", error);
      alert("There was an error. Please try again.");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      className="relative z-10"
    >
      <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-lg bg-white shadow-lg p-6">
          <DialogTitle className="text-lg font-semibold text-center leading-6 text-gray-900">
            {category ? "Edit Category" : "Add New Category"}
          </DialogTitle>
          <form onSubmit={handleSubmit} className="mt-4">
            <div>
              <label
                htmlFor="id"
                className="block text-sm font-medium text-gray-700"
              >
                Category ID
              </label>
              <input
                type="text"
                id="id"
                name="id"
                defaultValue={category ? category.categoryId : ""}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Category Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={category ? category.name : ""}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="mt-4">
              <p className="text-sm ">
                Choose an icon for your category. This icon will be displayed in
                the mobile app for customers. Check out the icon you like from
                the link below:
              </p>
              <p>
                <a
                  href="https://oblador.github.io/react-native-vector-icons/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm"
                >
                  https://oblador.github.io/react-native-vector-icons/
                </a>
              </p>
            </div>
            <div className="mt-4">
              <label
                htmlFor="icon"
                className="block text-sm font-medium text-gray-700"
              >
                Category Icon Name
              </label>
              <input
                type="text"
                id="icon"
                name="icon"
                defaultValue={category ? category.icon : ""}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Category Icon Library
              </label>
              <input
                type="text"
                id="library"
                name="library"
                defaultValue={category ? category.library : ""}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                }}
                className="mr-2 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {category ? "Update Category" : "Add Category"}
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
