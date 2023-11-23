import bannerImg from '../assets/Gift on the way (1).gif'
import { FaLocationCrosshairs } from "react-icons/fa6";
import { AiOutlineSafety } from "react-icons/ai";
import { CiDeliveryTruck } from "react-icons/ci";


const Home = () => {
    return (
        <div>
            {/* banner section */}
            <section>
                <div className="grid max-w-screen-xl px-4 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-7">
                        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl ">Unleash the Power of Effortless <span className='text-red-500'>Deliveries</span></h1>
                        <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">Elevate your shipping experience with ParcelSync. Simplify parcel management, enjoy real-time tracking, and ensure swift, reliable deliveries. Your logistics, reimagined.</p>
                        <form>
                            <div className="flex">
                                <input type="text" name="" id="" placeholder='Search...' className=' py-2 px-3 border border-purple-500 focus:border-0 rounded-l-md w-full max-w-xs' />
                                <input type="submit" value="Search" className='py-2 px-3 border-t border-r border-b border-purple-500 rounded-r cursor-pointer font-semibold hover:bg-red-500 hover:text-white transition-all' />
                            </div>
                        </form>
                    </div>
                    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                        <img className='w-[200%]' src={bannerImg} alt="mockup" />
                    </div>
                </div>
            </section>

            {/* features */}
            <section className="bg-white mt-20">
                <div className="container px-6 py-10 mx-auto">
                    <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-6xl ">Features</h1>
                    <p className='text-center mt-2'>Elevate your shipping experience with ParcelSync</p>

                    <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-16 md:grid-cols-2 xl:grid-cols-3">
                        <div className="flex flex-col items-center p-6 space-y-3 text-center bg-gray-100 rounded-xl">
                            <span className="inline-block p-3 text-blue-500 bg-blue-100 rounded-full">
                                <FaLocationCrosshairs className='text-2xl' />
                            </span>

                            <h1 className="text-xl font-semibold text-gray-700 capitalize "> Real-Time Parcel Tracking</h1>

                            <p className="text-gray-500 ">
                                Stay in control with our real-time tracking feature, allowing you to monitor your parcel's journey from pickup to delivery, ensuring transparency and peace of mind.
                            </p>

                            <a href="#" className="flex items-center -mx-1 text-sm text-blue-500 capitalize transition-colors duration-300 transform hover:underline hover:text-blue-600">
                                <span className="mx-1">read more</span>
                                <svg className="w-4 h-4 mx-1 rtl:-scale-x-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"></path></svg>
                            </a>
                        </div>

                        <div className="flex flex-col items-center p-6 space-y-3 text-center bg-gray-100 rounded-xl">
                            <span className="inline-block p-3 text-blue-500 bg-blue-100 rounded-full ">
                                <AiOutlineSafety className='text-2xl' />
                            </span>

                            <h1 className="text-xl font-semibold text-gray-700 capitalize"> Safe and Secure Parcel Handling</h1>

                            <p className="text-gray-500 ">
                                We prioritize the safety of your parcels, employing careful handling and robust packaging to ensure they arrive at their destination in pristine condition.
                            </p>

                            <a href="#" className="flex items-center -mx-1 text-sm text-blue-500 capitalize transition-colors duration-300 transform hover:underline hover:text-blue-600">
                                <span className="mx-1">read more</span>
                                <svg className="w-4 h-4 mx-1 rtl:-scale-x-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"></path></svg>
                            </a>
                        </div>

                        <div className="flex flex-col items-center p-6 space-y-3 text-center bg-gray-100 rounded-xl">
                            <span className="inline-block p-3 text-blue-500 bg-blue-100 rounded-full">
                                <CiDeliveryTruck className='text-2xl' />
                            </span>

                            <h1 className="text-xl font-semibold text-gray-700 capitalize"> Express Delivery Service</h1>

                            <p className="text-gray-500">
                                Need it fast? Opt for our Express Delivery service for swift and reliable shipping, meeting your deadlines without compromising the safety and security of your items.
                            </p>
                            <a href="#" className="flex items-center -mx-1 text-sm text-blue-500 capitalize transition-colors duration-300 transform hover:underline hover:text-blue-600">
                                <span className="mx-1">read more</span>
                                <svg className="w-4 h-4 mx-1 rtl:-scale-x-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"></path></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;