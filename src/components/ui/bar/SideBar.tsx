import { DashboardIcon, AchievementsIcon, WorkIcon, ToDoListIcon, HabitsIcon } from '@icons/index';

interface props {
    className?: string;
}

const SideBar = ({ className }: props) => {
    const type = 'side';
    return (
        <div
            className={`sidebar flex flex-col gap-10 fixed m-5 p-6 bg-gradient-to-b from-main h-screen rounded-xl ${
                className ? className : ''
            }`}
        >
            <div className="flex items-center justify-center mt-2">
                <img src="logo.svg" className="w-9" alt="" />
            </div>
            <DashboardIcon type={type} />
            <AchievementsIcon type={type} />
            <WorkIcon type={type} />
            <HabitsIcon type={type} />
            <ToDoListIcon type={type} />
        </div>
    );
};

export default SideBar;
