import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/authCheck";

export default function PrivateRoute  ({ children }) {
    let {user} = isAuthenticated()
    return !user ? children: <Navigate to={'/login'}></Navigate>;
};
