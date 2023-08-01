import {NextApiRequest, NextApiResponse} from "next";
import {createToken} from "@/utils/vulog";
import {jsonConcat} from "@/utils/helpers";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {username, password} = req.body;

    if (username && password && typeof username == "string" && typeof password == "string") {
        const response = await createToken(username, password);
        const result = jsonConcat(response, {fetch_timestamp: new Date().getTime()});
        // console.log(result);

        res.status(200).json(result);
    } else {
        res.status(400).json({message: 'Username or password invalid'})
    }
}
