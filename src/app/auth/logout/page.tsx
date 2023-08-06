'use client';

import {useEffect} from "react";
import {redirect} from "next/navigation";
import {useUser} from "@components/context/UserProvider";

export default function Logout() {
    const { setToken, setUser } = useUser();

    useEffect(() => {
        sessionStorage.clear();
        setToken(null);
        setUser(null);
        redirect('/auth/login');
    }, []);

    return <></>;
}
