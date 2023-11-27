import { useContext } from "react";
import { AuthContext } from "../AuthProvider";
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../components/Loader";

const CustomerRoute = ({ children }) => {
    const { user, isLoading, logOut } = useContext(AuthContext);
    const { data = [], isPending } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:5000/user/v1?email=${user.email}`);
            return response.data
        }
    });

    if (isLoading) {
        return <Loader />
    }

    if (isPending) {
        return <Loader />
    }

    if (!isLoading && user && data.accType == 'Customer') {
        return children
    }

    return (
        logOut().then(() => {
            <Navigate to={'/login'} />
        })

    )
};

export default CustomerRoute;