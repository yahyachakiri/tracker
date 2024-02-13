import IPage from '@interfaces/IPage';
import { minutesToHours } from '@utils/index';

export default function workCounter(data: IPage[]) {
    let workCount: number = 0;
    data.map((e: IPage) => {
        if (e.properties.Work && e.properties.Work.number !== null) [(workCount += e.properties.Work.number)];
    });
    return {
        hours: minutesToHours(workCount).hours,
        minutes: minutesToHours(workCount).minutes,
    };
}
