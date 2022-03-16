import { FC } from "react"
import Head from "next/head"
import { Navbar } from '../ui';

interface Props {
  title?: string;
}

const origin = typeof window === 'undefined' ? '' : window.location.origin;

export const MainLayout: FC<Props> = ({children,title}) => {
  return (
    <>
        <Head>
            <title>{title || 'Pokemon App'}</title>
            <meta name="author" content="Carlos Fornari" />
            <meta name="description" content={`Info about pokemon ${title}`} />
            <meta name="keywords" content={`pokemon, pokedex, ${title}`} />
            <meta property="og:title" content={`${title}`} />
            <meta property="og:description" content={`Información sobre ${title}`} />
            <meta property="og:image" content={`${origin}/banner.png`} />
        </Head>
        <Navbar />
        <main style={{
          padding: '0 20px'
        }}>
            {children}
        </main>
    </>
  )
}