import { Card } from '@ui/index';
import { useState } from 'react';

interface props {
    time: 'range' | 'specific' | 'short';
    className?: string;
    linkState?: boolean;
}

const Calendar = ({ time, className, linkState }: props) => {
    const [empty] = useState(false);
    return (
        <Card
            header="Calendar"
            linkState={linkState}
            link="/calendar"
            time={time}
            loading={false}
            updateState={() => {}}
            updateLoading={() => {}}
            className={className}
        >
            <div className={`flex ${!empty ? 'flex-col gap-2 font-medium' : 'items-center justify-center pb-4'}`}>
                {!empty && (
                    <>
                        <form className="flex items-center justify-between text-sm">
                            <input type="text" placeholder="Appointment" className="input input-ghost w-36 sm:w-24 text-sm h-8 p-1" />
                            <input type="time" className="input input-ghost text-xs h-8 p-1" name="" id="" />
                        </form>
                        <form className="flex items-center justify-between text-sm">
                            <input type="text" placeholder="Appointment" className="input input-ghost w-36 sm:w-24 text-sm h-8 p-1" />
                            <input type="time" className="input input-ghost text-xs h-8 p-1" name="" id="" />
                        </form>
                    </>
                )}
                <p
                    className={`${
                        !empty ? 'text-xl' : 'text-center text-6xl font-thin'
                    } text-character cursor-pointer w-fit hover:text-white transition `}
                >
                    +
                </p>
            </div>
        </Card>
    );
};

export default Calendar;
