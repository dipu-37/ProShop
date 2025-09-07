import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./routes/index.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider options={{ clientId: "test" }}>
        {/* <PayPalButtons style={{ layout: "horizontal" }} /> */}
          <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </StrictMode>
);
