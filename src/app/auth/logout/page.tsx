'use client';

import {useEffect} from "react";
import {redirect} from "next/navigation";

export default function Logout() {
    useEffect(() => {
        sessionStorage.clear();
        redirect('/auth/login');
    }, []);

    return <></>;
}
