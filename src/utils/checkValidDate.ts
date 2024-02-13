export default function checkValidDate(date: string): boolean {
    const regex = /\d{4}-\d{2}-\d{2}/;
    if (isNaN(Date.parse(date)) || !regex.test(date) || date.length == 11) return false;
    return true;
}
