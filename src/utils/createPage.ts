import { IPage } from '@interfaces/index';
import axios from 'axios';

const createPage = async (updateHabits: (e: IPage) => void, date: string, updateLading: (e: boolean) => void): Promise<void> => {
    await axios
        .get(`/api/habits/create?date=${date}`)
        .then((res) => {
            updateLading(false);
            updateHabits(res.data);
        })
        .catch((err) => {
            updateLading(false);
            console.log(err);
        });
};

export default createPage;
