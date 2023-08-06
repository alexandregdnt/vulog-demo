import {AgeLimitation, extraConfiguration} from "../../data/extra.config";
import {Token} from "@/vulog/auth";
import {User} from "@/vulog/users";
import {Product} from "@/vulog/products";
import {ProductWithServices} from "@/pages/api/products/all";
import {SystemCreditsPackage} from "@/vulog/systemCredits";
import {Service} from "@/vulog/services";

export function jsonConcat(o1: any, o2: any) {
    for (let key in o2) {
        o1[key] = o2[key];
    }
    return o1;
}

export function verifyToken(obj: Token | null): -1 | 0 | 1 {
    if (obj) {
        // const obj: Token = JSON.parse(strObj);
        // console.log('obj', obj);

        if (obj.access_token && obj.fetch_timestamp + obj.expires_in > new Date().getTime())
            return 1;

        if (obj.refresh_token && obj.fetch_timestamp + obj.refresh_expires_in > new Date().getTime())
            return 0;
    }

    return -1;
}

export function filterAvailablePackages(packages: SystemCreditsPackage[], user: User): (SystemCreditsPackage & { ageLimit?: AgeLimitation })[] {
    const ageLimitations = extraConfiguration.ageLimitations;

    return packages.filter(packageItem => {
        const hasServiceId = user.profiles.some(userProfile =>
            userProfile.entity.services?.some(userService =>
                packageItem.serviceIds.includes(userService.id)
            )
        );
        if (!hasServiceId) return false;

        const hasAgeLimit = ageLimitations.some(ageLimit =>
            ageLimit.packagesIds.includes(packageItem.id) && !checkAgeLimitation(ageLimit, user)
        );
        if (hasAgeLimit) return false;

        return true; // Include the package if it doesn't match any age limitation or the user meets the age limitation
    }).map(packageItem => {
        const ageLimitForPackage = ageLimitations.find(ageLimit =>
            ageLimit.packagesIds.includes(packageItem.id)
        );

        return {
            ...packageItem,
            ageLimit: ageLimitForPackage
        };
    });
}

function checkAgeLimitation(ageLimit: AgeLimitation, user: User): boolean {
    const ageDifference = new Date().getTime() - new Date(user.birthDate).getTime();
    const ageYears = ageDifference / (365 * 24 * 60 * 60 * 1000);
    console.log('user age', ageYears);

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
