import { Sticker } from 'lucide-react'
import { useState } from 'react'
import Stickers from './stickers.jsx'

export default function media_sheet(){
  const [tab, set_tab] = useState(1);
  return(
    <div onScroll={(e) => e.stopPropagation()} className='w-full h-full flex flex-col justify-between'>
      <p className='text-center p-2 font-bold'>
        {tab == 1? 'Stickers' : 'GIFs'}
      </p>
      <div className='flex-1 flex items-center flex-col overflow-hidden'>
        <input 
          className="w-[90%] outline-none p-2 pl-4 rounded-xl bg-[#1d1d1d]"
          placeholder={`Search ${tab == 1? 'stickers' : 'GIFs'}...`}
        />
        {tab == 1? <Stickers/> : ''}
      </div>
      <div className='h-[7%] flex items-center justify-evenly mb-5 border-t border-t-[#1d1d1d]'>
        <Sticker 
          onClick={() => set_tab(1)}
          color={tab == 1? '#6a69fe' : 'darkgray' }
        />
        <span 
          onClick={() => set_tab(2)}
          style={{
            color: tab == 2? '#6a69fe' : 'darkgray'
          }}
          className='font-bold text-[20px] p-0 m-0 h-5 flex items-center'>GIF</span>
      </div>
    </div> 
  )
}