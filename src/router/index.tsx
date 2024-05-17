import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import List from "../pages/List";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/lists/:listId",
    element: <List />,
  },
]);
