import styles from "@/styles/transition.module.scss";

export default function Sheet({onClose}){
  return(
    <div onClick={() => onClose()} className='w-[100dvw] h-[100dvh] bottom-0 fixed z-20' style={{
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }}>
      <div onClick={(e) => e.stopPropagation()} className={`w-full h-[40%] bg-[#1d1d1d] bottom-0 fixed rounded-t-[30px] ${styles.trans}`}>
        
        <div className='w-full flex items-center justify-center pt-2'>
          <div className='w-10 h-1 rounded-full bg-[darkgray]'></div>
        </div>
        
      </div>
    </div>
  );
}