// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '@planetscale/database'

type Data = {
  vectors: Row[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const config = {
    host: process.env.PLANET_SCALE_HOST,
    username: process.env.PLANET_SCALE_USERNAME,
    password: process.env.PLANET_SCALE_PASSWORD
  }

  const conn = connect(config)
  const results = await conn.execute('select * from vectors')

  res.status(200).json({ vectors: results.rows })
}
