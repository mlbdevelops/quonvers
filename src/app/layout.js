import "./globals.css";
import SocketProvider from '../sockets/socketProvider.js'
import Head from 'next/head'

export const metadata = {
  title: "Quonvers",
  description: "Fast & secure meme sharing and chatting app",
};

export default function RootLayout({ children }) {
  
  return (
    <html>
      <body
        className={`antialiased`}
      >
        <headers>
          <link rel="icon" type="image/png" href="/logo.png" />
          <link rel="apple-touch-icon" type="image/png" href="/logo.png" />
          {/*<link rel="manifest" href="/manifest.json" />*/}
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        </headers>
        {children}
        <SocketProvider/>
      </body>
    </html>
  );
}