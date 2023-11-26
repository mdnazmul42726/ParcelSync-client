import { useContext } from "react";
import { AuthContext } from "../AuthProvider";
import Loader from "../components/Loader";
import { Navigate } from "react-router-dom";


const UserRoute = ({ children }) => {
    const { user, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <Loader />
    }

    if (!isLoading && user) {
        return children
    }

    return <Navigate to={'/login'} />
};

export default UserRoute;