import { Link } from "react-router-dom";

function Breadcrumb({ pageName }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="font-semibold text-black dark:text-white">{pageName}</h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" to="/">
              Dashboard /
            </Link>
          </li>
          <li className="font-medium text-indigo-500">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
}

export default Breadcrumb;
