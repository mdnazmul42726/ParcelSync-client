import loader from '../assets/Gift on the way (1).gif';

const Loader = () => {
    return (
        <div className="w-full flex justify-center items-center mt-20">
            <img className="w-[20%]" src={loader} alt="" />
        </div>
    );
};

export default Loader;