import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// import { Avatar, Card } from "keep-react";
import noData from '../../../assets/BkQxD7wtnZ.gif';

const Review = () => {
    document.title = 'ParcelSync | My Reviews'
    const { user } = useContext(AuthContext);
    const token = { authorization: `${localStorage.getItem('access-token')}` };

    const { data = [] } = useQuery({
        queryKey: ['review'],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:5000/review/v1?email=${user.email}`, { headers: token });
            return response.data
        }
    });

    if (!data.length) {
        return (
            <div className="flex justify-center items-center mt-20">
                <img className="w-[20%]" src={noData} alt="" />
            </div>
        )
    }

    return (
        <div className="flex space-x-5">
            {/* {data.map(review => <div key={review._id} className="flex-1">
                <Card className="max-w-xs p-6 md:max-w-lg">
                    {review.feedBack}
                    <Card.Description>
                    </Card.Description>
                    <Card.Container className="flex items-center">
                        <Avatar size="lg" shape="circle" img={review.customerPicture} />
                        <Card.Container className="ml-3">
                            <Card.Title className="text-body-5 font-semibold text-metal-800 md:text-body-4">{review.customerName}</Card.Title>
                            <Card.Title className="!text-body-6 font-bold text-metal-400 md:text-body-5"> Rating: {review.rating}.00</Card.Title>
                        </Card.Container>
                    </Card.Container>
                </Card>
            </div>)} */}

            {data.map(review => <div key={review._id} className="container flex flex-col w-full max-w-lg p-6 mx-auto divide-y rounded-md border" data-aos="fade-left">
                <div className="flex justify-between p-4">
                    <div className="flex space-x-4 space-y-4">
                        <div>
                            <img src={review.customerPicture} alt="" className="object-cover w-12 h-12 rounded-full dark:bg-gray-500" />
                        </div>
                        <div>
                            <h4 className="font-bold">{review.customerName}</h4>
                            {/* <span className="text-xs dark:text-gray-400">2 days ago</span> */}
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 dark:text-yellow-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current">
                            <path d="M494,198.671a40.536,40.536,0,0,0-32.174-27.592L345.917,152.242,292.185,47.828a40.7,40.7,0,0,0-72.37,0L166.083,152.242,50.176,171.079a40.7,40.7,0,0,0-22.364,68.827l82.7,83.368-17.9,116.055a40.672,40.672,0,0,0,58.548,42.538L256,428.977l104.843,52.89a40.69,40.69,0,0,0,58.548-42.538l-17.9-116.055,82.7-83.368A40.538,40.538,0,0,0,494,198.671Zm-32.53,18.7L367.4,312.2l20.364,132.01a8.671,8.671,0,0,1-12.509,9.088L256,393.136,136.744,453.3a8.671,8.671,0,0,1-12.509-9.088L144.6,312.2,50.531,217.37a8.7,8.7,0,0,1,4.778-14.706L187.15,181.238,248.269,62.471a8.694,8.694,0,0,1,15.462,0L324.85,181.238l131.841,21.426A8.7,8.7,0,0,1,461.469,217.37Z"></path>
                        </svg>
                        <span className="text-xl font-bold">{review.rating}.00</span>
                    </div>
                </div>
                <div className="p-4 space-y-2 text-sm dark:text-gray-400">
                    <p>{review.feedBack}</p>
                </div>
            </div>)}
        </div>
    );
};

export default Review;