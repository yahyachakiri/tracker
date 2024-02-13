import { createContext } from 'react';

import { ITodolist } from '@interfaces/index';

let data: ITodolist[] = [];

const TodolistContext = createContext(data);

export default TodolistContext;
