import type { NextApiRequest, NextApiResponse } from 'next'
import { nanoid } from 'nanoid'

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
    console.log('Database prima dell\'inserimento:', global.urlDatabase);
    global.urlDatabase[id] = url;
    console.log('Database dopo l\'inserimento:', global.urlDatabase);

    console.log(`URL salvato: ${id} -> ${url}`);
    console.log(`Database attuale:`, global.urlDatabase);

    return res.status(200).json({ id })
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Metodo ${req.method} Non Permesso`)
  }
}
