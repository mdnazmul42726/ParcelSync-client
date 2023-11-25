import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider";
import { Link } from "react-router-dom";

const MyParcel = () => {
    const { user } = useContext(AuthContext);

    const { data = [] } = useQuery({
        queryKey: ['booked parcel data'],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:5000/books/v1?email=${user.email}`);
            return response.data;
        }
    });

    console.log(data);

    return (
        <div className="">
            {data.map(book => <div key={book._id} className="shadow-md mb-7 mt-4 ">
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Parcel Type</th>
                                <th scope="col" className="px-6 py-3">Requested Delivery Date</th>
                                <th scope="col" className="px-6 py-3">Approximate Delivery Date</th>
                                <th scope="col" className="px-6 py-3">Booking Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{book.parcelType}</th>
                                <td className="px-6 py-4">{book.RequestedDeliveryDate}</td>
                                <td className="px-6 py-4">{book.approximateDeliveryDate ? book.approximateDeliveryDate : 'N/A'}</td>
                                <td className="px-6 py-4">{book.bookingDate}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="relative overflow-x-auto mt-5">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Delivery Men</th>
                                <th scope="col" className="px-6 py-3">Receiver Name</th>
                                <th scope="col" className="px-6 py-3">Booking Status</th>
                                <th scope="col" className="px-6 py-3">
                                    Cost
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{book.deliveryMan ? book.deliveryMan : 'N/A'}</th>
                                <td className="px-6 py-4">{book.receiverName}</td>
                                <td className={book.status == 'Pending' ? 'px-6 py-4' : book.status == 'On The Way' ? 'px-6 py-4 text-sky-500' : book.status == 'Canceled' ? 'px-6 py-4 text-red-600' : 'px-6 py-4 text-blue-600'}>{book.status}</td>
                                <td className="px-6 py-4">
                                    TK {book.price}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-end mr-10 p-3">
                    {book.status == 'Delivered' ? <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Review</a>
                        : <> <Link to={`/dashboard/edit/${book._id}`}><button className={book.status !== 'Pending' ? 'btn-disabled text-slate-300' : 'text-blue-600'}><a className="font-medium hover:underline">Edit</a></button></Link>
                            <button className={book.status !== 'Pending' ? 'btn-disabled text-slate-300' : 'text-red-600'}> <a className="font-medium hover:underline ms-3">Cancel</a> </button> </>}
                </div>
            </div>)}
        </div>

    );
};

export default MyParcel;