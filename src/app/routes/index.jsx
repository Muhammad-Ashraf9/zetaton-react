import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import NotFound from "../../pages/NotFound";
import Home from "../../pages/Home";
import Login from "../../features/auth/Login";
import Signup from "../../features/auth/Signup";
import Favourites from "../../features/favourites/Favourites";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      {/* <Route path="/" element={<Home />} errorElement={<ErrorPage />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/favourites" element={<Favourites />} />
      <Route path="*" element={<NotFound />} />
    </>
  )
);

function Routes() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default Routes;
