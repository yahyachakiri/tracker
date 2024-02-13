import { ISOToday, ISODate } from '@utils/index';

export default function todolistEndDate(type: string): string {
    let date = new Date();

    let lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let nextSunday = new Date(new Date().setDate(date.getDate() + ((0 - 1 - date.getDay() + 7) % 7) + 1));
    if (date.getDay() == 0) {
        nextSunday = date;
    }
    let nextFriday = new Date(new Date().setDate(date.getDate() + ((5 - 1 - date.getDay() + 7) % 7) + 1));
    if (date.getDay() == 5) {
        nextFriday = date;
    }

    console.log(nextFriday);

    switch (type) {
        case 'Month':
            return ISODate(lastDayOfMonth);
        case 'Week':
            return ISODate(nextFriday);
        case 'Weekend':
            return ISODate(nextSunday);
        default:
            return ISOToday();
    }
}
