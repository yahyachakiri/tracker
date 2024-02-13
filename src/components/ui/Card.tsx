import { ChangeEvent, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

import { ISODate, ISOToday, minutesToHours, twoDigits } from '@utils/index';

interface props {
    header: string;
    link: string;
    children: JSX.Element;
    time: 'range' | 'specific' | 'short';
    className?: string;
    linkState?: boolean;
    loading: boolean;
    chartData?: number;
    data?: number;
    updateAverage?: (e: boolean) => void;
    updateLoading: (e: boolean) => void;
    updateState: (e: string) => void;
    updateDate?: (e: string) => void;
    todolist?: boolean;
    todolistType?: string;
}

const Card = ({
    header,
    link,
    children,
    time,
    className,
    updateState,
    linkState,
    updateLoading,
    loading,
    chartData,
    data,
    updateAverage,
    updateDate,
    todolist,
    todolistType,
}: props) => {
    const [advanced, setAdvanced] = useState(false);
    const [fromError, setFromError] = useState(false);
    const [toError, setToError] = useState(false);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [fromTo, setFromTo] = useState('');
    const [selected, setSelected] = useState(`${time == 'range' ? '7' : 'Today'}`);
    const [checkbox, setCheckbox] = useState(false);

    const blurFromDateHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let fromDate = new Date(e.target.value);
        let toDate = new Date(to);
        if (e.target.value != from || (fromDate.getTime() - toDate.getTime() > 0 && e.target.value != '')) {
            setFromError(true);
        }
    };
    const changeFromDateHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setFrom(e.target.value);
        let fromDate = new Date(e.target.value);
        let toDate = new Date(to);
        if (to != '' && e.target.value != '' && fromDate.getTime() - toDate.getTime() < 0) {
            if (e.target.value != from) {
                updateLoading(true);
                setFromError(false);
                setToError(false);
                updateState(`${e.target.value}&to=${to}`);
                setSelected('');
            }
        } else if (to != '') {
            setFromError(true);
        }
    };

    const blurToDateHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let fromDate = new Date(from);
        let toDate = new Date(e.target.value);
        if (e.target.value != to || fromDate.getTime() - toDate.getTime() > 0) {
            setToError(true);
        }
    };
    const changeToDateHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTo(e.target.value);
        if (e.target.value != '') {
            let fromDate = new Date(from);
            let toDate = new Date(e.target.value);
            if (from == '' || fromDate.getTime() - toDate.getTime() > 0) {
                setToError(true);
            } else if (e.target.value != to) {
                updateLoading(true);
                setFromError(false);
                setToError(false);
                updateState(`${from}&to=${e.target.value}`);
                setSelected('');
            }
        }
    };
    const changeFromToDateHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setFromTo(e.target.value);
        if (e.target.value != '' && e.target.value != fromTo) {
            let fromToDate = new Date(e.target.value);
            if (typeof fromToDate.getMonth === 'function') {
                updateLoading(true);
                updateState(`${e.target.value}&to=${e.target.value}`);
                setSelected('');
            }
        }
    };

    const changeCheckHandler = () => {
        setCheckbox(!checkbox);
        if (updateAverage) updateAverage(!checkbox);
    };

    const changeSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        updateLoading(true);
        setSelected(e.target.value);
        setFrom('');
        setTo('');
        let date = new Date();
        let todayYesterday = new Date();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        if (parseInt(e.target.value)) {
            date.setDate(date.getDate() - Number(e.target.value));
            updateState(date.toISOString().split('T')[0]);
        } else {
            if (e.target.value === 'Current month') {
                updateState(`${year}-${twoDigits(month)}-01`);
            } else if (e.target.value == 'Current year') {
                updateState(year + '-01-01');
            } else if (e.target.value == 'Last year') {
                updateState(`${year - 1}-01-01&to=${year - 1}-12-31`);
            } else if (e.target.value == 'Last month') {
                let newDate = new Date(year, month - 1, 0);
                let lastDay = newDate.toString().split(' ')[2];

                if (month == 1) {
                    updateState(`${year - 1}-12-01&to=${year - 1}-12-31`);
                } else {
                    updateState(`${year}-${twoDigits(month - 1)}-01&to=${year}-${twoDigits(month - 1)}-${lastDay}`);
                }
            } else if (e.target.value == 'All') {
                updateState('all');
            } else if (e.target.value == 'Today') {
                updateState(`${ISODate(todayYesterday)}&to=${ISODate(todayYesterday)}`);
            } else if (e.target.value == 'Yesterday') {
                todayYesterday.setDate(date.getDate() - 1);
                updateState(`${ISODate(todayYesterday)}&to=${ISODate(todayYesterday)}`);
            } else if (e.target.value == 'Week' || e.target.value == 'Weekend' || e.target.value == 'Month') {
                updateState(`${ISOToday()}&type=${e.target.value}`);
            }
            if ((e.target.value == 'Today' || e.target.value == 'Yesterday') && updateDate) updateDate(ISODate(todayYesterday));
        }
    };
    return (
        <div className={`bg-main p-6 rounded-3xl w-full ${className ? className : ''}`}>
            <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                <div className="flex items-center flex-wrap gap-3">
                    {linkState ? (
                        <Link href={link} className="font-semibold sm:text-lg">
                            {header}
                        </Link>
                    ) : (
                        <div className="font-semibold sm:text-lg">{header}</div>
                    )}
                    {chartData && data && (
                        <>
                            <div className="flex items-center gap-1">
                                <input
                                    type="checkbox"
                                    onChange={changeCheckHandler}
                                    name=""
                                    id="avg-work-chart"
                                    className="checkbox checkbox-xs"
                                />
                                <label htmlFor="avg-work-chart" className="text-xs cursor-pointer text-character select-none">
                                    Average
                                </label>
                            </div>
                            {checkbox ? (
                                <p className="text-sm text-character">{`${
                                    (minutesToHours(chartData).hours as number) > 0
                                        ? Math.floor(minutesToHours(chartData).hours as number) + 'h'
                                        : ''
                                } ${
                                    (minutesToHours(chartData).minutes as number) > 0
                                        ? Math.floor(minutesToHours(chartData).minutes as number) + 'min'
                                        : ''
                                }`}</p>
                            ) : (
                                <p className="text-sm text-character">{`${
                                    (minutesToHours(data).hours as number) > 0 ? Math.floor(minutesToHours(data).hours as number) + 'h' : ''
                                } ${
                                    (minutesToHours(data).minutes as number) > 0
                                        ? Math.floor(minutesToHours(data).minutes as number) + 'min'
                                        : ''
                                }`}</p>
                            )}
                        </>
                    )}
                </div>

                {todolistType ? (
                    <>
                        {loading && (
                            <div className="relative">
                                <div className="loader from-main to-white after:bg-main right-2.5"></div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-4">
                        {advanced && (
                            <AnimatePresence>
                                <motion.div
                                    className="flex items-center gap-2"
                                    initial={{ x: '-7px' }}
                                    animate={{ x: 0 }}
                                    exit={{ x: '-7px' }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {time == 'range' ? (
                                        <>
                                            <input
                                                type="date"
                                                value={from}
                                                onFocus={() => setFromError(false)}
                                                onBlur={(e) => blurFromDateHandler(e)}
                                                onChange={(e) => changeFromDateHandler(e)}
                                                className={`input bg-second rounded-full text-[11px] font-medium h-8 p-2 ${
                                                    fromError ? 'outline outline-2 outline-offset-2 outline-red animate-error' : ''
                                                }`}
                                            />
                                            <p className="text-sm font-semibold text-character">to</p>
                                            <div className="relative">
                                                <input
                                                    type="date"
                                                    value={to}
                                                    onFocus={() => setToError(false)}
                                                    onBlur={(e) => blurToDateHandler(e)}
                                                    onChange={(e) => changeToDateHandler(e)}
                                                    className={`input bg-second rounded-full text-[11px] font-medium h-8 p-2 ${
                                                        toError ? 'outline outline-2 outline-offset-2 outline-red animate-error' : ''
                                                    }`}
                                                />
                                                {loading && <div className="loader right-2.5"></div>}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="relative">
                                            <input
                                                type="date"
                                                value={fromTo}
                                                onChange={(e) => {
                                                    changeFromToDateHandler(e);
                                                    if (updateDate) {
                                                        updateDate(ISODate(new Date(e.target.value)));
                                                    }
                                                }}
                                                className={`input bg-second rounded-full text-[11px] font-medium h-8 p-2`}
                                            />
                                            {loading && <div className="loader right-2.5"></div>}
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        )}
                        {!advanced && (
                            <AnimatePresence>
                                <motion.div
                                    className="relative"
                                    initial={{ x: '-7px' }}
                                    animate={{ x: 0 }}
                                    exit={{ x: '-7px' }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <select
                                        className="select select-sm rounded-full bg-second text-date disabled:bg-second disabled:text-date font-normal text-xs w-fit"
                                        name=""
                                        id=""
                                        onChange={(e) => changeSelectHandler(e)}
                                        defaultValue={selected}
                                        disabled={loading}
                                    >
                                        <option value="" hidden>
                                            Choose date
                                        </option>
                                        {time == 'range' ? (
                                            <>
                                                <option value="7">Past week</option>
                                                <option value="Current month">Current month</option>
                                                <option value="Last month">Last month</option>
                                                <option value="90">Past 3 mos</option>
                                                <option value="180">Past 6 mos</option>
                                                <option value="Current year">Current year</option>
                                                <option value="Last year">Last year</option>
                                                <option value="All">All</option>
                                            </>
                                        ) : (
                                            <>
                                                <option value="Today">Today</option>
                                                <option value="Yesterday">Yesterday</option>
                                                {todolist && (
                                                    <>
                                                        <option value="Week">Week</option>
                                                        <option value="Weekend">Weekend</option>
                                                        <option value="Month">Month</option>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </select>
                                    {loading && <div className="loader"></div>}
                                </motion.div>
                            </AnimatePresence>
                        )}
                        {time !== 'short' && (
                            <button
                                onClick={() => {
                                    setAdvanced(!advanced);
                                    setToError(false);
                                }}
                                className="text-character hover:text-white transition text-xs"
                            >
                                {advanced ? 'Basic' : 'Custom'}
                            </button>
                        )}
                    </div>
                )}
            </div>
            {children}
        </div>
    );
};

export default Card;
