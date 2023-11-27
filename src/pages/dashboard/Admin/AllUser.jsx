import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

const AllUser = () => {
    document.title = 'ParcelSync | All Users'
    const { data = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:5000/users/v1', { headers: { authorization: `${localStorage.getItem('access-token')}` } });
            return response.data
        }
    });


    function handleUserRole(role, _id, name) {

        Swal.fire({
            text: `Do you want to update ${name}'s permission level to ${role}?`,
            title: 'Are you sure?',
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Do It"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.patch(`http://localhost:5000/user/role/v1?id=${_id}&role=${role}`).then(res => {
                    console.log(res.data);
                    if (res.data.modifiedCount > 0) {
                        Swal.fire({
                            title: "Success!",
                            text: `You have successfully updated ${name}'s permission level. to ${role}`,
                            icon: "success"
                        });
                        refetch();

                    } else if (res.data.matchedCount > 0 && res.data.modifiedCount == 0) {
                        Swal.fire({
                            title: 'Permission Level Exist',
                            text: `${name} already has ${role} permission level`
                        })
                    }
                }).catch(err => console.log(err))

            }
        });

    }

    return (
        <div>
            <div>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3"> User`s Name</th>
                                <th scope="col" className="px-6 py-3">Email Address</th>
                                <th scope="col" className="px-6 py-3">User`s ID</th>
                                {/* <th scope="col" className="px-6 py-3">Number of Parcel Booked</th> */}
                                <th scope="col" className="px-6 py-3">Action</th>

                            </tr>
                        </thead>
                        {data.map(user => <tbody key={user._id}>
                            <tr className="bg-white border-b">
                                <td className="px-6 py-4">{user.name}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">{user._id?.slice(0, 9)}</td>
                                <td className="px-6 py-4"> <span className="text-sky-600 font-semibold hover:underline hover:text-sky-700 cursor-pointer" onClick={() => handleUserRole('Delivery Man', user._id, user.name)}>Make Delivery Man</span> <br /> <span className="text-blue-500 font-semibold hover:underline hover:text-sky-700 cursor-pointer" onClick={() => handleUserRole('Admin', user._id, user.name)}>Make Admin</span></td>
                            </tr>
                        </tbody>)}
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUser;