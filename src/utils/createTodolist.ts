import axios from 'axios';

import { ITodolist } from '@interfaces/index';

const createTodolist = async (updateTodolistTask: (e: ITodolist) => void, type: string | undefined, updateLading: (e: boolean) => void) => {
    await axios
        .get(`/api/todolist/create?type=${type ? type : ''}`)
        .then((res) => {
            updateLading(false);
            updateTodolistTask(res.data);
        })
        .catch((err) => {
            updateLading(false);
            console.log(err);
        });
};

export default createTodolist;
