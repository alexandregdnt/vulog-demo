import {NextApiRequest, NextApiResponse} from "next";
import {ChargeProductBody} from "@/vulog/products";
import {getSystemCreditsPackages} from "@/vulog/systemCredits";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const data: ChargeProductBody = req.body;

    if (req.method === 'POST'){
        const accessToken = req.query.access_token; // Get the access token from the query parameters
        if (!accessToken) {
            return res.status(400).json({ error: 'Access token is missing in the query parameters.' });
        }

        getSystemCreditsPackages(accessToken as string)
            .then((response) => {
                res.status(200).json(response);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    }
}
