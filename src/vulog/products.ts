export type Product = {
    active?: boolean;
    distanceIncluded?: number;
    expirationDate: string;
    fleetId: string;
    id: string;
    modelIdsByServiceId: string[];
    name: string;
    percentage?: number;
    price: number;
    pricePerDay?: number;
    pricePerHour?: number;
    pricePerUnitExceedingAllowance?: number;
    priceRate?: number;
    serviceIds: string[];
    systemCreditsAvailable?: number;
    taxIncluded: boolean;
    taxName: string;
    taxRate: number;
    taxes: any;
    type: ProductType;
    validityDays?: number;
    walletPayable?: boolean;
    xMinutesBefore?: number;
}

type ProductType =
    'ADD_ON' |
    'CUSTOM' |
    'DAMAGE_WAIVER' |
    'DEPOSIT' |
    'EXCESS_MILEAGE_PACKAGE' |
    'FEE_END_ZONE' |
    'FEE_START_ZONE' |
    'INSURANCE' |
    'PVRT' |
    'REGISTRATION_FEE' |
    'SCHEDULED_BOOKING_CANCELLATION_FEE' |
    'SCHEDULED_BOOKING_ONE_WAY_FEE' |
    'SCHEDULED_TRIP_CANCELLATION_FEE' |
    'SCHEDULED_TRIP_EARLY_CANCELLATION_FEE' |
    'SCHEDULED_TRIP_FEE' |
    'SUBSCRIPTION' |
    'SUBSCRIPTION_CUSTOM_FEE' |
    'SYSTEM_CREDITS_PACKAGES' |
    'TRIP_RELATED';

export async function getProductsByService(token: string, serviceId: string, modelId?: number): Promise<Product[]> {
    try {
        const headers = new Headers();
        headers.append("x-api-key", process.env.VULOG_API_KEY as string);
        headers.append("Authorization", "Bearer " + token);
        headers.append("Content-Type", "application/json");

        const res = await fetch(`${process.env.VULOG_HOST}/boapi/proxy/user/fleets/${process.env.VULOG_FLEET_ID}/products/services/${serviceId}${modelId ? `?modelId=${modelId}`: ''}`, {
            method: 'GET',
            headers: headers,
        });

        const data: Product[] = await res.json();
        // console.log('data :>> ', data);

        // The return value is *not* serialized
        // You can return Date, Map, Set, etc.
        return data;
    } catch (error) {
        // Catch any errors that occurred during the API request and handle them appropriately
        console.error('Error fetching products data:', error);
        throw new Error('Failed to fetch products data.');
    }
}


export type ChargeProductBody = {
    amount: number;
    entityId: string;
    userId: string;
    productId: string;
    productNotes?: string;
    subscriptionId?: string;
    originId?: string;
    chargeProductRequestId?: string;
}

export async function chargeProductToUser(data: ChargeProductBody): Promise<[number, string]> {
    try {
        const headers = new Headers();
        headers.append("x-api-key", process.env.VULOG_API_KEY as string);

        const res = await fetch(`${process.env.VULOG_HOST}/boapi/proxy/billing/fleets/${process.env.VULOG_FLEET_ID}/invoices/product`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });

        let message: string;
        switch (res.status) {
            case 200:
                message = 'OK';
                break;
            case 201:
                message = 'Product billed successfully';
                break;
            case 400:
                message = 'Invalid request';
                break;
            case 401:
                message = 'Unauthorized';
                break;
            case 403:
                message = 'Forbidden';
                break;
            case 404:
                message = 'Nothing found';
                break;
            case 409:
                message = 'No valid method of payment';
                break;
            default:
                message = 'Internal error';
        }

        return [res.status, message];
    } catch (error) {
        // Catch any errors that occurred during the API request and handle them appropriately
        console.error('Error charging product to a user:', error);
        throw new Error('Error charging product to a user.');
    }
}
