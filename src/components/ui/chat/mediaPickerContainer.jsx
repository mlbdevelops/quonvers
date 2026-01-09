import { Image, Smile, Sticker } from 'lucide-react'
import styles from '@/styles/media.module.scss'
import { useRef, useEffect } from 'react'

export default function MediaPicker({ onPick }){
  const container = useRef(null)
  
  const handleChangePick = (value) => {
    const cont = container.current
    if (cont) {
      cont.classList.remove(styles.optionsDiv)
    }
    setTimeout(() => onPick(value), 50)
  }
  
  const style = {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    //border: '1px solid #6a69fe3b'
  }
  
  return(
    <div onClick={() => onPick()} className='w-[100dvw] h-[100dvh] bg-transparent top-0 fixed flex items-end justify-center' style={{
      zIndex: 1,
    }}>
      
      <div onClick={(e) => e.stopPropagation()} className={`flex justify-evenly pt-5 pb-5 rounded-2xl w-[96%] mb-15 ${styles.optionsDiv}`} 
      style={{
        backgroundColor: '#2c2535',
      }}
      >
        <div className='flex flex-col items-center justify-evenly gap-1 font-bold'>
          <div style={style} onClick={() => handleChangePick(1)} className='rounded-2xl text-[15px] h-15 w-15 flex items-center justify-center'>
            <Image size={25}/>
          </div>
          Photo
        </div>
        
        <div className='flex flex-col items-center justify-evenly gap-1 font-bold'>
          <div style={style} onClick={() => handleChangePick(2)} className='rounded-2xl text-[15px] h-15 w-15 flex items-center justify-center'>
            <Smile size={25}/>
          </div>
          Emojis
        </div>
        
        <div className='flex flex-col items-center justify-evenly gap-1 font-bold'>
          <div style={style} onClick={() => handleChangePick(3)} className='rounded-2xl text-[15px] h-15 w-15 flex items-center justify-center'>
            <Sticker size={25}/>
          </div>
          Stickers
        </div>
        
        <div className='flex flex-col items-center justify-evenly gap-1 font-bold'>
          <div style={style} onClick={() => handleChangePick(4)} className='rounded-2xl text-[15px] h-15 w-15 flex items-center justify-center'>
            <span className='font-bold text-[20px] p-0 m-0 h-5 flex items-center'>GIF</span>
          </div>
          GIFs
        </div>
      </div>
    </div>
  );
}