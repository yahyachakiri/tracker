import { NextApiResponse } from 'next';

export default function resError(res: NextApiResponse, message: string) {
    res.status(404).json({ message, status: 404 });
}
