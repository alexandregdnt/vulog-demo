export type User = {
    id: string;
    fleetId: string;
    userName: string;
    lastName: string;
    firstName: string;
    middleName?: string;
    preferredName?: string;
    accountStatus: 'APPROVED' | 'SUSPENDED' | 'ARCHIVED' | 'INACTIVE';
    gender: 'MALE' | 'FEMALE' | 'UNDEFINED';
    locale: string;
    registrationDate: Date;
    birthDate: Date;
    nationality: string;
    membershipNumber: string;
    notes?: string;
    address: Address;
    dataPrivacyConsent: boolean;
    dataPrivacyConsentUpdateDate: Date;
    profilingConsent: boolean;
    profilingConsentUpdateDate: Date;
    marketingConsent: boolean;
    marketingConsentUpdateDate: boolean;
    dateOfAgreements: Date;
    agreements: Agreement[];
    profiles: Profile[];
    oldCustomerId: string;
    updateDate: Date;
    membershipStatus?: 'VALID' | 'INVALID';
    surveyConsent: boolean;
    surveyConsentUpdateDate: Date;
    shareDataConsent: boolean;
    shareDataConsentUpdateDate: Date;
}

type Address = {
    streetAddress: string;
    locality: string;
    postalCode: string;
    region?: string;
    country: string;
};

type Agreement = {
    fleetId: string;
    cityId: string;
    userId: string;
    date: Date;
    hasAcceptedLatest: boolean;
};

export type Service = {
    id: string;
    name: string;
    status: string;
    cityId: string;
    visibility: string;
};

type Profile = {
    id: string;
    fleetId: string;
    phoneNumber?: string;
    email: string;
    emailConsent: boolean;
    identificationNumber: string;
    creationDate: Date;
    updateDate: Date;
    rfid?: string;
    status: 'APPROVED' | 'SUSPENDED' | 'INACTIVE' | 'ARCHIVED';
    name?: string;
    type: string;
    entity: Entity;
    isBillingInProgress: boolean;
};

type Entity = {
    id: string;
    fleetId: string;
    initialDepositAmount: number;
    billingTokenId: string;
    billingAddress: Address;
    entityName: string;
    type: 'Personal' | 'Business';
    status: boolean; // 'APPROVED' | 'ARCHIVED' | 'OUTSTANDING_BALANCE' | 'SUSPENDED'
    isMasterEntity: boolean;
    billingGroupId?: string;
    tokenId?: string;
    fiscalCode?: string;
    billingGroup?: BillingGroup;
    services?: Service[];
}

type BillingGroup = {
    fleetId: string;
    id: string;
    name: string;
    discount: number;
    overMileageCap: number;
    overMileageRate: number;
}

export async function getUser(token: string): Promise<User> {
    try {
        const headers = new Headers();
        headers.append("x-api-key", process.env.VULOG_API_KEY as string);
        headers.append("Authorization", "Bearer " + token);
        headers.append("Content-Type", "application/json");
        const res1 = await fetch(`${process.env.VULOG_HOST}/apiv5/user`, {
            method: 'GET',
            headers,
        });
        const data1: any = await res1.json();

        const res2 = await fetch(`${process.env.VULOG_HOST}/boapi/proxy/user/fleets/${process.env.VULOG_FLEET_ID}/users/${data1.id}`, {
            method: 'GET',
            headers
        });
        const data2: any = await res2.json();
        console.log('data2', data2);

        return data2;
    } catch (error) {
        // Catch any errors that occurred during the API request and handle them appropriately
        console.error('Error fetching user data:', error);
        throw new Error('Failed to fetch user data.');
    }
}
