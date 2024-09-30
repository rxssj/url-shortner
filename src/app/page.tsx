"use client"

import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { useState } from "react"
import { ClipboardIcon, CheckIcon } from '@heroicons/react/24/solid'
import CustomCursor from '../components/CustomCursor'

export default function Home() {
  const [url, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  const handleShorten = async () => {
    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        throw new Error('Errore nella richiesta')
      }

      const data = await response.json()
      setShortUrl(`http://${data.shortUrl}`)
      setError("")
    } catch (err) {
      setError("Si è verificato un errore durante l'accorciamento dell'URL")
      console.error(err)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 animated-background cursor-none">
      <CustomCursor />
      <div className="z-10 flex flex-col items-center">
        <h1 className="text-7xl font-bold mb-4 gradient-text text-shadow title-glow tracking-tight text-center">
          Accorciatore URL
        </h1>
        <p className="text-lg mb-8 text-gray-600">
          Trasforma i tuoi link lunghi in URL <span className="bg-blue-800 text-white rounded-full px-2 py-1">corti</span> e gestibili
        </p>
        <div className="flex w-full max-w-2xl items-center space-x-2 bg-white p-2 rounded-full shadow-lg">
          <Input
            type="url"
            placeholder="Inserisci l'URL da accorciare"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="text-gray-800 border-none focus:ring-2 focus:ring-blue-300 rounded-full flex-grow"
          />
          <Button 
            onClick={handleShorten}
            className={`rounded-full transition-colors duration-300 ${
              url ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
            } text-white font-bold py-2 px-6`}
            disabled={!url}
          >
            Accorcia
          </Button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {shortUrl && (
          <div className="mt-6 p-4 bg-white rounded-lg shadow-md w-full max-w-2xl">
            <p className="text-gray-700 mb-2 font-semibold">URL accorciato:</p>
            <div className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
              <a href={shortUrl} className="text-blue-600 hover:text-blue-800 font-medium truncate mr-2">
                {shortUrl}
              </a>
              <Button
                onClick={copyToClipboard}
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md transition duration-300 ease-in-out"
              >
                {copied ? (
                  <CheckIcon className="h-5 w-5" />
                ) : (
                  <ClipboardIcon className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
