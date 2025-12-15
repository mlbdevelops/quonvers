import { Images, Smile, Sticker } from 'lucide-react'
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
      cont.classList.add(styles.optionsDivRem)
    }
    setTimeout(() => onPick(value), 150)
  }
  
  return(
    <div className='w-[100dvw] h-[100dvh] bg-transparent top-0 fixed' style={{
      zIndex: 1,
    }}>
      
      <div ref={container} onClick={(e) => e.stopPropagation()} className={`fixed bottom-15 left-7 flex flex-col gap-3 bg-[#1d1d1d] p-5 rounded-2xl w-37 ${styles.optionsDiv}`} 
      style={{
        boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)'
      }}
      >
        
        <span onClick={() => handleChangePick(1)} className='flex items-center  w-full justify-between text-[20px]'>Photos <Images size={20}/></span>
        
        <span onClick={() => handleChangePick(2)} className='flex items-center  w-full justify-between text-[20px]'>Emojis <Smile size={20}/></span>
        
        <span onClick={() => handleChangePick(3)} className='flex items-center  w-full justify-between text-[20px]'>Stickers <Sticker size={20}/></span>
        
        <div onClick={() => handleChangePick(4)} className='flex items-center  w-full justify-between text-[20px]'>
          Giphys
          <span className='font-bold text-[15px] p-0 m-0 h-5 flex items-center'>GIF</span>
        </div>
      </div>
    </div>
  );
}