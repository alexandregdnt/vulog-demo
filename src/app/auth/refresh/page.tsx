'use client';

import {useEffect} from "react";
import {redirect, useRouter} from "next/navigation";
import {verifyToken} from "@/utils/helpers";

export default function Refresh() {
    const router = useRouter();

    useEffect(() => {
        const token = sessionStorage.getItem('token');

        if (token) {
            const jsonToken = JSON.parse(token);

            switch (verifyToken(sessionStorage.getItem('token'))) {
                case 0:
                    try {
                        const data = new URLSearchParams({
                            refresh_token: jsonToken.refresh_token
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
                                sessionStorage.setItem('token', JSON.stringify(await res.json()));
                                router.push('/');
                            });
                    } catch (error: any) {
                        console.error(error.message);
                    }
                    break;
                case 1:
                    redirect('/');
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
