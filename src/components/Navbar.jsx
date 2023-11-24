
import { Navbar } from "keep-react";
import { Link, NavLink } from "react-router-dom";
import logo from '../assets/logo.png';
import { useContext } from "react";
import { AuthContext } from "../AuthProvider";
import Swal from "sweetalert2";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.config";


export const NavbarComponent = () => {
    const { user } = useContext(AuthContext);

    function handleLogOut() {
        Swal.fire({
            title: "Do you want to log out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                signOut(auth).then(() => {
                    Swal.fire({
                        title: "Logged Out.",
                        icon: "success"
                    });
                })
            }
        });
    }

    return (
        <Navbar fluid={true} className="">
            <Navbar.Container className="flex items-center justify-between">
                <Navbar.Brand className="flex items-center">
                    <img className="w-[40%] hidden md:flex" src={logo} alt="" />
                    <h3 className="text-2xl md:-ml-16 font-bold">Parcel<span className="text-[#ef233c]">Sync</span></h3>
                </Navbar.Brand>

                <Navbar.Container className="flex items-center gap-6">
                    <Navbar.Container
                        tag="ul"
                        className="lg:flex hidden items-center justify-between gap-4"
                    >
                    </Navbar.Container>
                    <Navbar.Container className="flex gap-1">
                        <Navbar.Toggle className="block" />
                        <div className="flex items-center gap-4">
                            <div className="hidden lg:flex gap-4">
                                <NavLink className={({ isActive }) => isActive ? 'text-red-500' : ''} to={'/'}>Home</NavLink>
                                <NavLink className={({ isActive }) => isActive ? 'text-red-500' : ''} to={'about'}>About</NavLink>
                                <NavLink className={({ isActive }) => isActive ? 'text-red-500' : ''} to={'/contact'}>Contact</NavLink>
                            </div>
                            {user ? <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
                                    </div>
                                </label>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-72">
                                    <li>
                                        <a className="justify-between">
                                            {user.displayName}
                                            <span className="badge">New</span>
                                        </a>
                                    </li>
                                    <li><Link to={'/dashboard'}>Dashboard</Link></li>
                                    <li><a className="text-red-500 font-bold" onClick={handleLogOut}>Logout</a></li>
                                </ul>
                            </div> :
                                <NavLink to={'/login'} className={({ isActive }) => isActive ? 'text-red-500' : ''}>Login</NavLink>}
                        </div>
                    </Navbar.Container>
                </Navbar.Container>
                <Navbar.Collapse
                    collapseType="sidebar"
                    className="fixed right-0 top-0 bg-white p-10 lg:!w-2/6 xl:!w-1/6 md:!w-2/6 w-1/2"
                >
                    <Navbar.Container tag="ul" className="flex flex-col gap-5">
                        <NavLink>Home</NavLink>
                        <NavLink>Home</NavLink>
                        <NavLink>Home</NavLink>
                        <Navbar.Link linkName="News" className="!py-0" />
                        <Navbar.Link linkName="Resources" className="!py-0" />
                    </Navbar.Container>
                </Navbar.Collapse>
            </Navbar.Container>
        </Navbar>
    );
}
