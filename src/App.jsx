import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import DefaultLayout from "./layout/DefaultLayout";
import DashBoardPage from "./pages/DashBoard";
import OrderPage from "./pages/Order";
import CustomerRelationshipManagementPage from "./pages/CustomerRelationshipManagement";
import ECommercePage from "./pages/ECommerce";
import CategoryPage from "./pages/Category";
import SettingPage from "./pages/Setting";
import UserProfile from "./pages/UserProfile";
import OrderDetail from "./pages/OrderDetail";
import NewProduct from "./pages/NewProduct";
import NewCategory from "./pages/NewCategory";
import EditCategory from "./pages/EditCategory";
import NewMembership from "./pages/NewMembership";
import EditMembership from "./pages/EditMembership";

import { queryClient } from "./api/client";
import { loader as orderLoader } from "./pages/Order";
import { loader as orderDetailLoader } from "./pages/OrderDetail";
import { loader as dashboardLoader } from "./pages/DashBoard";

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
        children: [
          { path: "new", element: <NewMembership /> },
          { path: ":membershipId/edit", element: <EditMembership /> },
        ],
      },
      {
        path: "crm/user-detail/:userId",
        element: <UserProfile />,
      },
      {
        path: "ecommerce",
        element: <ECommercePage />,
      },
      {
        path: "ecommerce/new",
        element: <NewProduct />,
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
