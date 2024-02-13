import { IPage } from '@interfaces/index';

export default function monthsOfAYear(array: IPage[], year: number): number[] {
    array = array.filter((item) => Number(item.properties.Date.date.start.split('-')[0]) === year);
    let numberArray: number[] = array.map((item) => Number(item.properties.Date.date.start.split('-')[1]));
    return numberArray;
}
