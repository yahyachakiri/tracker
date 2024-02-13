import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';

import { ErrorFromApi, checkValidDate, minutesToHours } from '@utils/index';
import { verifyToken } from '@middlewares';

const notion: Client = new Client({
    auth: process.env.NOTION_TOKEN,
});

let database = process.env.NOTION_DATABASE_TWO as string;

type IResponse = any;

let average: number;
let counter: number;

async function getDatabaseDataWithParam({ res, from, to }: { res: IResponse; from: string | undefined; to: string | undefined }) {
    let cursorState = false;

    try {
        average = 0;
        counter = 0;
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
                    ],
                },
                sorts: [
                    {
                        property: 'Date',
                        direction: 'ascending',
                    },
                ],
            });
            response.results.map((result: any) => {
                average += result.properties.Work.number;
                counter++;
            });
            cursorState = true;
        } while (response.has_more);

        res.status(200).json({ average: minutesToHours(average / counter) });
    } catch (error) {
        console.log(error);
        res.status(404).json(error);
    }
}

export default async function handler(req: NextApiRequest | any, res: NextApiResponse) {
    // let logged = false;
    // await verifyToken(req, res).then((res) => {
    //     if (res) {
    //         logged = true;
    //     }
    // });
    // if (!logged) return;

    const to = req.query.to;
    const from = req.query.from;
    if (from && !checkValidDate(from)) {
        res.status(404).json(new ErrorFromApi(from + ' is not a valid date, please choose a valid date', 404));
    }

    if (to && !checkValidDate(to)) {
        res.status(404).json(new ErrorFromApi(to + ' is not a valid date, please choose a valid date', 404));
    }
    await getDatabaseDataWithParam({ res, from, to });
}
