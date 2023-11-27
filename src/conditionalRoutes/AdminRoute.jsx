import { useContext } from "react";
import { AuthContext } from "../AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../components/Loader";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const { user, isLoading, logOut } = useContext(AuthContext);
    const location = useLocation();
    const { data = [], isPending } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:5000/user/v1?email=${user.email}`);
            return response.data
        }
    })

    if (isLoading) {
        return <Loader />
    }

    if (isPending) {
        return <Loader />
    }

    if (!isLoading && user && data.accType == 'Admin') {
        return children
    }

    return (
        logOut().then(() => {
            <Navigate state={location} to={'/login'} />
        })

    )

};

export default AdminRoute;