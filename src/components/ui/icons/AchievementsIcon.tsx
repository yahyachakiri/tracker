import { useRouter } from 'next/router';
import Link from 'next/link';

import { Icon } from '@icons/index';

interface props {
    type: 'side' | 'bottom';
}

const AchievementsIcon = ({ type }: props) => {
    const query = useRouter();
    const active = query.route == '/achievements';

    return (
        <Link href="achievements">
            <Icon type={type} active={active}>
                <svg
                    className={`${
                        type == 'side'
                            ? 'w-6 h-6 fill-white'
                            : `w-[18px] h-[18px] ${active ? 'fill-white' : 'fill-second'} hover:fill-white transition`
                    } cursor-pointer`}
                    viewBox="0 0 18 18"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M18 18V0H13.5V18H18ZM11.25 18V5.625H6.75V18H11.25ZM4.5 18V9H0V18H4.5Z" className="fill-inherit" />
                </svg>
            </Icon>
        </Link>
    );
};

export default AchievementsIcon;
