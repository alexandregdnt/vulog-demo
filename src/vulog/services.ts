export type Service = {
    id: string;
    name: string;
    status: 'ACTIVE' | 'DISABLED';
    type: 'FREE_FLOATING' | 'ROUND_TRIP_BOOKING' | 'SCHEDULED_BOOKING_STATION' | 'SERVICE_TRIP' | 'SUBSCRIPTION';
    fleetId: string;
    cityId: string;
    zones: string[];
    vehicles: string[];
    stations: string[];
    pois: string[];
    bookingValidity: number;
    visibility: 'PUBLIC' | 'PRIVATE';
    zoneFillColor?: string;
    zoneOutlineColor?: string;
    maxConcurrentTrips: number;
    highestRangeEnabled?: boolean;
    scheduleAtripEnabled?: boolean;
}

export async function getServices(token: string): Promise<Service[]> {
    try {
        const headers = new Headers();
        headers.append("x-api-key", process.env.VULOG_API_KEY as string);
        headers.append("Authorization", "Bearer " + token);
        headers.append("Content-Type", "application/json");

        const res = await fetch(`${process.env.VULOG_HOST}/boapi/proxy/user/fleets/${process.env.VULOG_FLEET_ID}/services`, {
            method: 'GET',
            headers: headers,
        });

        const data: Service[] = await res.json();
        // console.log('data :>> ', data);

        // The return value is *not* serialized
        // You can return Date, Map, Set, etc.
        return data;
    } catch (error) {
        // Catch any errors that occurred during the API request and handle them appropriately
        console.error('Error fetching services data:', error);
        throw new Error('Failed to fetch services data.');
    }
}
