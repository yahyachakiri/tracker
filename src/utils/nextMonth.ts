import { NextApiResponse } from 'next';
import ErrorFromApi from './ErrorFromApi';

export default function nextMonth(
    yearMonth: string,
    res: NextApiResponse
): {
    month: string;
    year: string;
    nextMonth: string;
    nextYear: string;
} {
    let year: string = yearMonth.split('-')[0];
    let month: string = yearMonth.split('-')[1];
    let nextMonth: string = '';
    let nextYear: string = year;

    if (
        month.length != 2 ||
        year.length != 4 ||
        Number(month) < 1 ||
        Number(month) > 12 ||
        !month ||
        !year ||
        isNaN(Number(month)) ||
        isNaN(Number(month)) ||
        isNaN(Number(year))
    )
        res.status(404).json(new ErrorFromApi('Choose a valid year', 404));
    if (Number(month) == 12) {
        nextYear = String(Number(year) + 1);
        nextMonth = '01';
    } else nextMonth = String(Number(month) + 1);
    if (Number(month) < 10) nextMonth = `0${Number(month) + 1}`;
    return {
        month,
        year,
        nextMonth,
        nextYear,
    };
}
