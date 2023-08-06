'use client';

import {useEffect} from "react";
import {redirect} from "next/navigation";

export default function Dashboard() {
    useEffect(() => {
        redirect('/dashboard/profile');
    })

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}
