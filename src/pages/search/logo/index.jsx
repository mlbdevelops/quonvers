"use client"

import { Heart, MessageCircle } from 'lucide-react'
import { useRef } from 'react'

export default function logo(){
  const qrRef = useRef(null)
  
  const downloadQRCode = async () => {
    const canvas = qrRef.current.querySelector("canvas");
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const base64Data = url.split(',')[1];
    const fileName = `logo.png`;
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
  };
  
  return(
    <div className='w-screen h-screen flex items-center justify-evenly'>
      <div ref={qrRef} className='w-30 h-30 bg-[rgba(106,105,254,0.224)] flex items-center justify-center border-2'>
        <div className='h-10 w-10 flex items-center justify-center scale-190 bg-[#6a69fe]' style={{
          borderRadius: '20px 20px 20px 5px',
        }}>
          <Heart fill={'white'}/>
        </div>
      </div>
    </div>
  )
}