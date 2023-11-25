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
import UserRoute from "./conditionalRoutes/UserRoute";
import MyParcel from "./pages/dashboard/User/MyParcel";
import UpdateBook from "./pages/dashboard/User/UpdateBook";
import Profile from "./pages/dashboard/User/Profile";

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
    path: '/dashboard', element: <UserRoute> <Dashboard /></UserRoute>,
    children: [
      { index: true, element: <div>Hello Home</div> },
      { path: '/dashboard/book-parcel', element: <UserRoute><BookParcel /></UserRoute> },
      { path: '/dashboard/my-parcel', element: <UserRoute><MyParcel /></UserRoute> },
      { path: '/dashboard/edit/:id', element: <UserRoute><UpdateBook /></UserRoute>, loader: ({ params }) => fetch(`http://localhost:5000/book/edit/${params.id}`) },
      { path: '/dashboard/profile', element: <UserRoute><Profile /></UserRoute> }
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