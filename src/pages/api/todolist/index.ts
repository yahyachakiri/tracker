import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';

import { IPage } from '@interfaces/index';
import { ErrorFromApi, checkValidDate } from '@utils/index';
import { verifyToken } from '@middlewares';

const notion: Client = new Client({
    auth: process.env.NOTION_TOKEN,
});

let database = process.env.NOTION_DATABASE_ONE as string;

interface params {
    res: any;
    date?: string;
    type: string;
}

async function getDatabaseDataWithParam({ res, date, type }: params) {
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
                                ...(date && { on_or_before: date }),
                                is_not_empty: true,
                            },
                        },

                        {
                            property: 'Deadline',
                            date: {
                                ...(date && { on_or_after: date }),
                                is_not_empty: true,
                            },
                        },

                        ...(type
                            ? [
                                  {
                                      property: 'Type',
                                      select: {
                                          equals: type,
                                      },
                                  },
                              ]
                            : []),
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

    const date = req.query.date;
    let type = req.query.type;
    if (date && !checkValidDate(date)) {
        res.status(404).json(new ErrorFromApi(date + ' is not a valid date, please choose a valid date', 404));
    }

    await getDatabaseDataWithParam({ res, date, type });
}
