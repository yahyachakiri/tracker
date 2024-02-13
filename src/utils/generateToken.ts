import { sign } from 'jsonwebtoken';

const generateToken = (payload: any) => {
    const accessToken = sign(payload, process.env.JWT_SECRET!, { expiresIn: '30m' });
    const refreshToken = sign(payload, process.env.JWT_SECRET!, { expiresIn: '7d' });
    return {
        accessToken,
        refreshToken,
    };
};

export default generateToken;
