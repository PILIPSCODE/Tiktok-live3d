import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "./AppProvider";
import AuthContext from "@/context/authContext";
import { Layout } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import { Archivo_Black } from 'next/font/google';

const Archivo = Archivo_Black({
  subsets: ['latin'],
  weight: ['400', '400'],
  variable: '--font-archivo'
})


export const metadata: Metadata = {
  title: "Ti3Live",
  description: "Let's Live streaming using 3d models and automate with ai",
};

export default async function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${Archivo.variable}`}
      dir="ltr"
      suppressHydrationWarning
    >
      <Head

      >
      </Head>
      <AppProvider>

        <body>
          <Layout
            pageMap={await getPageMap()}
            docsRepositoryBase="https://github.com/shuding/nextra/tree/main/docs"
          >
            {children}
          </Layout>
        </body>
      </AppProvider>

    </html>
  )
}