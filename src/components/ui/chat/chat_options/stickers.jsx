import { stickers } from '@/stickers/stickers'

export default function Stickers(){
  return(
    <div onTouchStart={(e) => e.stopPropagation} className='w-[90%] mt-4 grid grid-cols-3 gap-2 items-center pt-2 pb-5 justify-between overflow-scroll'>
      {stickers?.flaticon_stickers?.animals.map((url, i) => (
        <img 
          key={i} 
          src={url}
          alt=""
          className='w-[98%] min-h-25 h-auto active:bg-[#262626] p-3 rounded-2xl bg-[#1d1d1d] shrink-0'
        />
      ))}
    </div>
  );
}