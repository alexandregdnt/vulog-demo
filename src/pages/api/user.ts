import {NextApiRequest, NextApiResponse} from "next";
import {getUser, postUpdateUserBithdate} from "@/vulog/users";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const accessToken = req.query.access_token; // Get the access token from the query parameters
        if (!accessToken) {
            return res.status(400).json({ error: 'Access token is missing in the query parameters.' });
        }

        getUser(accessToken as string)
            .then((response) => {
                res.status(200).json(response);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    } else if (req.method === 'POST') {
        console.log('req.body :>> ', req.body);
        const accessToken = req.query.access_token; // Get the access token from the query parameters
        if (!accessToken) {
            return res.status(400).json({ error: 'Access token is missing in the query parameters.' });
        }

        const {birthdate} = req.body;
        if (!birthdate) {
            return res.status(400).json({ error: 'Birthdate is missing in the body.' });
        }

        postUpdateUserBithdate(accessToken as string, birthdate as string)
            .then((response) => {
                res.status(200).json(response);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    } else {
        res.status(405).json({ error: 'Method not allowed.' });
    }
}
