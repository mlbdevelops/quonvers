import { useRef, useState, useEffect } from 'react';

export default function Image({ src, className, alt, loading_box_style, style }) {
  const img_ref = useRef(null);
  const [loaded, set_loaded] = useState(false);

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
  }, [src]);

  return (
    <div
      className={className}
      style={{
        backgroundColor: !loaded ? '#1d1d1d' : 'transparent',
        overflow: 'hidden',
        ...style,
        border: 0
      }}
    >
      <img
        ref={img_ref}
        loading="lazy"
        src={src}
        alt={alt}
        style={{
          opacity : loaded? 1 : 0
        }}
      />
    </div>
  );
}