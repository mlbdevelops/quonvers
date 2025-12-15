'use client';
import { useState } from 'react';
import { Grid } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { stickers } from '@/stickers/stickers'
import trans from '@/styles/transition.module.scss'

const gf = new GiphyFetch('Gl7xV9jX1nUXtA0v1k2d3f4g5h6j8k9l');

export default function StickerPicker({ onSelect, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');

  const fetchStickers = (offset) => 
    searchQuery 
      ? gf.search(searchQuery, { offset, limit: 20, type: 'sticker' })
      : gf.stickers({ offset, limit: 20 })
  
  return (
    <div 
      className={`fixed bottom-5 w-[95%] z-50 bg-[#1d1d1d] rounded-3xl p-4 h-[60%] overflow-scroll flex flex-col items-center ${trans.trans}`}
      style={{ paddingBottom: 'max(20px, env(safe-area-inset-bottom))' }}
      onClick={(e) => e.stopPropagation()}
    > 
      <h1 className='text-center text-2xl font-bold mb-3 mt-1'>
        Stickers
      </h1>
      <div className='grid grid-cols-3 gap-3 overflow-scroll border-0 border-t-1 border-[#262626]'>
        {stickers.flaticon_stickers.animals.map((photo, i) => (
          <img 
            key={i} 
            src={photo}
            alt=""
            className='w-25 h-auto active:bg-[#262626] p-3 rounded-2xl'
          />
        ))}
      </div>
      <div className='w-full h-8 border-0 border-t-1 border-[#262626] p-2'>
        <img 
          src={stickers.flaticon_stickers.animals[0]} 
          alt=""
          style={{
            width: 30,
            height: 30,
          }}
        />
        
      </div>
    </div>
  );
}