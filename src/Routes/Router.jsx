import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home";
import LoginPage from "../Auth/LoginPage";
import Register from "../Auth/Register";
import Books from "../Pages/Books";
import Dashboard from "../Layouts/Dashboard";
import MyOrders from "../Pages/MyOrders";
import BookDetails from "../Components/BookDetails";
import MyProfile from "../Pages/MyProfile";
import PaymentFailed from "../Pages/PaymentFailed";
import PaymentSuccess from "../Pages/PaymentSuccess";
import Invoices from "../Pages/Invoices";
import PrivateRoute from "./PrivateRoute";
import BeALibrarian from "../Pages/BeALibrarian";
import ApproveLibrarian from "../Components/ApproveLibrarian";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: LoginPage,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/books",
        Component: Books,
      },
      {
        path: "/request-librarian",
        element: (
          <PrivateRoute>
            {" "}
            <BeALibrarian />{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "/book-details/:id",
        Component: BookDetails,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        {" "}
        <Dashboard />{" "}
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-orders",
        Component: MyOrders,
      },
      {
        path: "my-profile",
        Component: MyProfile,
      },
      {
        path: "my-payments",
        Component: Invoices,
      },
      {
        path: "payment-failed",
        Component: PaymentFailed,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: 'approve-librarians',
        Component:ApproveLibrarian
      },
    ],
  },
]);
