import type { NextApiRequest, NextApiResponse } from 'next'
import { nanoid } from 'nanoid'

// Questo oggetto simula un database in memoria
declare global {
  var urlDatabase: { [key: string]: string }
}

if (!global.urlDatabase) {
  global.urlDatabase = {}
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { url } = req.body
    if (!url) {
      return res.status(400).json({ error: 'URL mancante' })
    }

    const id = nanoid(6) 
    global.urlDatabase[id] = url

    const shortUrl = `${req.headers.host}/${id}`

    return res.status(200).json({ shortUrl })
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Metodo ${req.method} Non Permesso`)
  }
}
