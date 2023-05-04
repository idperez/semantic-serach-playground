// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '@planetscale/database'
import { createEmbedding } from "../../helpers/openai";
import {createVector} from "../../helpers/pinecone";

type Data = {
    vectors: Row[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const vectorText = `${req.body.name} ${req.body.body}`;

    // const response = await createEmbedding(embeddingInput);

    await createVector(req.body.name, req.body.body)

    res.status(200).json({ vectors: [] })
}
