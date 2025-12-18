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
import AdminRote from "./AdminRote";
import AdminProfile from "../Pages/AdminProfile";
import ManageBooks from "../Pages/ManageBooks";
import LibrarianRoute from "./LibrarianRoute";

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
        element: (
          <PrivateRoute>
            <BookDetails />
          </PrivateRoute>
        ),
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
        path: "my-wishlist",
        Component: MyWishList,
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
        path: "add-book",
        element: (
          <LibrarianRoute>
            <AddBooks />
          </LibrarianRoute>
        ),
      },
      {
        path: "my-books",
        element: (
          <LibrarianRoute>
            <MyBooks />
          </LibrarianRoute>
        ),
      },
      {
        path: "manage-orders",
        element: (
          <LibrarianRoute>
            <ManageOrders />
          </LibrarianRoute>
        ),
      },
      {
        path: "approve-librarians",
        element: (
          <AdminRote>
            <ApproveLibrarian />
          </AdminRote>
        ),
      },
      {
        path: "admin-profile",
        element: (
          <AdminRote>
            <AdminProfile />
          </AdminRote>
        ),
      },
      {
        path: "manage-books",
        element: (
          <AdminRote>
            <ManageBooks />
          </AdminRote>
        ),
      },
      {
        path: "all-users",
        element: (
          <AdminRote>
            <AllUsers />
          </AdminRote>
        ),
      },
    ],
  },
]);
