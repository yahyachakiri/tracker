import { IPage } from '@interfaces/index';

export default function totalWork(data: IPage[]): number {
    let total = 0;
    data.map((e) => {
        if (e.properties.Work.number !== null) total += e.properties.Work.number;
    });
    return total;
}
