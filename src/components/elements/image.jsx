import { useRef, useState, useEffect } from 'react'

export default function image({src, className, alt, loading_box_style, style}){
  const img_ref = useRef(null);
  const [loaded, set_loaded] = useState(false);
  
  useEffect(() => {
    const load_img = () => {
      const img = img_ref.current
      if (img.complete && src) {
        set_loaded(true)
      }
    }
  }, [src])
  
  return(
    <div>
      {loaded? <img ref={img_ref} loading='lazy' src={src} alt={alt} className={className}/>
      : <div className={loading_box_style}></div>}
    </div>
  );
}