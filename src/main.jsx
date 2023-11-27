import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()
import "./index.css";
import Root from "./Root";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthProvider from "./AuthProvider";
import Dashboard from "./pages/dashboard/Dashboard";
import BookParcel from "./pages/dashboard/User/BookParcel";
import MyParcel from "./pages/dashboard/User/MyParcel";
import UpdateBook from "./pages/dashboard/User/UpdateBook";
import Profile from "./pages/dashboard/User/Profile";
import AllParcel from "./pages/dashboard/Admin/AllParcel";
import CustomerRoute from "./conditionalRoutes/CustomerRoute";
import UserRoute from "./conditionalRoutes/UserRoute";
import AdminRoute from "./conditionalRoutes/AdminRoute";
import AllDeliveryMan from "./pages/dashboard/Admin/AllDeliveryMan";
import AllUser from "./pages/dashboard/Admin/AllUser";
import DeliveryManRoute from "./conditionalRoutes/DeliveryManRoute";
import MyDeliveryList from "./pages/dashboard/Delivery_Man/MyDeliveryList";
import Review from "./pages/dashboard/Delivery_Man/Review";
import DashboardHome from "./pages/dashboard/DashboardHome";

const router = createBrowserRouter([
  {
    path: "/", element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> }
    ]
  },
  {
    path: '/dashboard', element: <UserRoute><Dashboard /></UserRoute>,
    children: [
      { index: true, element: <UserRoute><DashboardHome /></UserRoute> },

      // Customer routes
      { path: '/dashboard/book-parcel', element: <CustomerRoute><BookParcel /></CustomerRoute> },
      { path: '/dashboard/my-parcel', element: <CustomerRoute><MyParcel /></CustomerRoute> },
      { path: '/dashboard/edit/:id', element: <CustomerRoute><UpdateBook /></CustomerRoute>, loader: ({ params }) => fetch(`http://localhost:5000/book/edit/${params.id}`) },

      // all type of logged in user
      { path: '/dashboard/profile', element: <UserRoute><Profile /></UserRoute> },

      // Admin routes
      { path: '/dashboard/all-parcels', element: <AdminRoute><AllParcel /></AdminRoute> },
      { path: '/dashboard/all-deliveryman', element: <AdminRoute><AllDeliveryMan /></AdminRoute> },
      { path: '/dashboard/users', element: <AdminRoute><AllUser /></AdminRoute> },

      // Delivery man routes
      { path: '/dashboard/my-delivery-list', element: <DeliveryManRoute><MyDeliveryList /></DeliveryManRoute> },
      { path: '/dashboard/reviews', element: <DeliveryManRoute><Review /></DeliveryManRoute> }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider><RouterProvider router={router} /></AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);