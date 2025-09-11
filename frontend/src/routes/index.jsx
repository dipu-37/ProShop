import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import SignInPage from "../pages/SignInPage";
import RegisterPage from "../pages/RegisterPage";
import ShippingPage from "../pages/ShippingPage";
import PaymentPage from "../pages/PaymentPage";
import PlaceOrderPage from "../pages/placeOrderPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import CartPage from "../pages/CartPage";
import OrderPage from "../pages/OrderPage";
import ProfilePage from "../pages/ProfilePage";
import OrderListPage from "../pages/Admin/OrderListPage";
import PrivateRoute from "./PrivateRoute";
import AdminPrivateRoute from "./AdminPrivateRoute";
import HomePage from "../pages/HomePage.";
import ProductListPage from "../pages/Admin/ProductListPage";
import ProductEditPage from "../pages/Admin/ProductEditPage";
import UsersListPage from "../pages/Admin/usersListPage";
import UserEditPage from "../pages/Admin/UserEditPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // Public routes
      {index:true, path: "/", element: <HomePage /> },
      { path: "product/:id", element: <ProductDetailsPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "login", element: <SignInPage /> },
      { path: "register", element: <RegisterPage /> },

      // Private routes
      {
        path: "/",
        element: <PrivateRoute />, // wrapper
        children: [
          { path: "profile", element: <ProfilePage /> },
          { path: "shipping", element: <ShippingPage /> },
          { path: "payment", element: <PaymentPage /> },
          { path: "placeorder", element: <PlaceOrderPage /> },
          { path: "order/:id", element: <OrderPage /> },
        ],
      },

      // admin
      {
        path: "/admin",
        element: <AdminPrivateRoute />, // wrapper + layout if needed
        children: [{ path: "orders", element: <OrderListPage /> },
          {path:'products',element:<ProductListPage></ProductListPage>},
          {path:'product/:id/edit',element:<ProductEditPage></ProductEditPage>},
          {path:'users',element:<UsersListPage></UsersListPage>},
          {path:'user/:id/edit',element:<UserEditPage></UserEditPage>},
        ],
      },
    ],
  },
]);
