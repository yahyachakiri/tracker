import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';
import { CreatePageResponse } from '@notionhq/client/build/src/api-endpoints';

import { ISOToday, todolistEndDate } from '@utils/index';
import { ITodolist } from '@interfaces/index';
import { verifyToken } from '@middlewares';

const notion: Client = new Client({
    auth: process.env.NOTION_TOKEN,
});

let database = process.env.NOTION_DATABASE_ONE as string;

const todolistType = (type: string) => {
    if (type == 'Month' || type == 'Week' || type == 'Weekend') return type;
    return 'Day';
};

// let date = new Date();
// let lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
// let nextSunday = new Date(new Date().setDate(date.getDate() + ((0 - 1 - date.getDay() + 7) % 7) + 1));
// if (new Date().getDay() == 0) {
//     nextSunday = new Date();
// }
// let nextFriday = new Date(new Date().setDate(date.getDate() + ((5 - 1 - date.getDay() + 7) % 7) + 1));
// console.log(nextFriday);
// if (new Date().getDay() == 5) {
//     nextFriday = new Date();
// }

// const todolistStartDate = (type: string) => {
//     if (type == 'Weekend') return ISODate(nextSaturday);
//     return ISODate(new Date());
// };
// const todolistEndDate = (type: string) => {
//     if (type == 'Month') return ISODate(lastDayOfMonth);
//     if (type == 'Week') return ISODate(nextFriday);
//     if (type == 'Weekend') return ISODate(nextSunday);
//     return ISOToday();
// };

async function createTodolist(type: string, res: NextApiResponse) {
    const response: CreatePageResponse = await notion.pages.create({
        parent: {
            type: 'database_id',
            database_id: database,
        },
        properties: {
            Name: {
                title: [
                    {
                        text: {
                            content: '',
                        },
                    },
                ],
            },
            Date: {
                date: {
                    start: ISOToday(),
                },
            },
            Type: {
                select: {
                    name: todolistType(type),
                },
            },
            Deadline: {
                date: {
                    start: todolistEndDate(type),
                },
            },
        },
    });
    const page = {
        id: response.id,
        properties: (response as unknown as ITodolist).properties,
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

    const type = req.query.type;

    await createTodolist(type as string, res);
}
