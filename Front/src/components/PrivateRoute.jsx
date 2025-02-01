import {useContext} from "react";
import {Navigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

// eslint-disable-next-line react/prop-types
function PrivateRoute({children}) {
  const {user} = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
