import { createBrowserRouter, createHashRouter } from "react-router-dom";
import App from "../App";
import HomeScreen from "../pages/HomeScreen";
import LoginScreen from "../pages/LoginScreen";
import RegisterScreen from "../pages/RegisterScreen";
import ProfileScreen from "../pages/ProfileScreen";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import CartScreen from "../pages/CartScreen";
import SearchProduct from "../pages/SearchProduct";
import ConfirmationScreen from "../pages/ConfirmationScreen";
import OrderScreen from "../pages/OrderScreen";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import RegisteredSuccessfully from "../pages/RegisteredSuccessfully";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomeScreen />,
      },
      {
        path: "login",
        element: <LoginScreen />,
      },
      {
        path: "register",
        element: <RegisterScreen />,
      },
      {
        path: "profile",
        element: <ProfileScreen />,
      },
      {
        path: "category/:category",
        element: <CategoryProduct />,
      },
      {
        path: "product/:productId",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <CartScreen />,
      },
      {
        path: "search",
        element: <SearchProduct />,
      },
      {
        path: "confirmation",
        element: <ConfirmationScreen />,
      },
      {
        path: "order",
        element: <OrderScreen />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password/:token",
        element: <ResetPassword />,
      },
      {
        path: "registered-successfully",
        element: <RegisteredSuccessfully />,
      },
      {
        path: "admin-panel",
        element: <AdminPanel />,
        children: [
          {
            path: "all-users",
            element: <AllUsers />,
          },
          {
            path: "all-products",
            element: <AllProducts />,
          },
        ],
      },
    ],
  },
]);

export default router;
