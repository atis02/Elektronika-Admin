import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import LandingPageLayout from "./layouts/LandingPageLayout";
import Dashboard from "./Pages/Dashboard";
import Main from "./Pages/Main";
import Account from "./Pages/Account";
import Category from "./Pages/Category";
import SubCategory from "./Pages/SubCategory";
import Segment from "./Pages/Segment";
import Products from "./Pages/Products";
import Login from "./layouts/LogIn";
import NewProduct from "./Pages/Products/components/NewProduct";
import Product from "./Pages/Product";
import Settings from "./Pages/Settings";
import ProductStasus from "./Pages/Settings/components/ProductStasus/ProductStasus";
import OrderStasus from "./Pages/Settings/components/orderStasus/OrderStatus";
import RegionsAndPrice from "./Pages/Settings/components/RegionsAndPrice/RegionsAndPrice";
import Brands from "./Pages/Brand";
import Banners from "./Pages/Banner";
import Partners from "./Pages/Partners";
import Orders from "./Pages/Orders";
import Order from "./Pages/Order";
import Auction from "./Pages/Auction";
import FinishedAuctions from "./Pages/FinishedAuctions";
import NewAuction from "./Pages/Auction/components/NewAuction";
import UpdateAuction from "./Pages/Auction/components/UpdateAuction";
import UsersAdminPage from "./Pages/Settings/components/UsersAdminPage/UsersAdminPage";

function App() {
  // const refToken = store.getState().refreshToken;
  // const refresh = useRefreshToken();

  // useEffect(() => {
  //   useRefreshToken();
  // }, [refToken]);

  const ProtectedRoute = ({ children }) => {
    // const isLoggedIn = useSelector((state) => state.auth.user == null);
    const isLoggedIn = localStorage.getItem("token");

    if (!isLoggedIn) {
      return <Navigate to="/login" replace />; // Redirect to login on unauthorized access
    }

    return children; // Render child component if logged in
  };
  const router = createBrowserRouter(
    [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <LandingPageLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "/",
            element: <Main />,
          },
          {
            path: "/orders",
            element: <Orders />,
          },

          {
            path: "/orders/:id",
            element: <Order />,
          },
          {
            path: "/auction",
            element: <Auction />,
          },
          {
            path: "/auction/new",
            element: <NewAuction />,
          },
          {
            path: "/auction/:id",
            element: <UpdateAuction />,
          },
          {
            path: "/auction/finished",
            element: <FinishedAuctions />,
          },
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/category",
            element: <Category />,
          },
          {
            path: "/subcategory",
            element: <SubCategory />,
          },
          {
            path: "/segment",
            element: <Segment />,
          },
          {
            path: "/products",
            element: <Products />,
          },
          {
            path: "/products/:id",
            element: <Product />,
          },
          {
            path: "/brand",
            element: <Brands />,
          },
          {
            path: "/banners",
            element: <Banners />,
          },
          {
            path: "/partners",
            element: <Partners />,
          },
          {
            path: "/products/new",
            element: <NewProduct />,
          },
          {
            path: "/settings",
            element: <Settings />,
          },
          {
            path: "/settings/productStasuses",
            element: <ProductStasus />,
          },
          {
            path: "/settings/orderStatuses",
            element: <OrderStasus />,
          },

          {
            path: "/settings/regions",
            element: <RegionsAndPrice />,
          },
          {
            path: "/settings/users",
            element: <UsersAdminPage />,
          },
          {
            path: "/settings/clients",
            element: <ProductStasus />,
          },
          {
            path: "/settings/deliveryTimes",
            element: <ProductStasus />,
          },
          {
            path: "/settings/deliveryTypes",
            element: <ProductStasus />,
          },
          {
            path: "/settings/paymentTypes",
            element: <ProductStasus />,
          },
          {
            path: "/account",
            element: <Account />,
          },
        ],
      },
    ],
    {
      basename: "/admin", // Указываем base path
    }
  );

  return (
    <RouterProvider
      basename="/admin"
      router={router}
      style={{ minHeight: "100vh" }}
    />
  );
}

export default App;
