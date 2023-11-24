import { FaGithub, FaGoogle } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div className='w-full md:w-[70%] lg:w-[35%] mx-auto mb-20 mt-10 md:mt-2 lg:mt-0 shadow-md rounded-md p-3'>
            <form className="card-body">
                <h1 className="text-3xl font-bold">Register</h1>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="name" name='name' placeholder="Name" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Account type</span>
                    </label>
                    <select name='accType' required className="select select-bordered w-full">
                        <option disabled selected>Select Account Type</option>
                        <option value="Customer" className='className="input input-bordered"'>Customer</option>
                        <option value="Delivery Man" className='className="input input-bordered"'>Delivery Man</option>
                    </select>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name='email' placeholder="Email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" name='password' placeholder="Password" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Profile Picture</span>
                    </label>
                    <input type="file" className="file-input file-input-bordered file-input-sm w-full " />
                </div>

                <div className="form-control mt-5">
                    <button className="btn bg-[#F34949] px-7 hover:bg-red-600 text-white rounded-md">Register</button>
                </div>
            </form>
            <h3 className='text-center'>Or Sign Up with</h3>
            <div className="flex justify-center gap-3 text-xl mt-3 mb-4">
                {/* <FaFacebook className='text-sky-700 cursor-pointer' /> */}
                <FaGithub className='text-sky-800 cursor-pointer' />
                <FaGoogle className='text-red-600 cursor-pointer' />
            </div>
            <p className='mb-5 text-center'>Already have an account? <Link className='text-red-500 font-bold' to={"/login"}>Login</Link></p>
        </div>
    );
};

export default Register;