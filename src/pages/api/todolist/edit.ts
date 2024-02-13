import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

import { resError } from '@utils/index';
import { verifyToken } from '@middlewares';

const notion: Client = new Client({
    auth: process.env.NOTION_TOKEN,
});

interface params {
    res: NextApiResponse;
    id: string;
    name: string;
    priority: string;
    done: string;
}

async function editTodolist({ res, id, name, priority, done }: params) {
    const pageId = id;
    if (!pageId) resError(res, 'Please enter a valid id');
    if (!name) resError(res, 'Please enter a valid name');

    const response = await notion.pages.update({
        page_id: pageId,
        properties: {
            Name: {
                title: [
                    {
                        text: {
                            content: name,
                        },
                    },
                ],
            },
            ...(done &&
                done == 'true' && {
                    Done: {
                        checkbox: true,
                    },
                }),
            ...(done &&
                done == 'false' && {
                    Done: {
                        checkbox: false,
                    },
                }),
            ...(priority &&
                priority != 'null' && {
                    Priority: {
                        select: {
                            name: priority,
                        },
                    },
                }),
            ...(priority &&
                priority == 'null' && {
                    Priority: {
                        select: null,
                    },
                }),
        },
    });
    res.status(200).json(response);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // let logged = false;
    // await verifyToken(req, res).then((res) => {
    //     if (res) {
    //         logged = true;
    //     }
    // });
    // if (!logged) return;

    const id = req.query.id as string;
    const name = req.query.name as string;
    const priority = req.query.priority as string;
    const done = req.query.done as string;
    await editTodolist({ res, id, name, priority, done });
}
