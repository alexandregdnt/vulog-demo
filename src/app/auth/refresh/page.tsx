'use client';

import {useEffect} from "react";
import {redirect, useRouter} from "next/navigation";
import {verifyToken} from "@/utils/helpers";
import {useUser} from "@components/context/UserProvider";

export default function Refresh() {
    const router = useRouter();
    const { token, setToken } = useUser();

    useEffect(() => {
        // const token = sessionStorage.getItem('token');

        if (token) {
            // const jsonToken = JSON.parse(token);

            switch (verifyToken(token)) {
                case 0:
                    try {
                        const data = new URLSearchParams({
                            refresh_token: token.refresh_token
                        });
                        fetch(`/api/refresh`, {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                Accept: 'application/json, text/plain, */*',
                            },
                            body: data
                        })
                            .then(async (res) => {
                                // sessionStorage.setItem('token', JSON.stringify(await res.json()));
                                setToken(await res.json());
                                router.push('/dashboard');
                            });
                    } catch (error: any) {
                        console.error(error.message);
                    }
                    break;
                case 1:
                    redirect('/dashboard');
                    break;
                default:
                    redirect('/auth/logout');
            }
        } else {
            redirect('/auth/login');
        }
    });

    return <></>;
}
