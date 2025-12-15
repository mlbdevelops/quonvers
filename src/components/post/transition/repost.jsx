import { Info, ChevronDown as Cd } from 'lucide-react'
import styles from '@/styles/transition.module.scss'
import Header from '@/components/elements/header'
import { useState, useEffect } from 'react'

export default function Repost({onClose, initialValue}){
  const [value, setValue] = useState('')
  const [hasClicked, setHasClicked] = useState(false)
  const [valueIndex, setValueIndex] = useState(initialValue == true? 1 : 2 || 0)
  
  useEffect(() => {
    if (hasClicked && valueIndex == 1) return onClose(true)
    else if(hasClicked && valueIndex == 2) return onClose(false)
  }, [valueIndex])
  
  
  const selected = 'outline-[#6a69fe] bg-[#6a69fe]'
  
  return(
    <div className={`w-full h-full bottom-0 fixed bg-[#0f0f0f] flex flex-col items-center ${styles.trans} z-10`}>
      <Header title='Allow repost' left={<Cd onClick={() => onClose(initialValue)}/>}/>
      <span className='p-4 pt-2 flex items-center gap-3 text-[darkgray]'>
        <Info/>
        Allow whether your post to be reposted by other users.
      </span>
      <div className='w-full flex flex-col p-5 gap-4'>
        <div onClick={() => {
          setValueIndex(1)
          setHasClicked(true)
        }} className='flex items-center gap-3'>
          <div className={`w-3 h-3 rounded-full outline-2 outline-offset-2 ${valueIndex == 1 && selected}`}></div> 
          <span>
            Yes
          </span>
        </div>
        <div onClick={() => {
          setValueIndex(2)
          setHasClicked(true)
        }} className='flex items-center gap-3'>
          <div className={`w-3 h-3 rounded-full outline-2 outline-offset-2 ${valueIndex == 2 && selected}`}></div> 
          <span>
            No
          </span>
        </div>
      </div>
    </div>
  );
}