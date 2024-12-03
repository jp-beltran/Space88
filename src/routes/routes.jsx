import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Shedule from "../pages/Shedule";
import BarberView from "../pages/BarberView";
import UserView from "../pages/UserView";

const router = createBrowserRouter([
    
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },

    {
        path: "/shedule",
        element: <Shedule />,
    },

    {
        path: "/barber",
        element: <BarberView />,
    },

    {
        path: "/user",
        element: <UserView/>,
    },
]);
export default router;