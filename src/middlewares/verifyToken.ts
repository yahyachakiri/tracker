import type { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';

export const verifyToken = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    verify(token!.split(' ')[1], process.env.JWT_SECRET!, (err: any) => {
        if (err) {
            console.log('err', err);
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
    });
    return true;
};
