import {NextApiRequest, NextApiResponse} from "next";
import {createToken, refreshToken} from "@/vulog/auth";
import {jsonConcat} from "@/utils/helpers";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {refresh_token} = req.body;

    if (refresh_token && typeof refresh_token == "string") {
        const response = await refreshToken(refresh_token);
        const result = jsonConcat(response, {fetch_timestamp: new Date().getTime()});

        res.status(200).json(result);
    } else {
        res.status(400).json({message: 'Refresh token invalid'});
    }
}
