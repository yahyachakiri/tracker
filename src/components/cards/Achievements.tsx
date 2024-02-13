import { useHabits } from '@hooks';
import { Card } from '@ui/index';
import { achievementsVals } from '@utils/index';
import { useEffect, useState } from 'react';

interface props {
    time: 'range' | 'specific' | 'short';
    className?: string;
    linkState?: boolean;
}

const Achievements = ({ time, className, linkState }: props) => {
    const [data, setData] = useState(useHabits());
    const [loading, setLoading] = useState(false);
    const [update, setUpdate] = useState('');
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
                    );
            }
        };
        fetchData();
    }, [update]);
    const achievements = achievementsVals(data);
    return (
        <Card
            header="Achievements"
            linkState={linkState}
            link="/achievements"
            time={time}
            updateState={updateState}
            loading={loading}
            updateLoading={updateLoading}
            className={`achievement ${className ? className : ''}`}
        >
            <div className="flex items-center justify-center sm:justify-center flex-wrap gap-6">
                <div
                    className={`relative radial-progress ${
                        achievements.fajr >= 1 ? (achievements.fajr >= (2 / 3) * 100 ? 'text-green' : 'text-red') : 'text-second'
                    } outline outline-[10px] outline-offset-[-10px] outline-second text-xl sm:text-4xl font-semibold`}
                    // @ts-ignore for --value
                    style={{ '--value': achievements.fajr, '--size': '135px', '--thickness': '10px' }}
                >
                    <p className="text-white z-10">{Math.trunc(achievements.fajr)}%</p>
                    <img
                        className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-10 sm:w-[75px]"
                        src="fajr.svg"
                        alt=""
                    />
                </div>
                <div
                    className={`relative radial-progress ${
                        achievements.quran >= 1 ? (achievements.quran >= (2 / 3) * 100 ? 'text-green' : 'text-red') : 'text-second'
                    } outline outline-[10px] outline-offset-[-10px] outline-second text-xl sm:text-4xl font-semibold`}
                    // @ts-ignore for --value
                    style={{ '--value': achievements.quran, '--size': '135px', '--thickness': '10px' }}
                >
                    <p className="text-white z-10">{Math.trunc(achievements.quran)}%</p>
                    <img
                        className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-10 sm:w-[75px]"
                        src="quran.svg"
                        alt=""
                    />
                </div>
                <div
                    className={`relative radial-progress ${
                        achievements.exercise >= 1 ? (achievements.exercise >= (1.3 / 3) * 100 ? 'text-green' : 'text-red') : 'text-second'
                    } outline outline-[10px] outline-offset-[-10px] outline-second text-xl sm:text-4xl font-semibold`}
                    // @ts-ignore for --value
                    style={{ '--value': achievements.exercise, '--size': '135px', '--thickness': '10px' }}
                >
                    <p className="text-white z-10">{Math.trunc(achievements.exercise)}%</p>
                    <img
                        className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-10 sm:w-[75px]"
                        src="exercise.svg"
                        alt=""
                    />
                </div>
                <div
                    className={`relative radial-progress ${
                        achievements.macros >= 1 ? (achievements.macros >= (1 / 12) * 100 ? 'text-green' : 'text-red') : 'text-second'
                    } outline outline-[10px] outline-offset-[-10px] outline-second text-xl sm:text-4xl font-semibold`}
                    // @ts-ignore for --value
                    style={{ '--value': achievements.macros, '--size': '135px', '--thickness': '10px' }}
                >
                    <p className="text-white z-10">{Math.trunc(achievements.macros)}%</p>
                    <img className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 sm:w-[75px]" src="macros.svg" alt="" />
                </div>
            </div>
        </Card>
    );
};

export default Achievements;
