import { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { authOptions } from './api/auth/test';
// @ts-ignore
import { getServerSession } from 'next-auth';

import { ToDoList } from '@cards/index';
import { NavBar, TopBar } from '@bar/index';
import { ITodolist } from '@interfaces/index';
import { TodolistContext } from '@/context/index';
import { ISOToday } from '@utils/index';

interface props {
    todolistData: ITodolist[];
}

export default function ToDoListPage({ todolistData }: props) {
    const [emailUnread] = useState(false);
    const [calendarUnread] = useState(false);
    console.log(todolistData);
    return (
        <TodolistContext.Provider value={todolistData}>
            <NavBar emailUnread={emailUnread} calendarUnread={calendarUnread} />
            <main className="sm:pl-40 p-5 pb-20 sm:p-10">
                <div className="mb-3 sm:mb-11 flex items-start justify-end">
                    <TopBar emailUnread={emailUnread} calendarUnread={calendarUnread} />
                </div>
                <div className="grid sm:grid-cols-2 auto-cols-fr gap-4 sm:gap-7">
                    <ToDoList todolistType="Day" time="specific" className="col-span-1/2" />
                    <ToDoList todolistType="Week" time="specific" className="col-span-1/2" />
                    <ToDoList todolistType="Weekend" time="specific" className="col-span-1/2" />
                    <ToDoList todolistType="Month" time="specific" className="col-span-1/2" />
                </div>
            </main>
        </TodolistContext.Provider>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (!session) {
        return { redirect: { destination: '/signin' } };
    }
    const fetchTodolistData = await fetch(`http://localhost:3000/api/todolist?date=${ISOToday()}`);
    const todolistData: ITodolist[] = await fetchTodolistData.json();
    return {
        props: { todolistData },
    };
}
