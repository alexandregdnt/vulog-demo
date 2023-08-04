'use client';

import {useEffect} from "react";
import {redirect} from "next/navigation";
import {useUser} from "@components/context/UserProvider";

export default function Logout() {
    const { setToken } = useUser();

    useEffect(() => {
        // sessionStorage.clear();
        setToken(null);
        redirect('/auth/login');
    }, []);

    return <></>;
}
