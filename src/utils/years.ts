import { IPage } from '@interfaces/index';

export default function years(array: IPage[]): number[] {
    return array.map((item) => Number(item.properties.Date.date.start.split('-')[0]));
}
