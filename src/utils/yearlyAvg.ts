import { IAvgData, IPage } from '@interfaces/index';
import { daysOfAMonth, maxArray, minArray, monthsOfAYear, twoDigits, years } from '@utils/index';

export default function yearlyAvg(data: IPage[]): IAvgData[] {
    let finalData: IAvgData[] = [];
    let counter: number = 0;
    let minutes: number = 0;
    for (let i = minArray(years(data)); i <= maxArray(years(data)); i++) {
        for (let j = minArray(monthsOfAYear(data, i)); j <= maxArray(monthsOfAYear(data, i)); j++) {
            // let avg: number = 0;
            for (let k = minArray(daysOfAMonth(data, j)); k <= maxArray(daysOfAMonth(data, j)); k++) {
                let fullDate: string = i + '-' + twoDigits(j) + '-' + twoDigits(k);
                if (data.filter((item) => item.properties.Date.date.start == fullDate).length > 0) {
                    minutes += data.filter((item) => item.properties.Date.date.start == fullDate)[0].properties.Work.number || 0;
                    counter++;
                }
            }
        }
        finalData = finalData.concat({
            properties: {
                Date: {
                    date: {
                        start: String(i),
                    },
                },
                Work: {
                    number: minutes / counter,
                },
            },
        });
    }
    return finalData;
}
