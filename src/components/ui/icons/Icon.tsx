import { TopIcon, SideIcon, BottomIcon } from '@icons/index';

interface props {
    type: 'top' | 'side' | 'bottom';
    active: boolean;
    unread?: boolean;
    children: JSX.Element;
}

const Icon = ({ type, active, unread, children }: props) => {
    let icon: JSX.Element;
    if (type === 'side') icon = <SideIcon active={active}>{children}</SideIcon>;
    else if (type === 'bottom') icon = <BottomIcon>{children}</BottomIcon>;
    else icon = <TopIcon>{children}</TopIcon>;

    if (unread) {
        return (
            <div className="relative">
                {icon}
                <span className={`absolute ${type == 'top' ? 'w-3 h-3 -top-2 -right-2' : 'w-2 h-2 -top-1 -right-1'} rounded-full bg-red`} />
            </div>
        );
    }
    return icon;
};

export default Icon;
