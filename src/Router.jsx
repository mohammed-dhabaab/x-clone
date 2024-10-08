import Navbar from "./components/Navbar";
import Side from "./components/Side";
import Account from "./pages/Account/Account";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import styles from "./styles";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Home from "./pages/Home/Home";
import Registration from "./pages/Registration/Registration";

function MainLayout() {
  return (
    <div className={`${styles.wrapper} flex`}>
      <Navbar />
      <Outlet />
      <Side />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Registration />,
      },
      {
        path: "home",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
        ],
      },
      {
        path: "account",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Account />,
          },
        ],
      },
    ]
  }
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;