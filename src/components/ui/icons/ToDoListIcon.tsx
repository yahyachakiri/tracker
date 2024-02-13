import { useRouter } from 'next/router';
import Link from 'next/link';

import { Icon } from '@icons/index';

interface props {
    type: 'side' | 'bottom';
}

const ToDoListIcon = ({ type }: props) => {
    const query = useRouter();
    const active = query.route == '/todolist';

    return (
        <Link href="todolist">
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
                        d="M14.5385 0H3.46154C1.52308 0 0 1.52308 0 3.46154V14.5385C0 16.4769 1.52308 18 3.46154 18H14.5385C16.4769 18 18 16.4769 18 14.5385V3.46154C18 1.52308 16.4769 0 14.5385 0ZM13.1538 12.4615H4.84615C4.43077 12.4615 4.15385 12.1846 4.15385 11.7692C4.15385 11.3538 4.43077 11.0769 4.84615 11.0769H13.1538C13.5692 11.0769 13.8462 11.3538 13.8462 11.7692C13.8462 12.1846 13.5692 12.4615 13.1538 12.4615ZM13.1538 9.69231H4.84615C4.43077 9.69231 4.15385 9.41539 4.15385 9C4.15385 8.58462 4.43077 8.30769 4.84615 8.30769H13.1538C13.5692 8.30769 13.8462 8.58462 13.8462 9C13.8462 9.41539 13.5692 9.69231 13.1538 9.69231ZM13.1538 6.92308H4.84615C4.43077 6.92308 4.15385 6.64615 4.15385 6.23077C4.15385 5.81538 4.43077 5.53846 4.84615 5.53846H13.1538C13.5692 5.53846 13.8462 5.81538 13.8462 6.23077C13.8462 6.64615 13.5692 6.92308 13.1538 6.92308Z"
                    />
                </svg>
            </Icon>
        </Link>
    );
};

export default ToDoListIcon;
