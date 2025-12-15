
import { 
  Clock,
  GalleryVertical
} from 'lucide-react'
import styles from '@/styles/create_popup.module.scss'
import { useEffect } from 'react'

export default function Create_popup({onClose}){
  
  const closeFunc = (val) => {
    onClose(val)
  }
  
  return(
    <div onClick={closeFunc} className={`w-full h-full bottom-0 fixed flex flex-col items-center justify-end pb-5 bg-[#ffffff22] ${styles.fade}`}>
      <div onClick={(e) => e.stopPropagation()} className={`w-[50%] h-30 rounded-3xl bg-black mb-10 p-6 pt-2 pb-2 flex flex-col items-center justify-evenly ${styles.bounse}`}>
        <div onClick={() => closeFunc(1)} className='w-full flex items-center justify-between text-[17px]'>
          Publication
          <GalleryVertical size={20}/>
        </div>
        <div onClick={() => closeFunc(2)} className='w-full flex items-center justify-between text-[17px]'>
          24h Snap
          <Clock size={20}/>
        </div>
      </div>
    </div>
  );
}