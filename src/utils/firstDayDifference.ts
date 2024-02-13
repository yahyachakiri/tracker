export default function firstDayDifference(year: number, date: string): number {
    const initialDate = new Date(year + '-01-01');
    const firstDate = new Date(date);
    const diff = new Date(firstDate.getTime() - initialDate.getTime());
    return diff.getUTCDate() - 1;
}
