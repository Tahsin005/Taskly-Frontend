import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/authCheck";
import PropTypes from 'prop-types'
export default function PrivateRoute  ({ children }) {
    let {user} = isAuthenticated()
    return !user ? children: <Navigate to={'/login'}></Navigate>;
};
PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired
}