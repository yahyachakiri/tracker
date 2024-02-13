import { useState, useEffect } from 'react';

import { averageHoursMinutes, twoDigits, workCounter } from '@utils/index';
import { useHabits } from '@hooks';

interface props {
    className?: string;
}

const WorkCounter = ({ className }: props) => {
    const [data, setData] = useState(useHabits());
    const [loading, setLoading] = useState(false);
    const [workCount, setWorkCount] = useState(workCounter(data));
    const [update, setUpdate] = useState('');
    const [checkbox, setCheckbox] = useState(false);

    const changeCheckHandler = () => {
        setCheckbox(!checkbox);
        if (!checkbox) setWorkCount(averageHoursMinutes(data));
        else setWorkCount(workCounter(data));
    };

    const changeDateHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLoading(true);
        let date = new Date();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        if (parseInt(e.target.value)) {
            date.setDate(date.getDate() - Number(e.target.value));
            setUpdate(date.toISOString().split('T')[0]);
        } else {
            if (e.target.value === 'Current month') {
                setUpdate(`${date.getFullYear()}-${twoDigits(date.getMonth() + 1)}-01`);
            } else if (e.target.value == 'Current year') {
                setUpdate(date.getFullYear() + '-01-01');
            } else if (e.target.value == 'Last year') {
                setUpdate(`${date.getFullYear() - 1}-01-01&to=${date.getFullYear() - 1}-12-31`);
            } else if (e.target.value == 'Last month') {
                let newDate = new Date(year, month - 1, 0);
                let lastDay = newDate.toString().split(' ')[2];

                if (month == 1) {
                    setUpdate(`${year - 1}-12-01&to=${year - 1}-12-31`);
                } else {
                    setUpdate(`${year}-${twoDigits(month - 1)}-01&to=${year}-${twoDigits(month - 1)}-${lastDay}`);
                }
            } else if (e.target.value == 'All') {
                setUpdate('all');
            } else if (e.target.value == 'Today') {
                setUpdate(date.toISOString().split('T')[0]);
            } else if (e.target.value == 'Today') {
                date.setDate(date.getDate() - 1);
                setUpdate(date.toISOString().split('T')[0]);
            }
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            if (update !== '') {
                let from = true;
                if (update == 'all') from = false;
                await fetch(`http://localhost:3000/api/work?${from && `from=${update}`}`)
                    .then((res) => res.json())
                    .then(
                        (result) => {
                            setData(result);
                            if (checkbox) setWorkCount(averageHoursMinutes(result));
                            else setWorkCount(workCounter(result));
                            setLoading(false);
                        },
                        (error) => {
                            console.log(error);
                        }
                    );
            }
        };
        fetchData();
    }, [update]);
    return (
        <div className={`flex items-center justify-between p-6 bg-main rounded-3xl ${className ? className : ''}`}>
            <div className="w-fit m-auto">
                <div className="">
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1">
                            <input type="checkbox" onChange={changeCheckHandler} name="" id="avg" className="checkbox checkbox-xs" />
                            <label htmlFor="avg" className="text-xs cursor-pointer text-character select-none">
                                Average
                            </label>
                        </div>
                        <div className="relative">
                            <select
                                className="select select-xs rounded-full bg-second font-normal text-date text-xs w-full"
                                name=""
                                id=""
                                onChange={(e) => changeDateHandler(e)}
                                defaultValue="7"
                            >
                                <option value="7">Past week</option>
                                <option value="Current month">Current month</option>
                                <option value="Last month">Last month</option>
                                <option value="90">Past 3 mos</option>
                                <option value="180">Past 6 mos</option>
                                <option value="Current year">Current year</option>
                                <option value="Last year">Last year</option>
                                <option value="All">All</option>
                            </select>
                            {loading && <div className="loader"></div>}
                        </div>
                    </div>
                    <p className="text-character text-xs sm:text-sm mt-4">Time worked</p>
                </div>
                <p className="text-3xl sm:text-4xl font-semibold">
                    {(workCount.hours as number) > 0 && (
                        <>
                            {twoDigits(workCount.hours as number)}{' '}
                            <span className="relative -ml-2 text-character text-lg sm:text-2xl">h</span>
                        </>
                    )}
                    {(workCount.minutes as number) > 0 && (
                        <>
                            {twoDigits(workCount.minutes as number)}{' '}
                            <span className="relative -ml-2 text-character text-lg sm:text-2xl">min</span>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
};

export default WorkCounter;
