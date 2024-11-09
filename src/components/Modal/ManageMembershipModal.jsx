import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

import {
  doc,
  addDoc,
  updateDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

export default function ManageMembershipModal({ open, setOpen, membership }) {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const membershipName = formData.get("membershipName");
    const minimumSpend = parseInt(formData.get("minimumSpend"), 10);
    const discountRate = parseInt(formData.get("discountRate"), 10);

    if (isNaN(minimumSpend) || isNaN(discountRate)) {
      alert("Please enter valid numbers for minimum spend and discount rate.");
      return;
    }

    try {
      if (membership) {
        // Nếu membership đã tồn tại, cập nhật membership hiện có
        const membershipRef = doc(db, "Membership", membership.id);
        await updateDoc(membershipRef, {
          membershipName,
          minimumSpend,
          discountRate,
          updatedAt: serverTimestamp(),
        });
      } else {
        // Nếu membership không tồn tại, thêm mới membership
        await addDoc(collection(db, "Membership"), {
          membershipName,
          minimumSpend,
          discountRate,
          isActive: true,
          createdAt: serverTimestamp(),
        });
      }
      setOpen(false);
      navigate("/crm");
    } catch (error) {
      console.error("Error updating membership: ", error);
      alert("There was an error updating the membership. Please try again.");
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
            {membership ? "Edit membership" : "Add membership"}
          </DialogTitle>
          <form onSubmit={handleSubmit} className="mt-4">
            <div>
              <label
                htmlFor="membershipName"
                className="block text-sm font-medium text-gray-700"
              >
                Membership Name
              </label>
              <input
                type="text"
                id="membershipName"
                name="membershipName"
                defaultValue={membership ? membership.membershipName : ""}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="minimumSpend"
                className="block text-sm font-medium text-gray-700"
              >
                Minimum Spend Amount
              </label>
              <input
                type="number"
                id="minimumSpend"
                name="minimumSpend"
                defaultValue={membership ? membership.minimumSpend : ""}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="discountRate"
                className="block text-sm font-medium text-gray-700"
              >
                Discount Rate (%)
              </label>
              <input
                type="number"
                id="discountRate"
                name="discountRate"
                defaultValue={membership ? membership.discountRate : ""}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mr-2 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {membership ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
