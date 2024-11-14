export default function CategoryForm({ category, onSubmit, children }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onSubmit(data);
  }

  return (
    <form className="mt-2" onSubmit={handleSubmit}>
      <h1 className="text-lg text-center font-bold text-gray-900">
        {category ? "Edit Category" : "Create Category"}
      </h1>
      <div>
        <label htmlFor="id" className="block text-sm font-medium text-gray-700">
          Category ID
        </label>
        <input
          type="text"
          id="categoryId"
          name="categoryId"
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
          Choose an icon for your category. This icon will be displayed in the
          mobile app for customers. Check out the icon you like from the link
          below:
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
      <div className="mt-4 flex justify-end items-center gap-4">{children}</div>
    </form>
  );
}
