import { createBrowserRouter } from "react-router-dom";

import HomeScreen from "../screens/HomeScreen";
import App from "../App";
import ProductDetails from "../screens/ProductDetails";

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
    ],
  },
]);
