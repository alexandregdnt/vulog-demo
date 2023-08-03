import extraConfig, {AgeLimitation} from "../../data/extra.config";
import {TokenObj} from "@/vulog/auth";
import {User} from "@/vulog/users";
import {SystemCreditsPackage} from "@/vulog/systemCredits";

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

export function filterAvailablePackages(packages: SystemCreditsPackage[], user: User): SystemCreditsPackage[] {
    return packages.filter(packageItem => {
        const ageLimitations = extraConfig.ageLimitations;

        for (const ageLimit of ageLimitations) {
            if (checkAgeLimitation(ageLimit, user)) {
                return ageLimit.packagesIds.includes(packageItem.id);
            }
        }

        return false;
    });
}

function checkAgeLimitation(ageLimit: AgeLimitation, user: User): boolean {
    const ageDifference = new Date().getTime() - user.birthDate.getTime();
    const ageYears = ageDifference / (365 * 24 * 60 * 60 * 1000);

    switch (ageLimit.operator) {
        case '==':
            return ageYears === ageLimit.age;
        case '>':
            return ageYears > ageLimit.age;
        case '<':
            return ageYears < ageLimit.age;
        case '>=':
            return ageYears >= ageLimit.age;
        case '<=':
            return ageYears <= ageLimit.age;
        default:
            return false;
    }
}
