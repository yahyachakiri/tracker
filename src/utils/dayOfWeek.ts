export default function dayOfWeek(date: string | Date): string | null {
    let day: number;
    if (typeof date == 'string') {
        day = new Date(date).getDay();
    } else {
        day = date.getDay();
    }
    switch (day) {
        case 0:
            return 'Sun';
        case 1:
            return 'Mon';
        case 2:
            return 'Tue';
        case 3:
            return 'Wed';
        case 4:
            return 'Thu';
        case 5:
            return 'Fri';
        case 6:
            return 'Sat';
        default:
            return null;
    }
}
