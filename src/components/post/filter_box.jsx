import styles from '@/styles/transition.module.scss'

export default function FilterBox({onClose}){
  return(
    <div className='flex items-center flex-col w-screen h-screen fixed bottom-0 z-50 bg-[#ffffff22]' onClick={() => onClose()}>
    
      <div onClick={(e) => e.stopPropagation()} className={`w-full h-[55%] bg-[#0f0f0f] rounded-t-4xl fixed bottom-10 flex items-center justify-between flex-col ${styles.trans3}`}>
        
        <p className='text-3xl font-bold w-full p-3 text-center text-[#6a69fe]'>
          Filter
        </p>
        
        <div className='flex-1 border border-t-0.5 border-[#1d1d1d] border-b-0 border-l-0 border-r-0 w-full flex flex-col items-start gap-2 p-3 pl-4 overflow-scroll'>
          {["Memes (default)", "Politics", "Gaming", "Programming", "Life", "Space", "Humans", "Animals", "Food", "Cars", "Vehicle"].map((m, i) => (
            <span className='text-lg font-bold flex w-full items-center justify-between' key={i}>
              {m}
              {i == 0? (<div className='w-3 h-3 rounded-full border-none bg-[#6a69fe] outline-2 outline-[#6a69fe] outline-offset-3 mr-1'></div>)
              :
              (<div className='w-5 h-5 rounded-full border border-0.5 border-[#2e2e2e]'></div>)}
            </span>
          ))}
        </div>
        
      </div>
    </div>
  );
}