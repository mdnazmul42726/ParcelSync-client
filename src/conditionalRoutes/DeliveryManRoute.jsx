import { useContext } from "react";
import { AuthContext } from "../AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../components/Loader";
import { Navigate, useNavigate } from "react-router-dom";


const DeliveryManRoute = ({ children }) => {
    const { user, isLoading, logOut } = useContext(AuthContext);
    const { data = [], isPending } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await axios.get(`https://server-iota-peach-25.vercel.app/user/v1?email=${user.email}`);
            return response.data
        }
    })

    if (isLoading) {
        return <Loader />
    }

    if (isPending) {
        return <Loader />
    }

    if (!isLoading && user && data.accType == 'Delivery Man') {
        return children
    }

    return (
        logOut().then(() => {
            <Navigate  to={'/login'}/>
        })

    )

};

export default DeliveryManRoute;