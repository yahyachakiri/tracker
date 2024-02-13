// import { IAvgData, IWorkData } from '@interfaces/index';
// import { daysOfAMonth, maxArray, minArray, monthsOfAYear, years, twoDigits } from '@utils/index';

// export default function dataAvg(data: IWorkData[]): IAvgData[] {
//     let finalData: IAvgData[] = [];
//     for (let i = minArray(years(data)); i <= maxArray(years(data)); i++) {
//         for (let j = minArray(monthsOfAYear(data, i)); j <= maxArray(monthsOfAYear(data, i)); j++) {
//             // let avg: number = 0;
//             let counter: number = 0;
//             let minutes: number = 0;
//             for (let k = minArray(daysOfAMonth(data, j)); k <= maxArray(daysOfAMonth(data, j)); k++) {
//                 let fullDate: string = i + '-' + twoDigits(j) + j + '-' + twoDigits(k) + k;
//                 if (data.filter((item) => item.properties.date == fullDate).length > 0) {
//                     minutes += data.filter((item) => item.properties.date == fullDate)[0].number;
//                     counter++;
//                 }
//             }
//             finalData = finalData.concat({
//                 date: `${i}-${twoDigits(j)}`,
//                 average: minutes / 60 / counter,
//             });
//         }
//     }
//     return finalData;
// }
