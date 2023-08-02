'use client';

import {useEffect, useState} from "react";

export default function Profile() {
    const [user, setUser] = useState();

    useEffect(() => {
        handleGetCurentUser();
    }, []);

    const handleGetCurentUser = () => {
        const token = sessionStorage.getItem('token') as string;
        const accessToken = JSON.parse(token)?.access_token;

        if (!accessToken) {
            console.error('Access token not found in sessionStorage');
            return;
        }

        // Append the access token as a query parameter in the URL
        const url = `/api/users?access_token=${encodeURIComponent(accessToken)}`;

        // Call api next /api/user GET
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Handle the response data
                setUser(data);
            })
            .catch((error) => {
                // Handle any errors that occurred during the fetch
                console.error('Error fetching data:', error);
            });
    };

    return (
      <div>
          {JSON.stringify(user)}
      </div>
    );
}
