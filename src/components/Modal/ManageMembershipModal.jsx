import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

export default function ManageMembershipModal({
  open,
  setOpen,
  membershipToEdit,
  setMembershipToEdit,
}) {
  const [membershipName, setMembershipName] = useState("");
  const [minimumSpend, setMinimumSpend] = useState("");
  const [discountRate, setDiscountRate] = useState("");

  useEffect(() => {
    if (membershipToEdit) {
      setMembershipName(membershipToEdit.name);
      setMinimumSpend(membershipToEdit.minSpend);
      setDiscountRate(membershipToEdit.discountRate);
    } else {
      setMembershipName("");
      setMinimumSpend("");
      setDiscountRate("");
    }
  }, [membershipToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (membershipToEdit) {
      console.log("Editting");
    } else {
      console.log("Add membership");
    }
    setOpen(false);
    setMembershipToEdit(null);
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
        setMembershipToEdit(null);
      }}
      className="relative z-10"
    >
      <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-lg bg-white shadow-lg p-6">
          <DialogTitle className="text-lg font-semibold text-center leading-6 text-gray-900">
            {membershipToEdit ? "Edit membership" : "Add membership"}
          </DialogTitle>
          <form onSubmit={handleSubmit} className="mt-4">
            <div>
              <label
                htmlFor="membership-name"
                className="block text-sm font-medium text-gray-700"
              >
                Membership Name
              </label>
              <input
                type="text"
                id="membership-name"
                value={membershipName}
                onChange={(e) => setMembershipName(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="minimum-spend"
                className="block text-sm font-medium text-gray-700"
              >
                Minimum Spend Amount
              </label>
              <input
                type="number"
                id="minimum-spend"
                value={minimumSpend}
                onChange={(e) => setMinimumSpend(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="discount-rate"
                className="block text-sm font-medium text-gray-700"
              >
                Discount Rate (%)
              </label>
              <input
                type="number"
                id="discount-rate"
                value={discountRate}
                onChange={(e) => setDiscountRate(e.target.value)}
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
                {membershipToEdit ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
