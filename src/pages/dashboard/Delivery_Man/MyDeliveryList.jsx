import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IoLocationSharp } from "react-icons/io5";
import Swal from "sweetalert2";

const MyDeliveryList = () => {
    const { user } = useContext(AuthContext);

    const { data = [], refetch } = useQuery({
        queryKey: ['item'],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:5000/delivery-man/items?email=${user.email}`);
            return response.data
        }
    });

    function handleChangeStatus(_id, status) {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Proceed"
        }).then((result) => {
            if (result.isConfirmed) {

                axios.patch(`http://localhost:5000/book/delivery-man/status?id=${_id}&status=${status}`).then(res => {

                    if (res.data.matchedCount > 0) {
                        Swal.fire({
                            title: "Success!",
                            text: "Parcel status has been successfully updated.",
                            icon: "success"
                        });
                        refetch()
                    }

                }).catch(err => console.log(err));
            }
        });
    }

    return (
        <div>
            <div className="">
                {data.map(book => <div key={book._id}>
                    <div className="shadow-md mb-7 mt-4 ">
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Customer Name</th>
                                        <th scope="col" className="px-6 py-3">Customer Mobile No.</th>
                                        <th scope="col" className="px-6 py-3">Requested Delivery Date</th>
                                        <th scope="col" className="px-6 py-3">Approximate Delivery Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white border-b">
                                        <td className="px-6 py-4">{book.senderName}</td>
                                        <td className="px-6 py-4">{book.senderPhoneNumber}</td>
                                        <td className="px-6 py-4">{book.RequestedDeliveryDate}</td>
                                        <td className="px-6 py-4">{book.approximateDeliveryDate}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Receiver Name</th>
                                        <th scope="col" className="px-6 py-3">Receiver Address</th>
                                        <th scope="col" className="px-6 py-3">Receiver Phone No.</th>
                                        <th scope="col" className="px-6 py-3">Status</th>
                                        <th scope="col" className="px-6 py-3">Location</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white border-b">
                                        <td className="px-6 py-4">{book.receiverName}</td>
                                        <td className="px-6 py-4">{book.deliveryAddress}</td>
                                        <td className="px-6 py-4">{book.ReceiverPhoneNumber}</td>
                                        <td className={book.status == 'Pending' ? 'px-6 py-4' : book.status == 'On The Way' ? 'px-6 py-4 text-sky-500' : book.status == 'Cancelled' ? 'px-6 py-4 text-red-600' : 'px-6 py-4 text-blue-600'}>{book.status}</td>
                                        <td className="px-6 cursor-pointer hover:text-red-600 py-4"><IoLocationSharp className="text-xl" /></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="">
                                <div className="flex justify-end mr-10 p-3">
                                    <button className={book.status == 'Cancelled' || book.status == 'Delivered' ? 'btn-disabled text-stone-400' : 'text-blue-600 hover:underline hover:text-blue-700'} onClick={() => handleChangeStatus(book._id, 'Delivered')}><span className="font-semibold mr-4">Delivered</span>
                                    </button>
                                    <button className={book.status == 'Cancelled' || book.status == 'Delivered' ? 'btn-disabled text-stone-400' : 'text-red-600 hover:underline hover:text-red-700'} onClick={() => handleChangeStatus(book._id, 'Cancelled')}><span className="font-semibold">Cancel</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}
            </div>
        </div>
    );
};

export default MyDeliveryList;