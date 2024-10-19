import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import DashBoardPage from "./pages/DashBoard";
import OrderPage from "./pages/Order";
import CustomerRelationshipManagementPage from "./pages/CustomerRelationshipManagement";
import ECommercePage from "./pages/ECommerce";
import CategoryPage from "./pages/Category";
import SettingPage from "./pages/Setting";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <DashBoardPage />,
      },
      {
        path: "order",
        element: <OrderPage />,
      },
      {
        path: "crm",
        element: <CustomerRelationshipManagementPage />,
      },
      {
        path: "ecommerce",
        element: <ECommercePage />,
      },
      {
        path: "category",
        element: <CategoryPage />,
      },
      {
        path: "setting",
        element: <SettingPage />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
