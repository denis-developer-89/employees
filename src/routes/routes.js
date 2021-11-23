import EmployessPage from "../pages/EmployessPage/EmployessPage";
import { Navigate } from "react-router-dom";

const routes = [
  {
    path: "/employees",
    element: <EmployessPage />,
  },
  {
    path: "*",
    element: <Navigate to="/employees" />,
  },
];

export default routes;
