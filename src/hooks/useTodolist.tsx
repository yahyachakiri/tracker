import { TodolistContext } from '@/context';
import { useContext } from 'react';

function useTodolist() {
    return useContext(TodolistContext);
}
export default useTodolist;
