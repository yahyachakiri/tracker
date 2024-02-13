import { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
// @ts-ignore
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/test';

import { Work, WorkCounter } from '@cards/index';
import { NavBar, TopBar } from '@bar/index';
import { IPage } from '@interfaces/index';
import { DataContext } from '@/context/index';

interface props {
    data: IPage[];
}

export default function WorkPage({ data }: props) {
    const [emailUnread] = useState(false);
    const [calendarUnread] = useState(false);

    return (
        <DataContext.Provider value={data}>
            <NavBar emailUnread={emailUnread} calendarUnread={calendarUnread} />
            <main className="sm:pl-40 p-5 pb-20 sm:p-10">
                <div className="mb-3 sm:mb-11 flex items-start justify-end">
                    <TopBar emailUnread={emailUnread} calendarUnread={calendarUnread} />
                </div>
                <div className="flex flex-col gap-4">
                    <WorkCounter />
                    <Work time="range" />
                </div>
            </main>
        </DataContext.Provider>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (!session) {
        return { redirect: { destination: '/signin' } };
    }

    let date = new Date();
    date.setDate(date.getDate() - 7);
    const week = date.toISOString().split('T')[0];
    const fetchData = await fetch(`http://localhost:3000/api/work?from=${week}`);
    const data: IPage[] = await fetchData.json();
    return {
        props: { data },
    };
}
