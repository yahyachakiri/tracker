import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';

import { pieChart, checkValidDate, ErrorFromApi } from '@utils/index';
import { IPage } from '@interfaces/index';
import { verifyToken } from '@middlewares';

const notion: Client = new Client({
    auth: process.env.NOTION_TOKEN,
});

let database = process.env.NOTION_DATABASE_TWO as string;

type IResponse = any;

async function getDatabaseDataWithParam({ res, from, to, value }: { res: IResponse; from: string; to: string; value: string }) {
    let data: IPage[] = [];
    let cursorState = false;

    if (from && !checkValidDate(from)) {
        res.status(404).json(new ErrorFromApi(from + ' is not a valid date, please choose a valid date', 404));
    }

    if (to && !checkValidDate(to)) {
        res.status(404).json(new ErrorFromApi(to + ' is not a valid date, please choose a valid date', 404));
    }

    try {
        do {
            var response: QueryDatabaseResponse | any = await notion.databases.query({
                database_id: database,
                ...(cursorState && { start_cursor: response.next_cursor }),
                filter: {
                    and: [
                        {
                            property: 'Date',
                            date: {
                                ...(from && { on_or_after: from }),
                                is_not_empty: true,
                            },
                        },
                        {
                            property: 'Date',
                            date: {
                                ...(to && { on_or_before: to }),
                                is_not_empty: true,
                            },
                        },
                        {
                            property: value,
                            checkbox: {
                                equals: true,
                            },
                        },
                    ],
                },
                sorts: [
                    {
                        property: 'Date',
                        direction: 'ascending',
                    },
                ],
            });
            response.results.map((result: any) => (data = data.concat({ id: result.id, properties: result.properties })));
            cursorState = true;
        } while (response.has_more);
        let initialDate = data[0]?.properties.Date?.date?.start;
        let finalDate: string | number = Date.now();
        if (from) initialDate = from;
        if (to) finalDate = to;
        if (res.statusCode == 200) res.status(200).json({ percentage: pieChart(data, initialDate, finalDate) });
    } catch (error) {
        console.log(error);
        res.status(404).json(error);
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // let logged = false;
    // await verifyToken(req, res).then((res) => {
    //     if (res) {
    //         logged = true;
    //     }
    // });
    // if (!logged) return;

    const to: any = req.query.to;
    const from: any = req.query.from;
    const value: any = req.query.value;

    await getDatabaseDataWithParam({ value, res, from, to });
}
