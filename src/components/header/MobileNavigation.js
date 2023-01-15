import NavLinks from "./Navlinks";
import { FaBars, FaRegWindowClose } from "react-icons/fa";
import { useState } from "react";

const MobileNavigation = () => {

    const [showMobile, setShowMobile] = useState(false);

    return (
        <div className="mobile_navigation">
            {showMobile ? 
                (<FaRegWindowClose className="hamburger_close" onClick={() => setShowMobile(false)}/>) 
                : 
                (<FaBars className="hamburger_bars" onClick={() => setShowMobile(true)} />)
            }
            {showMobile &&
                <NavLinks />
            }
        </div>
    )
};

export default MobileNavigation;
