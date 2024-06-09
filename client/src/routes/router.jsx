import { createBrowserRouter } from "react-router-dom";

import Register from "../pages/auth/Register.jsx";
import Login from "../pages/auth/Login.jsx";
import Home from "../pages/home/Home.jsx";
import Layout from "../components/layout/Layout.jsx";
import Contacts from "../pages/contacts/Contacts.jsx";
import PostDetails from "../pages/home/PostDetail.jsx";
import Users from "../pages/admin/Users.jsx";

 const routing = createBrowserRouter([
    {
      path: "/",
      element: (   
          <Layout />
      ),
      children: [
        { index: true, element: <Home /> },
        {
            path: "register",
            element: <Register />,
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "contacts",
            element: <Contacts />,
          },
          {
            path: "users",
            element: <Users />,
          },
      ],
    },
    {
        path: "posts",
        element: (
          <Layout />
        ),
        children: [
          { index: true, element: <Home /> }, 
          {
            path: ":postId",
            element: <PostDetails />, 
          },
        ],
      },
   
  ]);
  
  export default routing;