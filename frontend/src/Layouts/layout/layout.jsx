import { Outlet } from "react-router";

import NavBar from "../navbar/navbar";
import Header from "../header/header";
import Footer1 from "../footer/footer1"
import Footer2 from "../footer/footer2"

function Layouts() {
    return ( 
        <div>
            <Header />
            <NavBar />
            <Outlet />
            <Footer1 />
            <Footer2 />
        </div>
     );
}

export default Layouts;