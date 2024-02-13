interface props {
    active: boolean;
    children: JSX.Element;
}

const SideIcon = ({ active, children }: props) => {
    return (
        <div className={`p-3.5 ${active ? 'bg-sidebar_active' : ''} hover:bg-sidebar_active transition  cursor-pointer rounded-xl`}>
            {children}
        </div>
    );
};

export default SideIcon;
