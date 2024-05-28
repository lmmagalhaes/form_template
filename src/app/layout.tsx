import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Atividade Extensão',
  description: 'Atividade de Extensão - Educação Inclusiva',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <Head>
        <meta charSet="UTF-8" />
        <title>Atividade Extensão</title>
        <meta
          name="description"
          content="Atividade de Extensão - Educação Inclusiva"
        />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
