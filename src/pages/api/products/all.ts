import { NextApiRequest, NextApiResponse } from "next";
import { getProductsByService, Product } from "@/vulog/products";
import { getServices } from "@/vulog/services";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const accessToken = req.query.access_token;
        if (!accessToken) return res.status(400).json({ message: 'Access token is missing in the query parameters.' });

        try {
            const services = await getServices(accessToken as string);
            const products: Product[] = [];
            for (const service of services) {
                const subResponse: Product[] = await getProductsByService(accessToken as string, service.id as string);
                products.push(...subResponse);
            }
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed. Please use GET.' });
    }
}
