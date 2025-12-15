'use client';
import { useState, useEffect } from 'react';
import { Grid } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';

const gf = new GiphyFetch(process.env.NEXT_PUBLIC_GIPHY_API_KEY || 'fallback_key');

export default function GifPicker({ onSelect, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth - 32);
  }, []);

  const fetchGifs = (offset) =>
    searchQuery
      ? gf.search(searchQuery, { offset, limit: 20 })
      : gf.trending({ offset, limit: 20 });

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#1d1d1d] rounded-t-3xl p-4"
      style={{ paddingBottom: 'max(20px, env(safe-area-inset-bottom))' }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search GIFs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 p-3 bg-gray-800 rounded-full text-white mr-2"
        />
        <button onClick={onClose} className="text-white text-2xl">×</button>
      </div>
      <div style={{ height: '350px', width: '100%', overflow: 'scroll', }}>
        {width > 0 && (
          <Grid
            width={width}
            columns={3}
            gutter={8}
            hideAttribution={false}
            fetchGifs={fetchGifs}
            onGifClick={(gif) => {
              onSelect(gif.images.downsized.url);
              onClose();
            }}
          />
        )}
      </div>
    </div>
  );
}