import { stickers } from '@/stickers/stickers'
import { useState, useRef, useEffect } from 'react'

export default function Stickers(){
  const [loaded, set_loaded] = useState(false)
  const img_ref = useRef(null)
  useEffect(() => {
    const img = img_ref.current;
    if (img) {
      if (img.complete) {
        set_loaded(true);
      } else {
        const load_img = () => set_loaded(true);
        img.addEventListener('load', load_img);
        return () => {
          img.removeEventListener('load', load_img);
        };
      }
    }
  }, []);
  
  return(
    <div onTouchStart={(e) => e.stopPropagation} className='w-[90%] mt-4 grid grid-cols-3 gap-2 items-center pt-2 pb-5 justify-between overflow-scroll'>
      {stickers?.flaticon_stickers?.animals.map((url, i) => (
        <div className={`w-[98%] min-h-25 h-auto active:bg-[#262626] p-3 rounded-2xl ${loaded? null : 'bg-[#1d1d1d]'}`}>
          <img 
            key={i} 
            src={url}
            ref={img_ref}
            alt=""
            style={{
              opacity: loaded? 1 : 0
            }}
            className='shrink-0'
          />
        </div>
      ))}
    </div>
  );
}