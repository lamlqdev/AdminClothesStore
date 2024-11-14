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
import { loader as userLoader } from "./pages/UserProfile";
import { loader as productLoader } from "./pages/ECommerce";
import { loader as categoryOptionsLoader } from "./pages/Product";
import { loader as orderLoader } from "./pages/Order";
import { loader as orderDetailLoader } from "./pages/OrderDetail";
import { loader as dashboardLoader } from "./pages/DashBoard";
import NewCategory from "./pages/NewCategory";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/firebaseApi";
import EditCategory from "./pages/EditCategory";
const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <DashBoardPage />,
        loader: dashboardLoader,
      },
      {
        path: "order",
        element: <OrderPage />,
        loader: orderLoader,
      },
      {
        path: "order/:orderId",
        element: <OrderDetail />,
        loader: orderDetailLoader,
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
        children: [
          { path: "new", element: <NewCategory /> },
          { path: ":categoryId/edit", element: <EditCategory /> },
        ],
      },
      {
        path: "setting",
        element: <SettingPage />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
