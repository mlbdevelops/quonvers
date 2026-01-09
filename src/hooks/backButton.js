import { App } from '@capacitor/app'
import { useEffect } from 'react'
import { Capacitor } from '@capacitor/core'

export function BackButton(onBack){
  useEffect(() => {
    if (typeof onBack != 'function' && !Capacitor.isNativePlatform()) return 
    const handler = App.addListener('backButton', () => {
      onBack()
    });
    return () => handler.remove();
  }, [onBack]);
}
