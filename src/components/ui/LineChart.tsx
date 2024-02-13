import { useMediaQuery } from 'react-responsive';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
    CoreChartOptions,
    ElementChartOptions,
    PluginChartOptions,
    DatasetChartOptions,
    ScaleChartOptions,
    LineControllerChartOptions,
    TooltipItem,
    Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import { IChartData } from '@interfaces/index';
import { dayOfWeek, monthInLetters } from '@utils/index';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface props {
    high?: boolean;
    data: IChartData[];
    callbacks?: { label: (context: TooltipItem<'line'>) => string };
}

const LineChart = ({ high, callbacks, data }: props) => {
    const isMobile = useMediaQuery({
        query: '(max-width: 639px)',
    });

    const options:
        | _DeepPartialObject<
              CoreChartOptions<'line'> &
                  ElementChartOptions<'line'> &
                  PluginChartOptions<'line'> &
                  DatasetChartOptions<'line'> &
                  ScaleChartOptions<'line'> &
                  LineControllerChartOptions
          >
        | undefined = {
        responsive: true,
        interaction: {
            intersect: false,
        },
        plugins: {
            legend: {
                display: false,
                labels: {
                    font: {
                        family: "'Inter', sans-serif",
                        weight: '700',
                        size: 14,
                    },
                    boxWidth: 10,
                    boxHeight: 10,
                    borderRadius: 50,
                },
                position: 'bottom',
                maxWidth: 20,
            },
            tooltip: {
                titleFont: {
                    family: "'Inter', sans-serif",
                    size: 14,
                    weight: '400',
                },
                titleMarginBottom: 5,
                titleAlign: 'center',
                bodyFont: {
                    family: "'Inter', sans-serif",
                    size: 16,
                    weight: '500',
                },
                bodyAlign: 'center',
                caretSize: 0,
                backgroundColor: 'rgba(20, 20, 20, 0.8)',
                displayColors: false,
                padding: 15,
                cornerRadius: 10,
                ...(callbacks && {
                    callbacks,
                }),
            },
        },
        scales: {
            x: {
                display: false,
            },
            y: {
                display: false,
            },
        },
    };

    let dataLabels: string[] = [];
    data.map((e) => dataLabels.push(e.label));

    let year = false;
    let avg = false;

    dataLabels.map((e) => {
        if (e.split('-')[0] !== dataLabels[0].split('-')[0]) {
            year = true;
        }
    });

    if (dataLabels[0]?.split('-')[2] == '01' && dataLabels[1]?.split('-')[2] == '01') {
        avg = true;
    }

    dataLabels = dataLabels.map((e) => {
        let date: string = dayOfWeek(e) + ', ' + monthInLetters(Number(e.split('-')[1]));
        if (!avg) date += ' ' + e.split('-')[2];
        if (year) date += ', ' + e.split('-')[0];
        return date;
    });

    let dataValues: number[] = [];
    data.map((e) => dataValues.push(e.value));

    const lineData: ChartData<'line', number[], string> = {
        labels: dataLabels,
        datasets: [
            {
                label: '',
                data: dataValues,
                ...(isMobile ? { borderWidth: 5 } : { borderWidth: 7 }),
                ...(high
                    ? { borderColor: '#33d29b', pointBackgroundColor: '#33d29b' }
                    : { borderColor: '#FF4F79', pointBackgroundColor: '#FF4F79' }),
                backgroundColor: (context) => {
                    const chart = context.chart;
                    const { chartArea } = chart;
                    if (chartArea) {
                        return getGradient(chart);
                    } else {
                        return 'transparent';
                    }
                },
                tension: 0.3,
                pointBorderWidth: 0,
                pointHoverBorderWidth: 5,
                pointHoverBackgroundColor: 'white',
                hoverBackgroundColor: 'white',
                hoverBorderColor: 'white',
                fill: true,
            },
        ],
    };

    const getGradient = (chart: ChartJS) => {
        const {
            ctx,
            chartArea: { top, bottom },
        } = chart;
        const gradientSegment = ctx.createLinearGradient(0, top, 0, bottom);
        gradientSegment.addColorStop(0, 'rgb(20, 20, 20)');
        gradientSegment.addColorStop(1, 'transparent');
        return gradientSegment;
    };

    return <Line options={options} data={lineData} />;
};

export default LineChart;
