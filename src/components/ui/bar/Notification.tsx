interface props {
    top?: boolean;
}

const Notification = ({ top }: props) => {
    return <span className={`absolute ${top ? 'w-3 h-3 -top-2 -right-2' : 'w-2 h-2 -top-1 -right-1'} rounded-full bg-red`} />;
};

export default Notification;
