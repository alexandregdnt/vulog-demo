export async function createToken(username: string, password: string) {
    const data = new URLSearchParams({
        username: username,
        password: password,
        client_secret: process.env.VULOG_CLIENT_SECRET as string,
        client_id: process.env.VULOG_CLIENT_ID as string,
        securityOptions: 'SSL_OP_NO_SSLv3',
        grant_type: 'password'
    });

    const res = await fetch(`${process.env.VULOG_HOST}/auth/realms/${process.env.VULOG_FLEET_ID}/protocol/openid-connect/token`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json, text/plain, */*',
        },
        body: data,
    });

    // store the token in the session
    sessionStorage.setItem('token', JSON.stringify(await res.json()));

    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
    return await res.json();
}

export async function refreshToken() {
    const refreshToken = JSON.parse(sessionStorage.getItem('token') as string).refresh_token;

    const data = new URLSearchParams({
        refresh_token: refreshToken,
        client_secret: process.env.VULOG_CLIENT_SECRET as string,
        client_id: process.env.VULOG_CLIENT_ID as string,
        securityOptions: 'SSL_OP_NO_SSLv3',
        grant_type: 'refresh_token'
    });

    const res = await fetch(`${process.env.VULOG_HOST}/auth/realms/${process.env.VULOG_FLEET_ID}/protocol/openid-connect/token`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json, text/plain, */*',
        },
        body: data,
    });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
    return await res.json();
}
