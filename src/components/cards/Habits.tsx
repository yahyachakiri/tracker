import { ISODate, ISOToday, createPage } from '@utils/index';
import { Card, HabitsRow } from '@ui/index';
import { useEffect, useState } from 'react';

import { IPage } from '@interfaces/index';
import { useHabits } from '@hooks';

interface props {
    time: 'range' | 'specific' | 'short';
    className?: string;
    linkState?: boolean;
}

const Habits = ({ time, className, linkState }: props) => {
    const todayData: IPage[] = useHabits().filter((e: IPage) => e.properties.Date.date.start == ISOToday());
    const [data, setData] = useState<IPage[]>(todayData);
    const [loading, setLoading] = useState(false);
    const [update, setUpdate] = useState('');
    const [date, setDate] = useState(ISODate(new Date()));
    const [calories, setCalories] = useState(true);

    const updateDate = (e: string) => {
        setDate(e);
    };

    const updateHabits = (e: IPage) => {
        setData([e]);
    };
    const updateState = (e: string) => {
        setUpdate(e);
    };
    const updateLoading = (e: boolean) => {
        setLoading(e);
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
                            setLoading(false);
                        },
                        (error) => {
                            console.log(error);
                        }
                    )
                    .catch((err) => console.log(err));
            }
        };
        fetchData();
    }, [update]);
    return (
        <Card
            header="Habits"
            linkState={linkState}
            link="/habits"
            time={time}
            loading={loading}
            updateState={updateState}
            updateLoading={updateLoading}
            updateDate={updateDate}
            className={className}
        >
            {data.length > 0 ? (
                <>
                    <div className="flex justify-center gap-4 sm:gap-8 flex-wrap">
                        <div className="w-[84] sm:w-[114px]">
                            <img className="w-[14px] block m-auto" src="work.svg" alt="" />
                        </div>
                        <div className="w-4 sm:w-5">
                            <img className="w-[14px]" src="fajr.svg" alt="" />
                        </div>
                        <div className="w-4 sm:w-5">
                            <img className="w-[14px]" src="quran.svg" alt="" />
                        </div>
                        <div className="w-4 sm:w-5">
                            <img className="w-[14px]" src="exercise.svg" alt="" />
                        </div>
                        <div className="w-4 sm:w-5">
                            <img className="w-[14px]" src="macros.svg" alt="" />
                        </div>
                        {calories ? (
                            <div className="w-[45px] flex items-center justify-center">
                                <img onClick={() => setCalories(!calories)} className="cursor-pointer w-[14px]" src="calories.svg" alt="" />
                            </div>
                        ) : (
                            <div className="w-[45px] flex items-center justify-center">
                                <img onClick={() => setCalories(!calories)} className="cursor-pointer w-[14px]" src="scale.svg" alt="" />
                            </div>
                        )}
                    </div>
                    {data.map((habits: IPage) => {
                        return (
                            <HabitsRow
                                key={habits.id}
                                habits={habits}
                                updateLoading={updateLoading}
                                loading={loading}
                                calories={calories}
                            />
                        );
                    })}
                </>
            ) : (
                <button
                    onClick={() => {
                        setLoading(true);
                        createPage(updateHabits, date, updateLoading);
                    }}
                    className="text-center text-6xl font-thin text-character cursor-pointer w-fit block m-auto hover:text-white transition"
                >
                    +
                </button>
            )}
        </Card>
    );
};

export default Habits;
