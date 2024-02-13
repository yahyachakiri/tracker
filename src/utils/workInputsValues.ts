import twoDigits from './twoDigits';

export default function workInputsValues(time: number | string | null): string {
    if (time == null || time == '') return '';
    if (time == 0) return '00';
    return twoDigits(time);
}
