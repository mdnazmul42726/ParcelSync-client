import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Avatar, Card } from "keep-react";
import noData from '../../../assets/BkQxD7wtnZ.gif';

const Review = () => {
    const { user } = useContext(AuthContext);

    const { data = [] } = useQuery({
        queryKey: ['review'],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:5000/review/v1?email=${user.email}`);
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
            {data.map(review => <div key={review._id} className="flex-1">
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
            </div>)}
        </div>
    );
};

export default Review;