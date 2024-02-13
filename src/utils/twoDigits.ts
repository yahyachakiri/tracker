export default function twoDigits(num: number | string): string {
    return !String(num)[1] ? '0' + num : String(num);
}
