import { useState, useEffect } from 'react'
import { Capacitor } from '@capacitor/core'

export default function Header({title, left, right, title_size}){
  
  const [is_native, set_is_native] = useState(true)
  
  useEffect(() => {
    async function check_platform (){
      if (await Capacitor.isNativePlatform()) return set_is_native(true)
      return set_is_native(false)
    }
    check_platform()
  }, [])
  
  return(
    <div 
      style={{
        //paddingTop: !is_native? '40px' : 0,
        marginTop: is_native? '30px' : 0,
      }}
      className='flex justify-between items-center color-white-500 w-[94%] pl-2 pr-2 h-[65px]'
    >
      <div className={'flex gap-3.5 items-center'}>
        {left}
        <strong className={`${title_size? title_size : 'text-2xl'}`}>
          {title && title}
        </strong>
      </div>
      <div className='text-[darkgray] flex items-center gap-5'>
        {right}
      </div>
    </div>
  )
}