import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AllDeliveryMan = () => {

    const { data = [] } = useQuery({
        queryKey: ['delivery man'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:5000/user/delivery-man');
            return response.data
        }
    });

    return (
        <div>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Delivery Man`s Name</th>
                            <th scope="col" className="px-6 py-3">Email Address</th>
                            <th scope="col" className="px-6 py-3">Number of Parcel Delivered</th>
                            <th scope="col" className="px-6 py-3">Average Review</th>

                        </tr>
                    </thead>
                    {data.map(user => <tbody key={user._id}>
                        <tr className="bg-white border-b">
                            <td className="px-6 py-4">{user.name}</td>
                            <td className="px-6 py-4">{user.email}</td>
                            <td className="px-6 py-4">{user.deliveredCount ? user.deliveredCount : 0}</td>
                            <td className="px-6 py-4">{user.avgReview ? user.avgReview : '0.00'}</td>
                        </tr>
                    </tbody>)}
                </table>
            </div>
        </div>
    );
};

export default AllDeliveryMan;