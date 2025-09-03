import { createBrowserRouter } from "react-router-dom";

import HomeScreen from "../pages/HomePage.";
import App from "../App";
import ProductDetails from "../pages/ProductDetails";
import CartPage from "../pages/CheckOutPage";
import SignInPage from "../pages/SignInPage";
import RegisterPage from "../pages/RegisterPage";
import ShippingPage from "../pages/ShippingPage";
import PrivateRoute from "./PrivateRoute";
import PaymentPage from "../pages/PaymentPage";

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
        element: <ProductDetails></ProductDetails>,
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
        element: <PrivateRoute><ShippingPage></ShippingPage></PrivateRoute>,
      },
      {
        path: "/payment",
        element: <PrivateRoute><PaymentPage></PaymentPage></PrivateRoute>,
      },
    ],
  },
]);
