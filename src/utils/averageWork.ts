import { IPage } from '@interfaces/index';

export default function averageWork(data: IPage[]) {
    let count: number = 0;
    data.map((e) => {
        if (e.properties.Work && e.properties.Work.number !== null) count += e.properties.Work.number;
    });
    return count / data.length;
}
