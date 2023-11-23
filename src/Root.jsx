import { Outlet } from "react-router-dom";
import { NavbarComponent } from "./components/Navbar";

const Root = () => {
    return (
        <div>
            <NavbarComponent />
            <Outlet />
        </div>
    );
};

export default Root;