import { createContext } from 'react';

import { IPage } from '@interfaces/index';

let data: IPage[] = [];

const DataContext = createContext(data);

export default DataContext;
