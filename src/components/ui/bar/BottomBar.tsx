import { Account } from '@bar/index';
import { AchievementsIcon, CalendarIcon, DashboardIcon, EmailIcon, ToDoListIcon, WorkIcon } from '@icons/index';
import HabitsIcon from '../icons/HabitsIcon';

interface props {
    className?: string;
    emailUnread: boolean;
    calendarUnread: boolean;
}

const BottomBar = ({ className, emailUnread, calendarUnread }: props) => {
    const type = 'bottom';
    return (
        <div
            className={`z-20 fixed bottom-[-3px] w-full flex items-center justify-between py-3 px-4 rounded-t-xl bg-gradient-to-b from-main to-background ${
                className ? className : ''
            }`}
        >
            <DashboardIcon type={type} />
            <WorkIcon type={type} />
            <AchievementsIcon type={type} />
            <HabitsIcon type={type} />
            <ToDoListIcon type={type} />
            <CalendarIcon unread={calendarUnread} type={type} />
            <EmailIcon unread={emailUnread} type={type} />
            <Account />
        </div>
    );
};

export default BottomBar;
