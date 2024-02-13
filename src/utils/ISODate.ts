export default function ISODate(date: Date): string {
    return date.toISOString().split('T')[0];
}
