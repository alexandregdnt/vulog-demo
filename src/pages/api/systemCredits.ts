import {NextApiRequest, NextApiResponse} from "next";
import {getSystemCreditsPackages} from "@/vulog/systemCredits";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET'){
        const accessToken = req.query.access_token; // Get the access token from the query parameters
        if (!accessToken) {
            return res.status(400).json({ error: 'Access token is missing in the query parameters.' });
        }

        // Now you can call the getUser function and pass the accessToken
        getSystemCreditsPackages(accessToken as string)
            .then((response) => {
                res.status(200).json(response);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    }
}