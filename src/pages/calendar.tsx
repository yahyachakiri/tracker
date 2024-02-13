import { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { authOptions } from './api/auth/test';
// @ts-ignore
import { getServerSession } from 'next-auth';

import { Calendar } from '@cards/index';
import { NavBar, TopBar } from '@bar/index';

export default function CalendarPage() {
    const [emailUnread] = useState(false);
    const [calendarUnread] = useState(false);

    return (
        <>
            <NavBar emailUnread={emailUnread} calendarUnread={calendarUnread} />
            <main className="sm:pl-40 p-5 pb-20 sm:p-10">
                <div className="mb-3 sm:mb-11 flex items-start justify-end">
                    <TopBar emailUnread={emailUnread} calendarUnread={calendarUnread} />
                </div>
                <Calendar time="specific" />
            </main>
        </>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (!session) {
        return { redirect: { destination: '/signin' } };
    }
    return {};
}
