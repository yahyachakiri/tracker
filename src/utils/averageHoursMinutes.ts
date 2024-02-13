import { IPage } from '@interfaces/index';
import { minutesToHours } from '@utils/index';

export default function averageHoursMinutes(data: IPage[]) {
    let count: number = 0;
    data.map((e) => {
        if (e.properties.Work.number !== null) count += e.properties.Work.number;
    });
    return {
        hours: Math.trunc(minutesToHours(count / data.length).hours as number) || null,
        minutes: Math.trunc(minutesToHours(count / data.length).minutes as number) || null,
    };
}
