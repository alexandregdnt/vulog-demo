export async function createToken(username: string, password: string) {
    const data = {
        username,
        password,
        client_secret: process.env.VULOG_CLIENT_SECRET,
        client_id: process.env.VULOG_CLIENT_ID,
        securityOptions: 'SSL_OP_NO_SSLv3',
        grant_type: 'password'
    }

    const res = await fetch(`${process.env.VULOG_HOST}/auth/realms/${process.env.VULOG_FLEET_ID}/protocol/openid-connect/token`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            accept: "*/*",
        },
        body: JSON.stringify(data),
    });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
    return await res.json();
}
