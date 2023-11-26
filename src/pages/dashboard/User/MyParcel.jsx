import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../../AuthProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import noData from '../../../assets/BkQxD7wtnZ.gif';

const MyParcel = () => {
    const { user } = useContext(AuthContext);
    const [item, setItem] = useState([]);

    const { refetch } = useQuery({
        queryKey: ['booked parcel data'],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:5000/books/v1?email=${user.email}`);
            return setItem(response.data)
        }
    });

    function handleCancelBook(_id) {
        Swal.fire({
            title: "Are you sure?",
            text: "Once you cancel, you can't undo it",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axios.patch(`http://localhost:5000/book/update/v1/${_id}`).then(res => {

                    if (res.data.modifiedCount > 0) {
                        Swal.fire({
                            title: "Cancelled!",
                            text: "Item has been successfully Cancelled .",
                            icon: "success"
                        });
                        refetch();
                    }
                }).catch(err => console.log(err))

            }
        });
    }

    async function handleFilter(status) {
        const response = await axios.get(`http://localhost:5000/books/v1?email=${user.email}&status=${status}`);
        setItem(response.data)
    }

    return (
        <div className="">
            <form className="my-6">
                <select name="status" id="" className="py-2 px-4 rounded-sm bg-slate-100" onChange={(event) => handleFilter(event.target.value)}>
                    <option value="" disabled selected> Filter</option>
                    <option value="Pending">Pending</option>
                    <option value="On The Way">On The Way</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </form>
            {item.length < 1 ? <div className="flex justify-center items-center mt-20"><img className="w-[20%]" src={noData} alt="" /></div> : item?.map(book => <div key={book._id} className="shadow-md mb-7 mt-4 ">
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
                                <td className="px-6 py-4">{book.parcelType}</td>
                                <td className="px-6 py-4">{book.RequestedDeliveryDate}</td>
                                <td className="px-6 py-4">{book.approximateDeliveryDate ? book.approximateDeliveryDate : 'N/A'}</td>
                                <td className="px-6 py-4">{book.bookingDate}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="relative overflow-x-auto">
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
                                <td className="px-6 py-4">{book.deliveryMan ? book.deliveryMan : 'N/A'}</td>
                                <td className="px-6 py-4">{book.receiverName}</td>
                                <td className={book.status == 'Pending' ? 'px-6 py-4' : book.status == 'On The Way' ? 'px-6 py-4 text-sky-500' : book.status == 'Cancelled' ? 'px-6 py-4 text-red-600' : 'px-6 py-4 text-blue-600'}>{book.status}</td>
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
                            <button className={book.status !== 'Pending' ? 'btn-disabled text-slate-300' : 'text-red-600'}> <a className="font-medium hover:underline ms-3" onClick={() => handleCancelBook(book._id)}>Cancel</a> </button> </>}
                </div>
            </div>)}
        </div>

    );
};

export default MyParcel;