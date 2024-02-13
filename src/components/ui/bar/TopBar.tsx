import { Account } from '@bar/index';
import { CalendarIcon, EmailIcon } from '@icons/index';

interface props {
    emailUnread: boolean;
    calendarUnread: boolean;
}

const TopBar = ({ emailUnread, calendarUnread }: props) => {
    const type = 'top';
    return (
        <div className="hidden top-10 right-10 sm:flex items-center justify-end gap-7 min-w-[146px]">
            <CalendarIcon unread={calendarUnread} type={type} />
            <EmailIcon unread={emailUnread} type={type} />
            <Account top={true} />
        </div>
    );
};

export default TopBar;
