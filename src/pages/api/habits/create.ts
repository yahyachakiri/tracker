import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';
import { CreatePageResponse, QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';

import { ISODate } from '@utils/index';
import { IPage } from '@interfaces/index';
import { verifyToken } from '@middlewares';

const notion: Client = new Client({
    auth: process.env.NOTION_TOKEN,
});

let database = process.env.NOTION_DATABASE_TWO as string;

async function createPage(date: string, res: NextApiResponse) {
    let yesterdayDate = new Date();
    if (date) {
        yesterdayDate = new Date(date);
    }

    yesterdayDate.setDate(yesterdayDate.getDate() - 1);

    var habits: QueryDatabaseResponse | any = await notion.databases.query({
        database_id: database,
        filter: {
            property: 'Date',
            date: {
                on_or_after: ISODate(yesterdayDate),
            },
        },
    });

    const response: CreatePageResponse = await notion.pages.create({
        parent: {
            type: 'database_id',
            database_id: database,
        },
        icon: {
            emoji: '✅',
        },
        properties: {
            Title: {
                title: [
                    {
                        text: {
                            content: 'Daily Habits',
                        },
                    },
                ],
            },
            Date: {
                date: {
                    start: date,
                },
            },
            Weight: {
                number: habits.results[0]?.properties?.Weight?.number || null,
            },
        },
    });
    const page = {
        id: response.id,
        properties: (response as unknown as IPage).properties,
    };
    res.status(200).json(page);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // let logged = false;
    // await verifyToken(req, res).then((res) => {
    //     if (res) {
    //         logged = true;
    //     }
    // });
    // if (!logged) return;
    const date = req.query.date;
    await createPage(date as string, res);
}
