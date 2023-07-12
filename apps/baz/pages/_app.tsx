import '../styles/global.css'
import { AppProps } from 'next/app'
import prisma from "@turborepro/foo"

export default function App({ Component, pageProps }: AppProps) {
  console.log(prisma.user.count);
  return <Component {...pageProps} />
}
