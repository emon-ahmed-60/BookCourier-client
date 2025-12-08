import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home";
import LoginPage from "../Auth/LoginPage";
import Register from "../Auth/Register";
import Books from "../Pages/Books";
import RequestDelivery from "../Pages/RequestDelivery";
import Dashboard from "../Layouts/Dashboard";
import MyOrders from "../Pages/MyOrders";
import BookDetails from "../Components/BookDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children:[
        {
            index:true,
            Component:Home
        },
        {
            path:"/login",
            Component:LoginPage
        },
        {
            path:"/register",
            Component:Register
        },
        {
          path:"/books",
          Component:Books
        },
        {
          path:"/requestdelivery",
          Component:RequestDelivery
        },
        {
          path:"/book-details/:id",
          Component:BookDetails
        }
    ]
  },
  {
    path:"/dashboard",
    Component:Dashboard,
    children:[
      {
        index:true,
        Component:MyOrders
      }
    ]
  }
]);