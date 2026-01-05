import { Image, Smile, Sticker } from 'lucide-react'
import styles from '@/styles/media.module.scss'
import { useRef, useEffect } from 'react'

export default function MediaPicker({ onPick }){
  const container = useRef(null)
  
  useEffect(() => {
    const isMedia = container.current
    if (isMedia) {
      const handleClick = () => {
        handleChangePick('close')
      };
      document.body.addEventListener("click", handleClick);
      return () => document.body.removeEventListener("click", handleClick);
    } else {
      setIsMedia(false);
    }
    return () => setIsMedia(true);
  }, [container.current]);
  
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
    <div className='w-[100dvw] h-[100dvh] bg-transparent top-0 fixed flex items-end justify-center' style={{
      zIndex: 1,
    }}>
      
      <div ref={container} onClick={(e) => e.stopPropagation()} className={`flex gap-3 p-5 rounded-2xl w-[96%] mb-15 ${styles.optionsDiv}`} 
      style={{
        backgroundColor: '#2c2535',
      }}
      >
        <span style={style} onClick={() => handleChangePick(1)} className='flex flex-col items-center w-20 p-2 h-20 justify-evenly rounded-2xl text-[15px]'>
          <Image size={25}/>
          Photo
        </span>
        
        <span style={style} onClick={() => handleChangePick(2)} className='flex flex-col items-center w-20 p-2 h-20 bg-purple justify-evenly rounded-2xl text-[15px]'>
          <Smile size={25}/>
          Emojis
        </span>
        
        <span style={style} onClick={() => handleChangePick(3)} className='flex flex-col items-center w-20 p-2 h-20 bg-purple justify-evenly rounded-2xl text-[15px]'>
          <Sticker size={25}/>
          Stickers
        </span>
        
        <div style={style} onClick={() => handleChangePick(4)} className='flex flex-col items-center w-20 p-2 h-20 bg-purple justify-evenly rounded-2xl text-[15px]'>
          <span className='font-bold text-[20px] p-0 m-0 h-5 flex items-center'>GIF</span>
          GIFs
        </div>
      </div>
    </div>
  );
}