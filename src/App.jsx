import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import DashBoardPage from "./pages/DashBoard";
import OrderPage from "./pages/Order";
import CustomerRelationshipManagementPage from "./pages/CustomerRelationshipManagement";
import ECommercePage from "./pages/ECommerce";
import CategoryPage from "./pages/Category";
import SettingPage from "./pages/Setting";
import UserProfile from "./pages/UserProfile";
import OrderDetail from "./pages/OrderDetail";
import AddProduct from "./pages/Product";
import { loader as membershipLoader } from "./pages/CustomerRelationshipManagement";
import { loader as categoriesLoader } from "./pages/Category";

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
        path: "order/:orderId",
        element: <OrderDetail />,
      },
      {
        path: "crm",
        element: <CustomerRelationshipManagementPage />,
        loader: membershipLoader,
      },
      {
        path: "ecommerce",
        element: <ECommercePage />,
      },
      {
        path: "category",
        element: <CategoryPage />,
        loader: categoriesLoader,
      },
      {
        path: "setting",
        element: <SettingPage />,
      },
      {
        path: "user/:userId",
        element: <UserProfile />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
