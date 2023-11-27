import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../../AuthProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import noData from '../../../assets/BkQxD7wtnZ.gif';
import toast, { Toaster } from "react-hot-toast";

const MyParcel = () => {
    document.title = 'ParcelSync | My Parcel'
    const { user } = useContext(AuthContext);
    const [item, setItem] = useState([]);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [deliverManEmail, setDeliverManEmail] = useState('');

    const { refetch } = useQuery({
        queryKey: ['booked parcel data'],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:5000/books/v1?email=${user.email}`);
            return setItem(response.data)
        }
    });

    const totalPayment = item.reduce((acc, item) => acc + item.price, 0)
    console.log(totalPayment);

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

    function handleFeedbackFormState(deliveryMan) {
        setDeliverManEmail(deliveryMan)
        setShowReviewForm(true)

    }

    function handleReviewFormSubmit(event) {
        event.preventDefault();
        const customerName = event.target.customerName.value;
        const customerPicture = event.target.customerPicture.value;
        const deliverManEmail = event.target.deliverManEmail.value;
        const ratingString = event.target.rating.value;
        const rating = parseFloat(ratingString)
        const feedBack = event.target.feedBack.value;

        const data = { customerName, customerPicture, deliverManEmail, rating, feedBack }

        if (rating > 5) {
            toast.error('You cannot give rating above 5.00');
            return
        }

        axios.post('http://localhost:5000/review/v1', data).then(res => {

            if (res.data.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'Thanks for your Feedback'
                });
                setShowReviewForm(false)
            }

        }).catch(err => console.log(err))
    }

    if (showReviewForm) {
        return (

            <section className="p-6" data-aos="zoom-out">
                <Toaster />
                <form className="container flex flex-col mx-auto space-y-12" onSubmit={handleReviewFormSubmit}>
                    <fieldset className="shadow-sm p-4">
                        <div className="grid grid-cols-4 gap-4">
                            <div className="">
                                <label htmlFor="Name" className="text-sm">Customer Name<span className="text-red-600">*</span></label>
                                <input id="Name" type="text" name="customerName" defaultValue={user.displayName} className="w-full rounded-md px-3 py-2 border" required readOnly />
                            </div>
                            <div className="">
                                <label htmlFor="email" className="text-sm">Customer Picture<span className="text-red-600">*</span></label>
                                <input id="email" type="text" name="customerPicture" defaultValue={user.photoURL} className="w-full rounded-md px-3 py-2 border" required readOnly />
                            </div>
                            <div className="">
                                <label htmlFor="ParcelType" className="text-sm">Delivery Men`s Email<span className="text-red-600">*</span></label>
                                <input id="ParcelType" type="text" name="deliverManEmail" placeholder="Enter Your Parcel Type" className="w-full rounded-md px-3 py-2 border" required readOnly defaultValue={deliverManEmail} />
                            </div>
                            <div className="">
                                <label htmlFor="number" className="text-sm">Rating <span className="text-red-600">*</span></label>
                                <input id="number" type="number" name="rating" placeholder="Enter Your Rating out of 5.00" className="w-full rounded-md px-3 py-2 border" required />
                            </div>
                        </div>
                        <div className="mt-5">

                            <div className="">
                                <label htmlFor="parcelWeight" className="text-sm">Feedback<span className="text-red-600">*</span></label>
                                <textarea name="feedBack" id="" cols="30" required rows="10" placeholder="Type Your Feedback Here" className="w-full rounded-md px-3 py-2 border">
                                </textarea>
                            </div>

                        </div>
                        <div className="flex space-x-2">
                            <button className="py-2 rounded-sm px-4 bg-sky-600 hover:bg-sky-700 text-white">Submit</button>
                            <span onClick={() => setShowReviewForm(!showReviewForm)} className="py-2 cursor-pointer rounded-sm px-4 bg-red-500 hover:bg-red-600 text-white">Cancel</span>
                        </div>
                    </fieldset>
                </form>
            </section>
        )
    }

    return (
        <div className="" data-aos="fade-left">
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
                    {book.status == 'Delivered' ? <a className="font-medium text-blue-600 cursor-pointer dark:text-blue-500 hover:underline" onClick={() => handleFeedbackFormState(book.deliveryMan)}>Review</a>
                        : <> <Link to={`/dashboard/edit/${book._id}`}><button className={book.status !== 'Pending' ? 'btn-disabled text-slate-300' : 'text-blue-600'}><a className="font-medium hover:underline">Edit</a></button></Link>
                            <button className={book.status !== 'Pending' ? 'btn-disabled text-slate-300' : 'text-red-600'}> <a className="font-medium hover:underline ms-3" onClick={() => handleCancelBook(book._id)}>Cancel</a> </button> </>}
                </div>
            </div>)}
            <div className="flex justify-between">
                <h3 className="text-xl font-semibold">Payable Amount: TK <span>{totalPayment}</span> </h3>
                <a href="https://shop.bkash.com/jsxjolt01326185000/paymentlink/default-payment" target="_blank" rel="noreferrer">
                    <button className="py-1 px-5 bg-sky-500 text-white rounded-sm hover:bg-sky-600">Pay</button>
                </a>
            </div>
        </div>

    );
};

export default MyParcel;