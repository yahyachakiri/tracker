import { TooltipItem } from 'chart.js';
import { useState, useEffect } from 'react';

import { useHabits } from '@hooks';
import { averageWork, minutesToHours, monthlyAvg, workData, totalWork } from '@utils/index';
import { Card, LineChart } from '@ui/index';

interface props {
    time: 'range' | 'specific' | 'short';
    className?: string;
    linkState?: boolean;
}

const Work = ({ time, className, linkState }: props) => {
    const [data, setData] = useState(useHabits());
    const [chartData, setChartData] = useState(workData(data));
    const [average, setAverage] = useState(false);
    const updateAverage = (e: boolean) => {
        setAverage(e);
    };
    const [loading, setLoading] = useState(false);
    const [update, setUpdate] = useState('');
    function updateState(e: string) {
        setUpdate(e);
    }
    function updateLoading(e: boolean) {
        setLoading(e);
    }
    useEffect(() => {
        if (average) setChartData(workData(monthlyAvg(data)));
        else setChartData(workData(data));
    }, [average]);
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
                            if (average) setChartData(workData(monthlyAvg(result)));
                            else setChartData(workData(result));
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

    const callbacks = {
        label: function (context: TooltipItem<'line'>) {
            let label = context.dataset.label || '';
            if (label) {
                label += ': ';
            }
            let minutes = minutesToHours(context.parsed.y).minutes;
            let hours = minutesToHours(context.parsed.y).hours;
            if ((hours as number) > 0) {
                label = hours + 'h';
            }
            if ((minutes as number) > 0) {
                label += ' ' + minutes + 'min';
            }
            if (context.parsed.y == 0 || context.parsed.y == null) {
                label = '0min';
            }
            return label;
        },
    };
    return (
        <Card
            header="Work"
            linkState={linkState}
            link="/work"
            time={time}
            updateState={updateState}
            loading={loading}
            updateLoading={updateLoading}
            chartData={averageWork(data)}
            data={totalWork(data)}
            updateAverage={updateAverage}
            className={className}
        >
            <div className="relative">
                <div className="mr-12">
                    <LineChart high={averageWork(data) > 90} data={chartData} callbacks={callbacks} />
                </div>
                <div className="absolute w-11 h-full top-0 right-0 text-[10px] text-character flex flex-col justify-between">
                    <span>
                        {(minutesToHours(
                            Math.max.apply(
                                Math,
                                chartData.map((e) => e.value)
                            )
                        ).hours as number) > 0 &&
                            minutesToHours(
                                Math.max.apply(
                                    Math,
                                    chartData.map((e) => e.value)
                                )
                            ).hours + 'h'}
                        {(minutesToHours(
                            Math.max.apply(
                                Math,
                                chartData.map((e) => e.value)
                            )
                        ).minutes as number) > 0 &&
                            minutesToHours(
                                Math.max.apply(
                                    Math,
                                    chartData.map((e) => e.value)
                                )
                            ).minutes + 'min'}
                    </span>
                    <span>
                        {(minutesToHours(
                            Math.min.apply(
                                Math,
                                chartData.map((e) => e.value)
                            )
                        ).hours as number) > 0 &&
                            minutesToHours(
                                Math.min.apply(
                                    Math,
                                    chartData.map((e) => e.value)
                                )
                            ).hours + 'h'}
                        {(minutesToHours(
                            Math.min.apply(
                                Math,
                                chartData.map((e) => e.value)
                            )
                        ).minutes as number) > 0 &&
                            minutesToHours(
                                Math.min.apply(
                                    Math,
                                    chartData.map((e) => e.value)
                                )
                            ).minutes + 'min'}
                        {minutesToHours(
                            Math.min.apply(
                                Math,
                                chartData.map((e) => e.value)
                            )
                        ).hours == 0 &&
                            minutesToHours(
                                Math.min.apply(
                                    Math,
                                    chartData.map((e) => e.value)
                                )
                            ).minutes == 0 &&
                            '0'}
                    </span>
                </div>
            </div>
        </Card>
    );
};

export default Work;
