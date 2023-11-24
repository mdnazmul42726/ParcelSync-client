import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider";

const BookParcel = () => {
    const { user } = useContext(AuthContext);

    return (
        <div>
            <section className="p-6">
                <form className="container flex flex-col mx-auto space-y-12">
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
                                <input id="number" type="number" name="senderNumber" placeholder="Enter Your Phone Number" className="w-full rounded-md px-3 py-2 border" required />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-5">
                            <div className="">
                                <label htmlFor="ParcelType" className="text-sm">Parcel Type<span className="text-red-600">*</span></label>
                                <input id="ParcelType" type="text" name="parcelType" placeholder="Enter Your Parcel Type" className="w-full rounded-md px-3 py-2 border" required />
                            </div>
                            <div className="">
                                <label htmlFor="parcelWeight" className="text-sm">Parcel Weight<span className="text-red-600">*</span></label>
                                <input id="parcelWeight" type="number" name="parcelWeight" placeholder="Enter Parcel Weight in KG" className="w-full rounded-md px-3 py-2 border" required />
                            </div>
                            <div className="">
                                <label htmlFor="requestedDeliveryDate" className="text-sm">Requested Delivery Date<span className="text-red-600">*</span></label>
                                <input id="email" type="date" name="RequestedDeliveryDate" placeholder="Enter Requested Delivery Date" className="w-full rounded-md px-3 py-2 border" required />
                            </div>
                        </div>
                    </fieldset>
                    <fieldset className="shadow-sm p-4">
                        <p className="text-xl font-semibold mb-10">Receiver Information</p>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="">
                                <label htmlFor="receiverName" className="text-sm">Receiver Name<span className="text-red-600">*</span></label>
                                <input id="receiverName" type="text" name="receiverName" placeholder="Enter Receiver Full Name" className="w-full rounded-md px-3 py-2 border" required />
                            </div>
                            <div className="">
                                <label htmlFor="ReceiverPhoneNumber" className="text-sm">Receiver Phone Number<span className="text-red-600">*</span></label>
                                <input id="ReceiverPhoneNumber" type="number" name="ReceiverPhoneNumber" placeholder="Enter Receiver Phone Number" className="w-full rounded-md px-3 py-2 border" required />
                            </div>
                            <div className="">
                                <label htmlFor="deliveryAddress" className="text-sm">Delivery Address<span className="text-red-600">*</span></label>
                                <input id="deliveryAddress" type="text" name="deliveryAddress" placeholder="Enter Parcel Delivery Address" className="w-full rounded-md px-3 py-2 border" required />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-5">
                            <div className="">
                                <label htmlFor="Name" className="text-sm">Parcel Type<span className="text-red-600">*</span></label>
                                <input id="Name" type="text" name="parcelType" placeholder="Enter Your Parcel Type" className="w-full rounded-md px-3 py-2 border" required />
                            </div>
                            <div className="">
                                <label htmlFor="deliveryAddressLatitude" className="text-sm">Delivery Address Latitude</label>
                                <input id="deliveryAddressLatitude" type="text" name="deliveryAddressLatitude" placeholder=" Latitude ex: (i.e 21.1211365496)" className="w-full rounded-md px-3 py-2 border" />
                            </div>
                            <div className="">
                                <label htmlFor="deliveryAddressLongitude" className="text-sm">Delivery Address Longitude</label>
                                <input id="deliveryAddressLatitude" type="text" name="deliveryAddressLongitude" placeholder=" Longitude ex: (i.e 21.1211365496)" className="w-full rounded-md px-3 py-2 border" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-semibold my-3">Price: 200Tk</h2>
                        <input type="submit" value='Book' className="px-5 mt-3 font-semibold rounded-sm hover:bg-red-600 cursor-pointer py-2 bg-red-500 text-white" />
                    </fieldset>
                </form>
            </section>
        </div>
    );
};

export default BookParcel;