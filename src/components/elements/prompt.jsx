import { useState } from 'react'
import styles from '@/styles/transition.module.scss'
export default function Prompt({title, placeholder, value, onCancel, onSubmit}){
  const [default_value, set_default_value] = useState(value)
  
  return(
    <div onClick={() => onCancel()} className='w-[100dvw] h-[100dvh] bg-[rgba(0,0,0,0.5)] flex items-center justify-center top-0 fixed z-30'>
      <div onClick={(e) => e.stopPropagation()} className={`w-[90%] min-h-[200px] bg-[#1d1d1d] rounded-3xl flex flex-col items-center justify-between overflow-hidden ${styles.trans4}`}>
        
        <strong className='text-center text-xl mt-4'>
          {title? title : 'Enter a title'}
        </strong>
        <input 
          type="text" 
          placeholder={placeholder? placeholder : 'Type here...'}
          value={default_value}
          onChange={(e) => set_default_value(e.target.value)}
          className='w-[90%] outline-none p-2 pl-4 rounded-full bg-[#262626] '/>
        <div className='w-full flex items-center justify-between border-0 border-t-2 border-[#262626]'>
          <button onClick={() => onCancel()} className='w-[50%] h-13 border-0 border-r-1 border-[#262626] active:bg-[#262626] font-bold'>
            Cancel
          </button>
          <button onClick={() => onSubmit()} className='w-[50%] h-13 border-0 border-l-1 border-[#262626] active:bg-[#262626] text-[#6a69fe] font-bold'>
            Ok
          </button>
        </div>
      </div>
    </div>
  )
}