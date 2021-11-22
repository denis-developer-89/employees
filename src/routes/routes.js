import EmployessPage from "../pages/EmployessPage/EmployessPage";
import {Navigate} from "react-router-dom";

const routes = [
    {
        path: '/employess/',
        element: <EmployessPage/>,
    },
    {
        path: '*',
        element: <Navigate to="/employess/"/>,
    }
];

export default routes;