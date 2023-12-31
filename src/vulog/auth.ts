export type Token = {
    access_token: string;
    expires_in: number;
    fetch_timestamp: number;
    refresh_expires_in: number;
    refresh_token: string;
    token_type: "bearer";
}

export async function createToken(username: string, password: string): Promise<Token> {
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

    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
    return await res.json();
}

export async function refreshToken(refreshToken: string): Promise<Token> {
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


