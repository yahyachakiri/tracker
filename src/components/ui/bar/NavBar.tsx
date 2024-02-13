import { BottomBar, SideBar } from './index';
import { useMediaQuery } from 'react-responsive';

interface props {
    emailUnread: boolean;
    calendarUnread: boolean;
}

const NavBar = ({ emailUnread, calendarUnread }: props) => {
    const isMobile = useMediaQuery({
        query: '(max-width: 639px)',
    });

    return <>{isMobile ? <BottomBar emailUnread={emailUnread} calendarUnread={calendarUnread} /> : <SideBar />}</>;
};

export default NavBar;
