import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";
import Loader from "../../../components/Loader";

const Notification = () => {
    const token = { authorization: `${localStorage.getItem('access-token')}` }
    const { data, refetch, isLoading } = useQuery({
        queryKey: ['notifications'],
        queryFn: async () => {
            const response = await axios.get('https://server-iota-peach-25.vercel.app/contacts', { headers: token });
            return response.data
        }
    });

    function handleMsgDelete(_id) {
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

                axios.delete(`https://server-iota-peach-25.vercel.app/contact/${_id}`).then(res => {

                    if (res.data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Message has been deleted.",
                            icon: "success"
                        });
                        refetch()
                    }

                }).catch(err => console.log(err))
            }
        });
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="min-h-screen">
            <div className="text-center my-10">
                <h1 className="text-3xl">Contacts</h1>
                <p>Always try to respond quickly to the customer. <br /> A quick response will create a positive impression of your company.</p>
            </div>
            <div className="">
                <div className="my-5 mx-20">
                    {data?.map(contact => <div key={contact._id} className="indicator border mb-10 w-full">
                        <div className="indicator-item indicator-bottom">
                            <button className="btn btn-primary" onClick={() => window.location = `mailto:${contact.email}`}>Reply</button>
                            <button className="ml-4 hover:text-red-500" onClick={() => handleMsgDelete(contact._id)}><FaTrash /></button>
                        </div>
                        <div className="card ">
                            <div className="card-body">
                                <h2 className="card-title font-mono">{contact.firstName} {contact.lastName}</h2>
                                <p className="font-mono">{contact.email}</p>
                                <p className="mt-5">{contact.msg}</p>
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    );
};

export default Notification;