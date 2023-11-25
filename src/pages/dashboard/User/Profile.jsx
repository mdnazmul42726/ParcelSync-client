import { useContext, useState } from "react";
import { AuthContext } from "../../../AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import { updateProfile } from "firebase/auth";
import { auth } from "../../../firebase.config";

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [hideForm, setHideForm] = useState(false)

    const { data = [] } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:5000/user/v1?email=${user.email}`);
            return response.data
        }
    });

    function handleProfileInfoUpdate(event) {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const gender = form.gender.value;
        const contactNumber = form.contactNumber.value
        const currentAddress = form.currentAddress.value;
        const permanentAddress = form.permanentAddress.value;

        const updatedInfo = { name, gender, currentAddress, permanentAddress, contactNumber }

        axios.patch(`http://localhost:5000/user/update?email=${user.email}`, updatedInfo).then(res => {

            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    title: 'Profile Info Updated',
                    icon: 'success'
                });
                setHideForm(!hideForm)
            } else if (res.data.matchedCount > 0 && res.data.modifiedCount == 0) {
                Swal.fire({
                    icon: 'info',
                    title: "You haven't changed anything",
                    text: 'To update the profile info you need to change any one of the fields'
                });
                setHideForm(!hideForm)
            }

        }).catch(err => console.log(err))
    }

    async function handleProfilePictureUpdate(event) {
        event.preventDefault();
        const image = event.target.image.files[0];
        const toastID = toast.loading('Working...');

        const imageData = new FormData();
        imageData.append('image', image);

        const response = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`, imageData);

        if (response.data.success) {
            updateProfile(auth.currentUser, { photoURL: response.data.data.display_url }).then(() => {
                toast.success('Profile Picture Updated', { id: toastID });
                window.location.reload();
                
            }).catch(err => console.log(err))

        }
    }

    return (
        <div className="bg-gray-100">
            <Toaster />
            <div>
                <div className="">
                    <div className="container mx-auto my-5 p-5">
                        <div className="md:flex no-wrap md:-mx-2 ">
                            <div className="w-full md:w-3/12 md:mx-2">
                                <div className="bg-white p-3 border-t-4 border-green-400">
                                    <div className="image overflow-hidden rounded-md">
                                        <img src={user.photoURL} alt="" />
                                    </div>
                                    <form className="mt-3 flex" onSubmit={handleProfilePictureUpdate}>
                                        <input type="file" name="image" className="" />
                                        <input type="submit" required value="Upload" className=" text-white px-2 cursor-pointer rounded-sm bg-sky-600 hover:bg-sky-700" />
                                    </form>
                                    <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{data.name}</h1>
                                    <h3 className="text-gray-600 font-lg text-semibold leading-6">{data.accType} ID: {data?._id?.slice(0, 9)}</h3>

                                </div>
                                <div className="my-4"></div>
                            </div>
                            <div className="w-full md:w-9/12 mx-2 h-64">
                                <div className="bg-white p-3 shadow-sm rounded-sm">
                                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                        <span className="text-green-500">
                                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke="currentColor">
                                            </svg>
                                        </span>
                                        <span className="tracking-wide">About</span>
                                    </div>

                                    {/* info */}
                                    <div className={hideForm && 'hidden'}>
                                        <div className="text-gray-700 ">
                                            <div className="grid md:grid-cols-2 text-sm">
                                                <div className="">
                                                    <div className="px-4 py-2 font-semibold">Name</div>
                                                    <div className="px-4 py-2">{data.name}</div>
                                                </div>
                                                <div className="">
                                                    <div className="px-4 py-2 font-semibold">Email</div>
                                                    <div className="px-4 py-2">{data.email}</div>
                                                </div>
                                                <div className="mt-4">
                                                    <div className="px-4 py-2 font-semibold">Gender</div>
                                                    <div className="px-4 py-2">{data.gender ? data.gender : 'N/A'}</div>
                                                </div>
                                                <div className="mt-4">
                                                    <div className="px-4 py-2 font-semibold">Contact No.</div>
                                                    <div className="px-4 py-2">{data.contactNumber ? data.contactNumber : 'N/A'}</div>
                                                </div>
                                                <div className="mt-4">
                                                    <div className="px-4 py-2 font-semibold">Current Address</div>
                                                    <div className="px-4 py-2">{data.currentAddress ? data.currentAddress : 'N/A'}</div>
                                                </div>
                                                <div className="mt-4">
                                                    <div className="px-4 py-2 font-semibold">Permanent Address</div>
                                                    <div className="px-4 py-2">{data.permanentAddress ? data.permanentAddress : 'N/A'}</div>
                                                </div>
                                            </div>
                                            <button onClick={() => setHideForm(!hideForm)}
                                                className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4" >Edit Info</button>
                                        </div>
                                    </div>

                                    {/* update form */}
                                    <div className="flex justify-center mt-4">
                                        <div className={!hideForm && 'hidden'}>
                                            <form className="w-full max-w-lg" onSubmit={handleProfileInfoUpdate}>
                                                <div className="flex flex-wrap -mx-3 mb-6">
                                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                                            Name
                                                        </label>
                                                        <input name="name" defaultValue={data.name} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Enter Your Name" />
                                                    </div>
                                                    <div className="w-full md:w-1/2 px-3">
                                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                                            Email
                                                        </label>
                                                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" defaultValue={user.email} readOnly id="grid-last-name" type="text" placeholder="Doe" />
                                                    </div>
                                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                                            Gender
                                                        </label>
                                                        <select name="gender" id="" className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="">
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                            <option value="Other">Other</option>
                                                        </select>
                                                    </div>
                                                    <div className="w-full md:w-1/2 px-3">
                                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                                            Contact No.
                                                        </label>
                                                        <input defaultValue={data.contactNumber ? data.contactNumber : ''} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="contactNumber" id="grid-last-name" type="text" placeholder="Enter Your Contact Number" />
                                                    </div>
                                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                                            Current Address
                                                        </label>
                                                        <input defaultValue={data.currentAddress ? data.currentAddress : ''} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" name="currentAddress" type="text" placeholder="Enter Your Current Address" />
                                                    </div>
                                                    <div className="w-full md:w-1/2 px-3">
                                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                                            Permanent Address
                                                        </label>
                                                        <input defaultValue={data.permanentAddress ? data.permanentAddress : ''} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="permanentAddress" id="grid-last-name" type="text" placeholder="Enter Your Permanent Address" />
                                                    </div>
                                                </div>
                                                <div className="flex justify-center">
                                                    <button className="text-white py-2 px-5 rounded-sm bg-sky-500 hover:bg-sky-600">Update</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Profile;