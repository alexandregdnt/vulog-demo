import {NextApiRequest, NextApiResponse} from "next";
import {createToken} from "@/utils/vulog";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const response = await createToken('louis.leveneur@troopy.com', 'Troopy2023!');
    res.status(200).json(response);
}
