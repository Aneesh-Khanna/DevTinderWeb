import { createBrowserRouter, RouterProvider } from "react-router-dom";
import appStore from "./utils/ReduxStore/appStore";
import { Provider } from "react-redux";
import useOnlineStatus from "./customHooks/useOnlineStatus";
import CustomOfflinePage from "./components/CustomOfflinePage";

import Body from "./components/Body";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import ChangePassword from "./components/ChangePassword";
import VerifyEmail from "./components/VerifyEmail";

function App() {
  const isOnline = useOnlineStatus();
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
      children: [
        {
          path: "/",
          element: <Feed />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/connections",
          element: <Connections />,
        },
        {
          path: "/requests",
          element: <Requests />,
        },
        {
          path: "/changepassword",
          element: <ChangePassword />,
        },
        {
          path: "/verifyemail",
          element: <VerifyEmail />,
        },
      ],
    },
  ]);

  return (
    <>
      <Provider store={appStore}>
        {/* Conditional render based on online status */}
        {!isOnline ? (
          <CustomOfflinePage />
        ) : (
          <RouterProvider router={appRouter} />
        )}
      </Provider>
    </>
  );
}

export default App;
