import "@/styles/globals.css";
import type { AppProps } from "next/app";
import SocketProvider from '../sockets/socketProvider.js'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Component {...pageProps}/> 
      <SocketProvider/>
    </div>
  )
}
