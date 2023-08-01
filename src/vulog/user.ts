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

type Service = {
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

type UserData = {
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
        const res = await fetch(`${process.env.VULOG_HOST}/apiv5/user`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json, text/plain, */*',
                x_api_key: process.env.VULOG_API_KEY as string,
            },
        });

        if (!res.ok) {
            // If the response status is not OK (i.e., not 2xx), throw an error with the status text
            throw new Error(`Request failed with status: ${res.status} - ${res.statusText}`);
        }

        // The return value is *not* serialized
        // You can return Date, Map, Set, etc.
        return await res.json();
    } catch (error) {
        // Catch any errors that occurred during the API request and handle them appropriately
        console.error('Error fetching user data:', error);
        throw new Error('Failed to fetch user data.');
    }
}