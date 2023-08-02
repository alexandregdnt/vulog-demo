import {TokenObj} from "@/vulog/auth";

export function jsonConcat(o1: any, o2: any) {
    for (let key in o2) {
        o1[key] = o2[key];
    }
    return o1;
}

export function verifyToken(strObj: string | null): -1 | 0 | 1 {
    if (strObj) {
        const obj: TokenObj = JSON.parse(strObj);
        // console.log('obj', obj);

        if (obj.access_token && obj.fetch_timestamp + obj.expires_in > new Date().getTime())
            return 1;

        if (obj.refresh_token && obj.fetch_timestamp + obj.refresh_expires_in > new Date().getTime())
            return 0;
    }

    return -1;
}
