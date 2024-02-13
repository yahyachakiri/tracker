import Link from 'next/link';
import { useRouter } from 'next/router';

import { Icon } from '@icons/index';

interface props {
    type: 'top' | 'side' | 'bottom';
}

const WorkIcon = ({ type }: props) => {
    const query = useRouter();
    const active = query.route == '/work';

    return (
        <Link href="work">
            <Icon type={type} active={active}>
                <svg
                    className={`${
                        type == 'side'
                            ? 'w-6 h-6 fill-white'
                            : `w-[18px] h-[18px] ${active ? 'fill-white' : 'fill-second'} hover:fill-white transition`
                    } cursor-pointer`}
                    viewBox="0 0 40 41"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        className="fill-inherit"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M29.98 8.66669V4.66669C29.98 3.60582 29.5586 2.58841 28.8084 1.83826C28.0583 1.08811 27.0409 0.666687 25.98 0.666687H13.98C12.9191 0.666687 11.9017 1.08811 11.1516 1.83826C10.4014 2.58841 9.98 3.60582 9.98 4.66669V8.66669H4C1.79086 8.66669 0 10.4575 0 12.6667V36.6667C0 38.8758 1.79086 40.6667 4 40.6667H36C38.2091 40.6667 40 38.8758 40 36.6667V12.6667C40 10.4575 38.2091 8.66669 36 8.66669H29.98ZM25.98 8.66669V4.66669H13.98V8.66669H25.98ZM7.98 18.6567C7.98 17.5466 8.87991 16.6467 9.99 16.6467H29.97C31.0801 16.6467 31.98 17.5466 31.98 18.6567C31.98 19.7668 31.0801 20.6667 29.97 20.6667H9.99C8.87991 20.6667 7.98 19.7668 7.98 18.6567Z"
                    />
                </svg>
            </Icon>
        </Link>
    );
};

export default WorkIcon;
