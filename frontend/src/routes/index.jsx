import { createBrowserRouter } from "react-router-dom";

import HomeScreen from "../pages/HomePage.";
import App from "../App";
import SignInPage from "../pages/SignInPage";
import RegisterPage from "../pages/RegisterPage";
import ShippingPage from "../pages/ShippingPage";
import PrivateRoute from "./PrivateRoute";
import PaymentPage from "../pages/PaymentPage";
import PlaceOrderPage from "../pages/placeOrderPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import CartPage from "../pages/CartPage";
import OrderPage from "../pages/OrderPage";
import ProfilePage from "../pages/ProfilePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <HomeScreen />,
      },
      {
        path: "/product/:id",
        element: <ProductDetailsPage></ProductDetailsPage>,
      },
      {
        path: "/cart",
        element: <CartPage></CartPage>,
      },
      {
        path: "/login",
        element: <SignInPage></SignInPage>,
      },
      {
        path: "/register",
        element: <RegisterPage></RegisterPage>,
      },
      {
        path: "/shipping",
        element: (
          <PrivateRoute>
            <ShippingPage></ShippingPage>
          </PrivateRoute>
        ),
      },
      {
        path: "/payment",
        element: (
          <PrivateRoute>
            <PaymentPage></PaymentPage>
          </PrivateRoute>
        ),
      },
      {
        path: "/placeorder",
        element: (
          <PrivateRoute>
            <PlaceOrderPage></PlaceOrderPage>
          </PrivateRoute>
        ),
      },
      {
        path: "/order/:id",
        element: (
          <PrivateRoute>
           <OrderPage></OrderPage>
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
          <ProfilePage></ProfilePage>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
