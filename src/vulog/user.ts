type Address = {
    streetAddress: string;
    locality: string;
    postalCode: string;
    region: string;
    country: string;
};

type Agreement = {
    fleetId: string;
    cityId: string;
    userId: string;
    date: string;
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
    rfid: string | null;
    email: string;
    phoneNumber: string | null;
    creationDate: string;
    updateDate: string | null;
    entityId: string;
    entityName: string;
    fiscalCode: string | null;
    status: string;
    name: string;
    type: string;
    emailConsent: string | null;
    services: Service[];
    financialInformation: string | null;
    billingInProgress: string | null;
};

export type UserData = {
    id: string;
    lastName: string;
    firstName: string;
    middleName: string;
    gender: string;
    locale: string;
    address: Address;
    dataPrivacyConsent: boolean;
    marketingConsent: boolean;
    agreements: Agreement[];
    profiles: Profile[];
    membershipNumber: string;
    profilingConsent: boolean;
    profilingConsentUpdateDate: string;
};

export async function getUser(token: string) {
    try {
        const headers = new Headers();
        headers.append("x-api-key", process.env.VULOG_API_KEY as string);
        headers.append("Authorization", "Bearer " + token);
        headers.append("Content-Type", "application/json");
        const res = await fetch(`${process.env.VULOG_HOST}/apiv5/user`, {
            method: 'GET',
            headers: headers,
        });

        const data: UserData = await res.json();
        console.log('data :>> ', data);

        // The return value is *not* serialized
        // You can return Date, Map, Set, etc.
        return data as UserData;
    } catch (error) {
        // Catch any errors that occurred during the API request and handle them appropriately
        console.error('Error fetching user data:', error);
        throw new Error('Failed to fetch user data.');
    }
}