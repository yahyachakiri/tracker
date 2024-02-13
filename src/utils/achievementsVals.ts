import { IPage } from '@interfaces/index';

export default function achievementsVals(data: IPage[]) {
    let fajr: number = 0;
    let quran: number = 0;
    let exercise: number = 0;
    let macros: number = 0;
    data.map((e: IPage) => {
        if (e.properties.Fajr.checkbox) fajr++;
        if (e.properties.Quran.checkbox) quran++;
        if (e.properties.Exercise.checkbox) exercise++;
        if (e.properties.Macros.checkbox) macros++;
    });
    return {
        fajr: (fajr / data.length) * 100,
        quran: (quran / data.length) * 100,
        exercise: (exercise / data.length) * 100,
        macros: (macros / data.length) * 100,
    };
}
