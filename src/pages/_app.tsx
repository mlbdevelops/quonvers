import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Keyboard } from "@capacitor/keyboard";
import SocketProvider from "../sockets/socketProvider";
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from "@capacitor/status-bar";

export default function App({ Component, pageProps }: AppProps) {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !Capacitor.isNativePlatform()) return;

    const setupStatusBar = async () => {
      if (StatusBar) {
        await StatusBar.setOverlaysWebView({ overlay: true });
        await StatusBar.setBackgroundColor({ color: 'transparent' });
        await StatusBar.setStyle({ style: Style.Dark });
      }
    };
    
    setupStatusBar();
    
    Keyboard.setResizeMode({
      mode: 'native'
    })
    
  }, []);

  return (
    <div
      className='flex flex-col fixed inset-0 overflow-hidden'
    >
      <Component {...pageProps} />
      <SocketProvider/>
    </div>
  );
}