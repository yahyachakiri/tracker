import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import httpStatusCodes from 'http-status-codes';

import { generateToken } from '@utils/index';
import { MyError } from '@interfaces/index';

async function login(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.json(new MyError('Email or password is incorrect', httpStatusCodes.BAD_REQUEST));

        const isPasswordValid = await bcrypt.compare(password, '$2a$07$I18TSUY7UIA2X0QbXGOjtej9t4jWTBvSrIumLx6TryWKFfuXwXoU.' as string);

        if (!isPasswordValid || email != process.env.USER_EMAIL)
            return res.json(new MyError('Email or password is incorrect', httpStatusCodes.BAD_REQUEST));

        const { accessToken, refreshToken } = generateToken({});
        res.json({
            data: {
                accessToken,
                refreshToken,
            },
            success: true,
            status: 200,
        });
    } catch (error) {
        return res.json(new MyError('error', httpStatusCodes.BAD_REQUEST));
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await login(req, res);
}
