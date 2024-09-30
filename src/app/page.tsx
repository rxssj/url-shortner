"use client"

import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { useState } from "react"
import { ClipboardIcon, CheckIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import CustomCursor from '../components/CustomCursor'

export default function Home() {
  const [url, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })
      if (!response.ok) {
        throw new Error('Errore nella richiesta')
      }
      const data = await response.json()
      if (data.id) {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin
        const shortUrl = `${baseUrl.replace(/\/+$/, '')}/${data.id}`
        setShortUrl(shortUrl)
        console.log('URL corto generato:', shortUrl)
      } else {
        throw new Error('Risposta non valida dal server')
      }
    } catch (error) {
      console.error('Errore:', error)
      setError('Si è verificato un errore durante la creazione dell\'URL corto')
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 animated-background cursor-none">
      <CustomCursor />
      <div className="z-10 flex flex-col items-center w-full max-w-2xl">
        <h1 className="text-4xl md:text-7xl font-bold mb-4 gradient-text text-shadow title-glow tracking-tight text-center">
          Accorciatore URL
        </h1>
        <p className="text-sm md:text-lg mb-6 md:mb-8 text-gray-600 text-center">
          Trasforma i tuoi link lunghi in URL <span className="bg-blue-800 text-white rounded-full px-2 py-1">corti</span> e gestibili
        </p>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex w-full items-center space-x-2 bg-white p-2 rounded-full shadow-lg">
            <Input
              type="url"
              placeholder="Inserisci l'URL da accorciare"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="text-gray-800 border-none focus:ring-2 focus:ring-blue-300 rounded-full w-full text-sm md:text-base"
            />
            <Button 
              type="submit"
              className={`rounded-full transition-colors duration-300 ${
                url ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
              } text-white font-bold py-2 px-4 md:px-6 text-sm md:text-base`}
              disabled={!url}
            >
              <span className="hidden md:inline">Accorcia</span>
              <MagnifyingGlassIcon className="h-5 w-5 md:hidden" />
            </Button>
          </div>
        </form>
        {error && <p className="text-red-500 mt-2 text-sm md:text-base text-center">{error}</p>}
        {shortUrl && (
          <div className="mt-6 p-4 bg-white rounded-lg shadow-md w-full">
            <p className="text-gray-700 mb-2 font-semibold text-sm md:text-base">URL accorciato:</p>
            <div className="flex flex-col md:flex-row items-center justify-between bg-gray-100 p-2 rounded-md">
              <a href={shortUrl} className="text-blue-600 hover:text-blue-800 font-medium truncate mb-2 md:mb-0 md:mr-2 text-center md:text-left w-full md:w-auto text-sm md:text-base">
                {shortUrl}
              </a>
              <Button
                onClick={copyToClipboard}
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md transition duration-300 ease-in-out w-full md:w-auto text-sm md:text-base"
              >
                {copied ? (
                  <CheckIcon className="h-5 w-5 inline mr-1" />
                ) : (
                  <ClipboardIcon className="h-5 w-5 inline mr-1" />
                )}
                {copied ? 'Copiato!' : 'Copia'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
