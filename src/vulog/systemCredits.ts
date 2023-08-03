type ModelIdsByServiceId = {
    [serviceId: string]: {
        serviceLevel: boolean;
    };
};

export type SystemCreditsPackage = {
    id: string;
    fleetId: string;
    modelIdsByServiceId: ModelIdsByServiceId;
    serviceIds: string[];
    type: string;
    price: number;
    name: string;
    taxIncluded: boolean;
    taxName: string;
    taxRate: number;
    zones: any[]; // Remplacez `any`
    taxes: any[]; // Remplacez `any`
    systemCreditsAvailable: number;
    validityDays: number;
    walletPayable: boolean;
};

export async function getSystemCreditsPackages(token: string): Promise<SystemCreditsPackage[]> {
    try {
        const headers = new Headers();
        headers.append("x-api-key", process.env.VULOG_API_KEY as string);
        headers.append("Authorization", "Bearer " + token);
        headers.append("Content-Type", "application/json");

        const res = await fetch(`${process.env.VULOG_HOST}/apiv5/systemCreditsPackages`, {
            method: 'GET',
            headers: headers,
        });

        const data: SystemCreditsPackage[] = await res.json();
        // console.log('data :>> ', data);

        // The return value is *not* serialized
        // You can return Date, Map, Set, etc.
        return data;
    } catch (error) {
        // Catch any errors that occurred during the API request and handle them appropriately
        console.error('Error fetching SystemCreditsPackages data:', error);
        throw new Error('Failed to fetch SystemCreditsPackages data.');
    }
}
