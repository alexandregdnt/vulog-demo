export function jsonConcat(o1: any, o2: any) {
    for (let key in o2) {
        o1[key] = o2[key];
    }
    return o1;
}
