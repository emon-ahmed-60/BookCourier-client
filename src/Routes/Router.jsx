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
import AllUsers from "../Pages/AllUsers";
import MyWishList from "../Pages/MyWishList";
import AddBooks from "../Pages/AddBooks";
import MyBooks from "../Pages/MyBooks";
import ManageOrders from "../Pages/ManageOrders";

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
        path:'add-book',
        Component:AddBooks
      },
      {
        path:'my-wishlist',
        Component:MyWishList
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
      {
        path:"my-books",
        Component:MyBooks
      },
      {
        path:'manage-orders',
        Component: ManageOrders
      },
      {
        path:"all-users",
        Component:AllUsers
      },
    ],
  },
]);
