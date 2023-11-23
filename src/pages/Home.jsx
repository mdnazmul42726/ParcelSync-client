import bg from '../assets/Global delivery.gif';
import bannerImg from '../assets/Gift on the way (1).gif'

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
        </div>
    );
};

export default Home;