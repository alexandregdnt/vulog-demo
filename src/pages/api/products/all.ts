import { NextApiRequest, NextApiResponse } from "next";
import { getProductsByService, Product } from "@/vulog/products";
import {getServices, Service} from "@/vulog/services";

export type ProductWithServices = Product & { services: Service[] };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const accessToken = req.query.access_token;
        if (!accessToken) return res.status(400).json({ message: 'Access token is missing in the query parameters.' });

        try {
            const services = await getServices(accessToken as string);
            let productsMap: Record<string, ProductWithServices> = {};

            for (const service of services) {
                const serviceProducts: Product[] = await getProductsByService(accessToken as string, service.id as string);
                for (const product of serviceProducts) {
                    if (productsMap[product.id]) {
                        // If product is already in the map, add the service to its services array
                        productsMap[product.id].services.push(service);
                    } else {
                        // If product is not in the map, add it with the service in its services array
                        productsMap[product.id] = { ...product, services: [service] };
                    }
                }
            }
            // Convert the map to an array of products
            const products: ProductWithServices[] = Object.values(productsMap);
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed. Please use GET.' });
    }
}
