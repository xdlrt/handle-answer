// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

type Data = {
  code: 200 | 500,
  list?: string[],
  msg?: string,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const response = await fetch('https://raw.githubusercontent.com/antfu/handle/main/src/data/idioms.txt')

    if (response && response.body) {
      let text = ''
      for await (const chunk of response.body) {
        text += chunk
      }

      const list = text.split('\n')

      res.status(200).json({
        code: 200,
        list,
      })
      return
    }

    res.status(200).json({
      code: 200,
      list: [],
    })
  } catch (error: any) {
    res.status(500).json({
      code: 500,
      msg: error?.code || 'internal error'
    })
  }
}
