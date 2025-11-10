import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import User from "./pages/user";
import UserWorksList from "./pages/user-works-list";
import UserAddWork from "./pages/user-add-work";
import UserEditWork from "./pages/user-edit-work";
import UserAddPerform from "./pages/user-add-perform";
import UserRights from "./pages/user-rights";
import ErrorPage from "./pages/error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="login"/>,
    errorElement: <ErrorPage/>,  // new
  },
  {
    path: "/",
    element: <Navigate to="login"/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/user",
    element: <User/>,
  },
  {
    path: "/user-works-list",
    element: <UserWorksList/>,
  },
  {
    path: "/user-add-work",
    element: <UserAddWork/>,
  },
  {
    path: "/user-edit-work/:workId",
    element: <UserEditWork/>,
  },
  {
    path: "/user-add-perform",
    element: <UserAddPerform/>,
  },
  {
    path: "/user-rights",
    element: <UserRights/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
