import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Dish from "../pages/dish";
import Error from "../pages/errorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/recipe/:recipeId",
    element: <Dish />,
  },
  {
    path: "/error",
    element: <Error />,
    errorElement: <Error />,
  },
]);

export default router;
