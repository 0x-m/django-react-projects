
import { Sidebar } from './sidebar';
import { SearchBar } from './searchbar'
import { Notes } from '../notes';
import { Tags } from '../tags';
import { Profile } from '../profile';
import { Outlet, Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../api';
import { useEffect, useState } from 'react';



export default function Dashboard(props) {

    // useEffect(() => {
    //     const res = isAuthenticated();
    //     console.log(res, 'res....')
    //     setAuthenticated(res);
    // }, [authenticated]);

    if (isAuthenticated()) {
        return (
            <main className="relative bg-slate-50 flex h-screen w-full">
                <Sidebar />
                <section className="basis-full md:basis-5/6 bg-slate-50 overflow-auto">
                    <SearchBar avatar="https://i.pravatar.cc/300" username="mohammad" />
                    <section className='mt-4'>
                        <Outlet />
                    </section>
                </section>

            </main>
        );
    }
    else {
        return <Navigate to="/login" replace={true} />
    }

}