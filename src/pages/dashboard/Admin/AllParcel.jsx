import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const AllParcel = () => {
    const [openModal, setOpenModal] = useState(false);
    const [parcelID, setParcelID] = useState('');

    const { data = [], refetch } = useQuery({
        queryKey: ['books'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:5000/books/v2');
            return response.data;
        }
    });

    const { data: deliveryMan = [] } = useQuery({
        queryKey: ['delivery dan'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:5000/user/delivery-man');
            return response.data
        }
    });

    function handleDeleteCancelledBook(_id) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {


                axios.delete(`http://localhost:5000/book/delete/${_id}`).then(res => {
                    if (res.data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Item has been deleted.",
                            icon: "success"
                        });
                        refetch()
                    }
                }).catch(err => console.log(err))
            }
        });
    }

    function handleModal(_id) {
        setParcelID(_id);
        setOpenModal(true);
    }

    function handleParcelAssign(event) {
        event.preventDefault();
        const deliveryMan = event.target.deliveryMan.value;
        const approximateDeliveryDate = event.target.approximateDeliveryDate.value;
        const status = 'On The Way';

        const adminAssignData = { deliveryMan, approximateDeliveryDate, status }

        axios.patch(`http://localhost:5000/book/admin/assign/v1?id=${parcelID}`, adminAssignData).then(res => {

            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    icon: 'success',
                    title: 'Parcel is "On The Way"',
                    text: `Parcel status on the way. Assigned delivery man will deliver as soon as possible`
                });
                setOpenModal(false)
                refetch()
            }

        }).catch(err => console.log(err))
    }

    return (

        <div className="">
            {openModal ? <>
                <div className="flex justify-center items-center mt-40">
                    <form className="w-full max-w-lg" onSubmit={handleParcelAssign}>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    Delivery Man
                                </label>
                                <select name="deliveryMan" id="" required className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="">
                                    <option selected disabled value="">Select Delivery Man</option>
                                    {deliveryMan.map(DM => <option key={DM._id} value={DM._id}>{DM.name}</option>)}
                                </select>
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    Approximate Delivery Date
                                </label>
                                <input required className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" name="approximateDeliveryDate" type="date" placeholder="Enter Your Current Address" />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <button className="text-white py-2 px-5 rounded-sm bg-sky-500 hover:bg-sky-600 uppercase ">Assign</button>
                        </div>
                    </form>
                </div>
            </> : <>
                {data?.map(book => <div key={book._id}>
                    <div className="shadow-md mb-7 mt-4 ">
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Customer Name</th>
                                        <th scope="col" className="px-6 py-3">Customer Email</th>
                                        <th scope="col" className="px-6 py-3">Customer Mobile No.</th>
                                        <th scope="col" className="px-6 py-3">Parcel Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white border-b">
                                        <td className="px-6 py-4">{book.senderName}</td>
                                        <td className="px-6 py-4">{book.senderEmail}</td>
                                        <td className="px-6 py-4">{book.senderPhoneNumber}</td>
                                        <td className="px-6 py-4">{book.parcelType}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Booking Date</th>
                                        <th scope="col" className="px-6 py-3">Requested Delivery Date</th>
                                        <th scope="col" className="px-6 py-3">Status</th>
                                        <th scope="col" className="px-6 py-3">Cost</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white border-b">
                                        <td className="px-6 py-4">{book.bookingDate}</td>
                                        <td className="px-6 py-4">{book.RequestedDeliveryDate}</td>
                                        <td className={book.status == 'Pending' ? 'px-6 py-4' : book.status == 'On The Way' ? 'px-6 py-4 text-sky-500' : book.status == 'Cancelled' ? 'px-6 py-4 text-red-600' : 'px-6 py-4 text-blue-600'}>{book.status}</td>
                                        <td className="px-6 py-4">{book.price}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="flex justify-end mr-10 p-3">
                            {book.status == 'Cancelled' ? <button className="text-red-600 font-semibold hover:underline" onClick={() => handleDeleteCancelledBook(book._id)}>Delete</button> :
                                <button className={book.status == 'Delivered' ? 'btn-disabled text-slate-300' : 'text-blue-600'}><span className=" font-semibold hover:underline" onClick={() => handleModal(book._id)}>Manage</span></button>}
                        </div>
                    </div>
                </div>)}</>}
        </div>
    );
};

export default AllParcel;