'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/elements/header'
import { 
  UserCircle,
  Smile,
  MessageCircleMore,
  MessageCircleReply,
} from 'lucide-react'
import { useSwipeable } from 'react-swipeable'
import { motion, AnimatePresence } from 'framer-motion'
import useCache from '@/hooks/quonversCachingSystem'

export default function Stories(){
  const [scrollDirection, setScrollDirection] = useState('up')
  const { getProvider, setProvider } = useCache()
  const [index, setIndex] = useState(getProvider('24snapsCurrentIndex') || 0)
  
  useEffect(() => {
    setProvider('24snapsCurrentIndex', index)
  }, [index])
  
  const mockStories = [
    {
      id: 1,
      user:{ username: 'darino_mbula' },
      data:{ letter: "Hello it's MLB the de of this app", type: 'text' }
    },
    {
      id: 2,
      user:{ username: 'alice_johns' },
      data:{ letter: "Another message here", type: 'text' }
    },
    {
      id: 3,
      user:{ username: 'john_doe' },
      data:{ letter: "More sample letters", type: 'audio' }
    },
  ]

  
  const handlers = useSwipeable({
    onSwipedUp: () => {
      setIndex(i => (i + 1) % mockStories.length)
      setScrollDirection('up')
    },
    onSwipedDown: () => {
      setIndex(i => (i - 1 + mockStories.length) % mockStories.length)
      setScrollDirection('down')
    },
    preventDefaultTouchmoveEvent: true,
    trackTouch: true
  })

  const current = mockStories[index]

  return(
    <div className='h-screen flex flex-col items-center overflow-hidden'>
      
      <Header
        title='24h Snaps'
        right={<UserCircle/>}
      />
      
      {/* Swipe container */}
      <div 
        {...handlers}
        className="relative flex-1 w-full overflow-hidden flex items-center justify-center"
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 150 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: scrollDirection == 'up'? -150 : 150 }}
            transition={{ duration: 0.20 }}
            className='absolute w-full h-full flex flex-col items-center'
          >
            
            <div className='w-[95%] border border-[#6a69fe32] rounded-3xl h-[92%] flex flex-col items-center bg-[#6a69fe16]'>

              <div className='w-full p-3 flex items-center gap-2'>
                <div className='w-8 h-8 bg-red-500 rounded-full flex items-center justify-center font-bold'>
                  {current.user.username[0].toUpperCase()}
                </div>
                <span>@{current.user.username}</span>
                •
                <span className='text-[#7a7a7a]'>2h</span>
              </div>

              {/* BODY */}
              <div className='flex-1 w-full flex items-center justify-center px-5 text-center text-lg'>
                {current.data.type == 'text' && current.data.letter}
              </div>

              {/* INPUT BAR */}
              <div className='w-full p-4 flex items-center gap-4'>
                <Smile/>
                <div className='w-[90%] bg-[#8080802f] rounded-full flex items-center justify-between p-2 pl-2'>
                  <div className='min-w-6 flex items-center justify-center min-h-6 rounded-full bg-purple-500'>
                    M
                  </div>
                  <input 
                    type="text" 
                    placeholder='Comment...' 
                    className='border-0 outline-0 bg-transparent w-full ml-2' 
                  />
                </div>
              </div>

            </div>

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}