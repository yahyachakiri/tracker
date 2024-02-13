import { useRouter } from 'next/router';
import Link from 'next/link';

import { Icon } from '@icons/index';

interface props {
    type: 'side' | 'bottom';
}

const HabitsIcon = ({ type }: props) => {
    const query = useRouter();
    const active = query.route == '/habits';

    return (
        <Link href="habits">
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
                    <path
                        className="fill-inherit"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0 3.46154V9V14.5385C0 16.4769 1.52308 18 3.46154 18H9H14.5385C16.4769 18 18 16.4769 18 14.5385V9V3.46154C18 1.52308 16.4769 0 14.5385 0H9H3.46154C1.52308 0 0 1.52308 0 3.46154ZM8.64183 12.3744L13.6452 7.3787C13.8807 7.14353 14.013 6.82455 14.013 6.49196C14.013 6.15937 13.8807 5.84039 13.6452 5.60522C13.4096 5.37004 13.0902 5.23792 12.7571 5.23792C12.424 5.23792 12.1045 5.37004 11.869 5.60522L7.75373 9.7267L6.14015 8.10309C5.90461 7.86791 5.58515 7.73579 5.25205 7.73579C4.91895 7.73579 4.59949 7.86791 4.36396 8.10309C4.12842 8.33827 3.99609 8.65724 3.99609 8.98983C3.99609 9.32242 4.12842 9.6414 4.36396 9.87657L6.86563 12.3744C6.98192 12.4915 7.12026 12.5844 7.27269 12.6478C7.42511 12.7112 7.5886 12.7439 7.75373 12.7439C7.91886 12.7439 8.08235 12.7112 8.23477 12.6478C8.3872 12.5844 8.52555 12.4915 8.64183 12.3744Z"
                    />
                </svg>
            </Icon>
        </Link>
    );
};

export default HabitsIcon;
