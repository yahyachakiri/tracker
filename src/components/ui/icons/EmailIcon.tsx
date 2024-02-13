import { useRouter } from 'next/router';
import Link from 'next/link';

import { Icon } from '@icons/index';

interface props {
    unread?: boolean;
    type: 'top' | 'side' | 'bottom';
}

const EmailIcon = ({ unread, type }: props) => {
    const query = useRouter();
    const active = query.route == '/emails';

    return (
        <Link href="emails">
            <Icon unread={unread} type={type} active={active}>
                <svg
                    className={`cursor-pointer ${active ? 'fill-white' : 'fill-second'} hover:fill-white transition ${
                        type == 'top' ? 'w-[25px] h-5' : 'w-[18px] h-[15px]'
                    }`}
                    viewBox="0 0 18 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M18 0.9V4.5L9 8.1L0 4.5V0.9C0 0.661305 0.0948211 0.432387 0.263604 0.263604C0.432387 0.0948213 0.661305 0 0.9 0H17.1C17.3387 0 17.5676 0.0948213 17.7364 0.263604C17.9052 0.432387 18 0.661305 18 0.9ZM0 6.4386V13.5C0 13.7387 0.0948211 13.9676 0.263604 14.1364C0.432387 14.3052 0.661305 14.4 0.9 14.4H17.1C17.3387 14.4 17.5676 14.3052 17.7364 14.1364C17.9052 13.9676 18 13.7387 18 13.5V6.4386L9 10.0386L0 6.4386Z"
                        className="fill-inherit"
                    />
                </svg>
            </Icon>
        </Link>
    );
};

export default EmailIcon;
