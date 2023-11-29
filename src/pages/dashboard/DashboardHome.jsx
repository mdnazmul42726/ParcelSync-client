import { useContext } from "react";
import { AuthContext } from "../../AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { BarChart } from "keep-react";

const DashboardHome = () => {
    document.title = 'ParcelSync | Dashboard '
    const { user } = useContext(AuthContext)

    const { data = [] } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await axios.get(`https://server-iota-peach-25.vercel.app/user/v1?email=${user.email}`);
            return response.data
        }
    });

    const BarChartData = [
        {
            name: "2",
            Parcel: 340,
            delivery: 140,
        },
        {
            name: "4",
            Parcel: 300,
            delivery: 200,
        },
        {
            name: "6",
            Parcel: 170,
            delivery: 120,
        },
        {
            name: "8",
            Parcel: 190,
            delivery: 130,
        },
        {
            name: "10",
            Parcel: 450,
            delivery: 120,
        },

    ];

if (data.accType == 'Customer' || data.accType == 'Delivery Man') {
    return (
        <>
            <section className="">
                <div className="container flex flex-col mx-auto lg:flex-row">
                    <div className="w-full lg:w-1/3 rounded-sm"><img className="rounded-sm" src={user.photoURL} alt="" />
                        <p className="text-xl font-mono mt-3"> {user.displayName}</p>
                        <p className=" font-mono"> {data.accType} ID: {data._id.slice(0, 9)}</p>
                    </div>
                    <div className="flex flex-col w-full p-6 lg:w-2/3 md:p-8 lg:p-12">
                        {data.accType == 'Delivery Man' && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8 mb-8 ">
                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>}
                        <h2 className="text-3xl font-semibold leadi">{data.accType == 'Customer' ? 'You can definitely use our service to send gifts to loved ones' : 'We are blessed to have a delivery man like you.'} </h2>
                        <NavLink to={'/dashboard/profile'}> <button className="self-start px-10 py-3 text-lg font-medium rounded-3xl mt-6 bg-red-500 hover:bg-red-600 text-white ">View Profile</button></NavLink>
                    </div>
                </div>
            </section>
        </>
    )

} else {
    return (
        <div className="flex ">
            <BarChart
                height={250}
                width={500}
                barSize={30}
                barRadius={[4, 4, 0, 0]}
                dataKey="Parcel"
                secondaryDataKey="delivery"
                chartData={BarChartData}
                showBg={true}
                showLegend={true}
                showTooltip={true}
                showXaxis={true}
                showYaxis={true}
            />
        </div>
    )
}
};

export default DashboardHome;