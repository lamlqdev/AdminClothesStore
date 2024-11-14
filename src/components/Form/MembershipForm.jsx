export default function MembershipForm({ membership, onSubmit, children }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onSubmit(data);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <h1 className="text-lg text-center font-bold text-gray-900">
        {membership ? "Edit Membership" : "Create Membership"}
      </h1>
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
      <div className="mt-4 flex justify-end items-center gap-4">{children}</div>
    </form>
  );
}
