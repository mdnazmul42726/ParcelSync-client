import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../../AuthProvider';
import { useContext, useState } from 'react';

const UpdateBook = () => {
    const bookItem = useLoaderData();
    console.log(bookItem);

    const { user } = useContext(AuthContext);

    const [price, setPrice] = useState(bookItem.price);
    const bookingDate = new Date().toLocaleDateString();

    function handleCalculatePrice(kg) {
        if (kg < 2) {
            setPrice(50);
        } else if (kg == 2) {
            setPrice(100)
        } else {
            setPrice(150);
        }
    }

    function handleBooking(event) {
        event.preventDefault();
        const form = event.target;
        const senderName = form.senderName.value;
        const senderEmail = form.senderEmail.value;
        const senderPhoneNumber = form.senderPhoneNumber.value;
        const parcelType = form.parcelType.value;
        const parcelWeight = form.parcelWeight.value;
        const RequestedDeliveryDate = form.RequestedDeliveryDate.value;
        const receiverName = form.receiverName.value;
        const ReceiverPhoneNumber = form.ReceiverPhoneNumber.value;
        const deliveryAddress = form.deliveryAddress.value;
        const receiverEmail = form.receiverEmail.value;
        const deliveryAddressLatitude = form.deliveryAddressLatitude.value;
        const deliveryAddressLongitude = form.deliveryAddressLongitude.value;

        const bookData = { senderEmail, senderName, senderPhoneNumber, parcelType, parcelWeight, RequestedDeliveryDate, receiverEmail, receiverName, ReceiverPhoneNumber, deliveryAddress, deliveryAddressLatitude, deliveryAddressLongitude, price, bookingDate, status: 'Pending' };

    }

    return (
        <div>
            <div>
                <section className="p-6">
                    <form className="container flex flex-col mx-auto space-y-12" onSubmit={handleBooking}>
                        <fieldset className="shadow-sm p-4">
                            <p className="text-xl font-semibold mb-10">Sender Information</p>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="">
                                    <label htmlFor="Name" className="text-sm">Name<span className="text-red-600">*</span></label>
                                    <input id="Name" type="text" name="senderName" defaultValue={user.displayName} className="w-full rounded-md px-3 py-2 border" required readOnly />
                                </div>
                                <div className="">
                                    <label htmlFor="email" className="text-sm">Email Address<span className="text-red-600">*</span></label>
                                    <input id="email" type="text" name="senderEmail" defaultValue={user.email} className="w-full rounded-md px-3 py-2 border" required readOnly />
                                </div>
                                <div className="">
                                    <label htmlFor="number" className="text-sm">Phone Number<span className="text-red-600">*</span></label>
                                    <input id="number" type="number" name="senderPhoneNumber" placeholder="Enter Your Phone Number" className="w-full rounded-md px-3 py-2 border" required defaultValue={bookItem.senderPhoneNumber} />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 mt-5">
                                <div className="">
                                    <label htmlFor="ParcelType" className="text-sm">Parcel Type<span className="text-red-600">*</span></label>
                                    <input id="ParcelType" type="text" name="parcelType" placeholder="Enter Your Parcel Type" className="w-full rounded-md px-3 py-2 border" required defaultValue={bookItem.parcelType} />
                                </div>
                                <div className="">
                                    <label htmlFor="parcelWeight" className="text-sm">Parcel Weight<span className="text-red-600">*</span></label>
                                    <input id="parcelWeight" type="number" name="parcelWeight" placeholder="Enter Parcel Weight in KG" className="w-full rounded-md px-3 py-2 border" required defaultValue={bookItem.parcelWeight} onChange={(event) => handleCalculatePrice(event.target.value)} />
                                </div>
                                <div className="">
                                    <label htmlFor="requestedDeliveryDate" className="text-sm">Requested Delivery Date<span className="text-red-600">*</span></label>
                                    <input id="email" type="date" name="RequestedDeliveryDate" placeholder="Enter Requested Delivery Date" className="w-full rounded-md px-3 py-2 border" required defaultValue={bookItem.RequestedDeliveryDate} />
                                </div>
                            </div>
                        </fieldset>
                        <fieldset className="shadow-sm p-4">
                            <p className="text-xl font-semibold mb-10">Receiver Information</p>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="">
                                    <label htmlFor="receiverName" className="text-sm">Receiver Name<span className="text-red-600">*</span></label>
                                    <input id="receiverName" type="text" name="receiverName" placeholder="Enter Receiver Full Name" className="w-full rounded-md px-3 py-2 border" required defaultValue={bookItem.receiverName} />
                                </div>
                                <div className="">
                                    <label htmlFor="ReceiverPhoneNumber" className="text-sm">Receiver Phone Number<span className="text-red-600">*</span></label>
                                    <input id="ReceiverPhoneNumber" type="number" name="ReceiverPhoneNumber" placeholder="Enter Receiver Phone Number" className="w-full rounded-md px-3 py-2 border" required defaultValue={bookItem.ReceiverPhoneNumber} />
                                </div>
                                <div className="">
                                    <label htmlFor="receiverEmail" className="text-sm">Receiver Email Address<span className="text-red-600">*</span></label>
                                    <input id="receiverEmail" type="email" name="receiverEmail" placeholder="Enter Your Parcel Type" className="w-full rounded-md px-3 py-2 border" required defaultValue={bookItem.receiverEmail} />
                                </div>
                                <div className="">
                                    <label htmlFor="deliveryAddress" className="text-sm">Delivery Address<span className="text-red-600">*</span></label>
                                    <input id="deliveryAddress" type="text" name="deliveryAddress" placeholder="Enter Parcel Delivery Address" className="w-full rounded-md px-3 py-2 border" required defaultValue={bookItem.deliveryAddress} />
                                </div>
                                <div className="">
                                    <label htmlFor="deliveryAddressLatitude" className="text-sm">Delivery Address Latitude<span className="text-red-600">*</span></label>
                                    <input id="deliveryAddressLatitude" type="text" name="deliveryAddressLatitude" placeholder=" Latitude ex: (i.e 21.1211365496)" className="w-full rounded-md px-3 py-2 border" required defaultValue={bookItem.deliveryAddressLatitude} />
                                </div>
                                <div className="">
                                    <label htmlFor="deliveryAddressLongitude" className="text-sm">Delivery Address Longitude<span className="text-red-600">*</span></label>
                                    <input id="deliveryAddressLongitude" type="text" name="deliveryAddressLongitude" placeholder=" Longitude ex: (i.e 21.1211365496)" className="w-full rounded-md px-3 py-2 border" required defaultValue={bookItem.deliveryAddressLongitude} />
                                </div>
                            </div>
                            <h2 className="text-2xl font-semibold my-3">Price: {price}Tk</h2>
                            <input type="submit" value='Update' className="px-5 mt-3 font-semibold rounded-sm hover:bg-red-600 cursor-pointer py-2 bg-red-500 text-white" />
                        </fieldset>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default UpdateBook;