import { IAvgData, IChartData, IPage } from '@interfaces/index';

export default function workData(data: IPage[] | IAvgData[]) {
    let workData: IChartData[] = [];
    data.map((e: IPage | IAvgData) => {
        if (e.properties.Work && e.properties.Work.number !== null)
            workData.push({ label: e.properties.Date.date.start, value: e.properties.Work.number });
    });
    return workData;
}
