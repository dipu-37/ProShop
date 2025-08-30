import { createBrowserRouter } from "react-router-dom";

import HomeScreen from "../pages/HomeScreen";
import App from "../App";
import ProductDetails from "../pages/ProductDetails";
import CartPage from "../pages/cartPage";

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
    ],
  },
]);
