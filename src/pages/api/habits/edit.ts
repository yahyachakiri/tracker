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
    work: string | string[] | undefined;
    weight: string | string[] | undefined;
    fajr: string | string[] | undefined;
    quran: string | string[] | undefined;
    exercise: string | string[] | undefined;
    macros: string | string[] | undefined;
}

async function editPage({ res, id, work, weight, fajr, quran, exercise, macros }: params) {
    const pageId = id;
    if (!pageId) resError(res, 'Please enter a valid id');
    if (work && typeof work == 'string' && !parseInt(work) && work != 'null' && work != '0')
        resError(res, 'Please enter a valid work value');
    if (fajr && fajr != '0' && fajr != '1') resError(res, 'Please enter a valid fajr value');
    if (quran && quran != '0' && quran != '1') resError(res, 'Please enter a valid quran value');
    if (exercise && exercise != '0' && exercise != '1') resError(res, 'Please enter a valid exercise value');
    if (macros && macros != '0' && macros != '1') resError(res, 'Please enter a valid macros value');
    const response = await notion.pages.update({
        page_id: pageId,
        properties: {
            ...(work &&
                typeof work == 'string' &&
                work !== null && {
                    Work: {
                        number: parseInt(work),
                    },
                }),
            ...(work &&
                typeof work == 'string' &&
                work == 'null' && {
                    Work: {
                        number: null,
                    },
                }),

            ...(weight &&
                typeof weight == 'string' && {
                    Weight: {
                        number: parseInt(weight),
                    },
                }),

            ...(fajr &&
                fajr == '1' && {
                    Fajr: {
                        checkbox: true,
                    },
                }),
            ...(fajr &&
                fajr == '0' && {
                    Fajr: {
                        checkbox: false,
                    },
                }),

            ...(quran &&
                quran == '1' && {
                    Quran: {
                        checkbox: true,
                    },
                }),
            ...(quran &&
                quran == '0' && {
                    Quran: {
                        checkbox: false,
                    },
                }),

            ...(exercise &&
                exercise == '1' && {
                    Exercise: {
                        checkbox: true,
                    },
                }),
            ...(exercise &&
                exercise == '0' && {
                    Exercise: {
                        checkbox: false,
                    },
                }),

            ...(macros &&
                macros == '1' && {
                    Macros: {
                        checkbox: true,
                    },
                }),
            ...(macros &&
                macros == '0' && {
                    Macros: {
                        checkbox: false,
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
    const work = req.query.work;
    const weight = req.query.weight;
    const fajr = req.query.fajr;
    const quran = req.query.quran;
    const exercise = req.query.exercise;
    const macros = req.query.macros;
    await editPage({ res, id, work, weight, fajr, quran, exercise, macros });
}
