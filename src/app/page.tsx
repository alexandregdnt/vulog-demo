'use client';

import {useEffect} from "react";
import {redirect} from "next/navigation";
import {useUser} from "@components/context/UserProvider";

export default function Home() {
    const {token} = useUser();

    useEffect(() => {
        if (!token) redirect('/auth/login');
        redirect('/dashboard')
    }, [token]);
}
