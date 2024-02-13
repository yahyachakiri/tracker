import { IPage } from '@interfaces/index';

export default function daysOfAMonth(array: IPage[], month: number): number[] {
    array = array.filter((item) => Number(item.properties.Date.date.start.split('-')[1]) === month);
    let numberArray: number[] = array.map((item) => Number(item.properties.Date.date.start.split('-')[2]));
    return numberArray;
}
