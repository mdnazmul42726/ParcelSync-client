import { Outlet } from "react-router-dom";
import { NavbarComponent } from "./components/Navbar";
import Footer from "./components/Footer";

const Root = () => {
    return (
        <div>
            <NavbarComponent />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Root;