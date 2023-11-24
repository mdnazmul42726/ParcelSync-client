import { useContext } from "react";
import { AuthContext } from "../AuthProvider";
import loader from '../assets/giphy.gif';
import { Navigate } from "react-router-dom";

const UserRoute = ({ children }) => {
    const { user, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return (
            <div className="w-full flex justify-center items-center">
                <img className="w-[30%]" src={loader} alt="" />
            </div>
        )
    }

    if (!isLoading && user) {
        return children
    }

   return <Navigate to={'/login'} />
};

export default UserRoute;