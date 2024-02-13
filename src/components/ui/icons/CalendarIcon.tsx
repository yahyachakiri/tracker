import { useRouter } from 'next/router';
import Link from 'next/link';

import { Icon } from '@icons/index';

interface props {
    unread?: boolean;
    type: 'top' | 'side' | 'bottom';
}

const CalendarIcon = ({ unread, type }: props) => {
    const query = useRouter();
    const active = query.route == '/calendar';

    return (
        <Link href="calendar">
            <Icon unread={unread} type={type} active={active}>
                <svg
                    className={`cursor-pointer ${active ? 'fill-white' : 'fill-second'} hover:fill-white transition ${
                        type == 'top' ? 'w-[25px] h-[25px]' : 'w-[18px] h-[18px]'
                    }`}
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        className="fill-inherit"
                        d="M0.00145805 7.20001C0.000468049 7.29244 0 7.38604 0 7.48081V12.3192C0 13.324 0.0526681 14.1928 0.214794 14.9224C0.379197 15.6622 0.667881 16.3126 1.17763 16.8224C1.68739 17.3321 2.33788 17.6208 3.07763 17.7852C3.80716 17.9474 4.67601 18 5.6808 18H12.3192C13.324 18 14.1928 17.9474 14.9224 17.7852C15.6622 17.6208 16.3126 17.3321 16.8223 16.8224C17.3321 16.3126 17.6208 15.6622 17.7852 14.9224C17.9473 14.1928 18 13.324 18 12.3192V7.48081C18 7.38604 17.9995 7.29244 17.9986 7.20001H0.00145805Z"
                    />
                    <path
                        className="fill-inherit"
                        d="M2.69994 2.11237V0.9C2.69994 0.402948 3.10288 0 3.59994 0C4.097 0 4.49994 0.402948 4.49994 0.9V1.83129C4.86996 1.80907 5.26364 1.8 5.68074 1.8H12.3191C12.7363 1.8 13.1299 1.80907 13.4999 1.83129V0.9C13.4999 0.402948 13.9029 0 14.3999 0C14.897 0 15.2999 0.402948 15.2999 0.9V2.11237C15.8841 2.28631 16.4012 2.55654 16.8223 2.97763C17.332 3.48739 17.6208 4.13788 17.7851 4.87763C17.8222 5.04448 17.8536 5.21861 17.8799 5.4H0.119995C0.146302 5.21861 0.177658 5.04448 0.214738 4.87763C0.379141 4.13788 0.667825 3.48739 1.17758 2.97763C1.59867 2.55654 2.1158 2.28631 2.69994 2.11237Z"
                    />
                </svg>
            </Icon>
        </Link>
    );
};

export default CalendarIcon;
