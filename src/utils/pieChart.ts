import { IPage } from '@interfaces/index';

export default function pieChart(data: IPage[], initialDate: string, finalDate: string | number): number {
    let i = 0;
    const start = new Date(initialDate);
    const end = new Date(finalDate);
    let loop = new Date(start);
    while (loop <= end) {
        i++;
        let newDate = loop.setDate(loop.getDate() + 1);
        loop = new Date(newDate);
    }
    return (data.length / i) * 100;
}
