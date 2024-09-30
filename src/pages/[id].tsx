import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string }
  
  // Accedi al database globale
  const urlDatabase = (global as any).urlDatabase || {}

  const originalUrl = urlDatabase[id]

  if (originalUrl) {
    return {
      redirect: {
        destination: originalUrl,
        permanent: false,
      },
    }
  }

  return {
    notFound: true,
  }
}

export default function Redirect() {
  return null
}
