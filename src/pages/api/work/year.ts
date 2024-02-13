import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';

import { IPage } from '@interfaces/index';
import { ErrorFromApi } from '@utils/index';
import { verifyToken } from '@middlewares';

const notion: Client = new Client({
    auth: process.env.NOTION_TOKEN,
});

let database = process.env.NOTION_DATABASE_TWO as string;

type IResponse = any;

async function getDatabaseDataWithParam({ res, date }: { res: IResponse; date: string }) {
    let data: IPage[] = [];
    let cursorState = false;

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
                                ...(date && { on_or_after: `${date}-01-01` }),
                                is_not_empty: true,
                            },
                        },
                        {
                            property: 'Date',
                            date: {
                                ...(date && {
                                    on_or_before: `${date}-12-31`,
                                }),
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
            response.results.map((result: any) => (data = data.concat({ id: result.id, properties: result.properties })));
            cursorState = true;
        } while (response.has_more);

        res.status(200).json(data);
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

    const date: string = req.query.date;
    if (!date || isNaN(Number(date)) || date.length < 4) res.status(404).json(new ErrorFromApi('Choose a valid year', 404));
    await getDatabaseDataWithParam({ res, date });
}
