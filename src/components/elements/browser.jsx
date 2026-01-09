import { useState, useEffect } from 'react'
import { ChevronLeft, ArrowLeft, Ellipsis } from 'lucide-react'

function Browser({url}){
  
  const [http, sethttp] = useState('')
  
  useEffect(() => {
    (() => {
      if (!url.startsWith('https://')) {
        sethttp(`https://${url}`)
      }
    })()
  }, [url])
  
  return(
    <div className='w-screen h-screen top-0 fixed flex flex-col items-center justify-center bg-[#111111]'>
      <div className='w-full p-4 flex items-center justify-between'>
        <ChevronLeft/>
        {http || 'Url goes here.'}
        <Ellipsis/>
      </div>
      <div className='flex-1 bg-[#141414] z-500 w-full'>
        <iframe className='w-full h-full border-0' src={url} frameborder="0"></iframe>
      </div>
    </div>
  )
}

export default Browser