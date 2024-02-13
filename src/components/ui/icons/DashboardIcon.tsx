import Link from 'next/link';
import { useRouter } from 'next/router';

import { Icon } from '@icons/index';

interface props {
    type: 'top' | 'side' | 'bottom';
}

const DashboardIcon = ({ type }: props) => {
    const query = useRouter();
    const active = query.route == '/';
    return (
        <Link href="/">
            <Icon type={type} active={query.route == '/'}>
                <svg
                    className={`${
                        type == 'side'
                            ? 'w-6 h-6 fill-white'
                            : `w-[18px] h-[18px] ${active ? 'fill-white' : 'fill-second'} hover:fill-white transition`
                    } cursor-pointer`}
                    viewBox="0 0 18 18"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect x="9.89856" width="8.10141" height="11.3477" rx="1" className="fill-inherit" />
                    <rect width="8.10141" height="5.09684" rx="1" className="fill-inherit" />
                    <rect y="6.55615" width="8.10141" height="11.3477" rx="1" className="fill-inherit" />
                    <rect x="9.89856" y="12.807" width="8.10141" height="5.193" rx="1" className="fill-inherit" />
                </svg>
            </Icon>
        </Link>
    );
};

export default DashboardIcon;
