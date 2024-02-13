export default function minutesToHours(minutes: number | null): {
    minutes: number | null;
    hours: number | null;
} {
    if (minutes == null)
        return {
            minutes: null,
            hours: null,
        };
    if (minutes < 60) return { hours: 0, minutes };
    else {
        return {
            minutes: Math.trunc(minutes % 60),
            hours: Math.trunc(minutes / 60),
        };
    }
}
