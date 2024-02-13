import { Dispatch, SetStateAction } from 'react';

export default async function fetchClick(
    setLoading: Dispatch<SetStateAction<boolean>>,
    setData: Dispatch<SetStateAction<{}>>,
    url: string
) {
    setLoading(true);
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        const result = await response.json();

        console.log('result is: ', JSON.stringify(result, null, 4));

        setData(result);
    } catch (err) {
        console.log(err);
    } finally {
        setLoading(false);
    }
}
