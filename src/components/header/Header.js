import './style.scss';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';

const Header = () => {

    return (
        <div className="header_container">
            <div className="header__logo">Lessons Booking</div>
                <DesktopNavigation />
                <MobileNavigation />
        </div>
    )
}

export default Header;