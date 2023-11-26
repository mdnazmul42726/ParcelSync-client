import { useContext } from "react";
import { AuthContext } from "../AuthProvider";
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../components/Loader";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.config";

const CustomerRoute = ({ children }) => {
    const { user, isLoading } = useContext(AuthContext);
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
        signOut(auth).then(() => {
            <Navigate to={'/login'} />
        }).catch(err => console.log(err))
    )
};

export default CustomerRoute;