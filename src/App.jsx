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
import { loader as userLoader } from "./pages/UserProfile";
import { loader as productLoader } from "./pages/ECommerce";
import { loader as categoryOptionsLoader } from "./pages/Product";

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
        path: "crm/:userId",
        element: <UserProfile />,
        loader: userLoader,
      },
      {
        path: "ecommerce",
        element: <ECommercePage />,
        loader: productLoader,
      },
      {
        path: "ecommerce/add-product",
        element: <AddProduct />,
        loader: categoryOptionsLoader,
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
