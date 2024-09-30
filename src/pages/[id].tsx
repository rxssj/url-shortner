import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string }
  
  const urlDatabase = (global as any).urlDatabase || {}

  console.log(`Ricerca per ID: ${id}`); 
  console.log(`Database attuale:`, urlDatabase); 

  const originalUrl = urlDatabase[id]

  if (originalUrl) {
    console.log(`Reindirizzamento a: ${originalUrl}`);
    return {
      redirect: {
        destination: originalUrl,
        permanent: false,
      },
    }
  }

  console.log(`URL non trovato per ID: ${id}`); 
  return {
    notFound: true,
  }
}

export default function Redirect() {
  return null
}
