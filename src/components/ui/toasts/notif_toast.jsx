"use client"

import {MessageCircle, Heart, Palette} from 'lucide-react'
import styles from '@/styles/transition.module.scss'
import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation'

export default function Notif_toast({icon, type, description, user, onClose, room, media}){
  const body = useRef(null)
  const router = useRouter()
  
  useEffect(() => {
    function close(){
      const elem = body.current
      if (elem) {
        elem.classList.remove(styles.toast_trans)
        elem.classList.add(styles.toast_trans_remove)
      }
    }
    setTimeout(() => {
      close()
      setTimeout(() => onClose(),300)
    }, 3000)
    
  }, [])
  
  
  return(
    <div ref={body} className={`w-full h-15 bottom-15 fixed flex items-center justify-center z-20 ${styles.toast_trans}`}>
      <div onClick={() => {
        type == 'msg' || type == 'theme' && room && router.push(`/chat/${room}`)
      }} draggable={true} className='w-[95%] h-[95%] rounded-full bg-[#1a1a2a] gap-2 flex items-center justify-evenly p-1.5 active:scale-98 transition active:opacity-97'>
        {!icon? <div className='w-[45px] h-[45px] bg-blue-500 rounded-full font-bold shrink-0 flex items-center justify-center'>
          {type == 'msg'? user.name[0].toUpperCase() : type == 'theme'? <Palette/> : null}
        </div> : <img src={icon} className='w-[45px] h-[45px] bg-blue-500 rounded-full font-bold shrink-0 flex items-center justify-center'/>
        }
        <div className='flex flex-col flex-1'>
          <strong className='flex gap-1 items-center'>
            {type == 'msg'? 'New message' : type == 'theme'? 'New chat theme' : ''} 
            {type == 'reaction'? <Heart fill={'red'} stroke={'red'} size={12}/> : type == 'msg' || 'theme'? <MessageCircle fill={'#00e000'} stroke={'#00e000'} size={12}/> : null }
          </strong>
          <span
            className='text-ellipsis max-w-[91%] whitespace-nowrap overflow-hidden text-[15px]'
          >
            <span className='font-bold'>{user.name || '...'}</span>: {description.substring(0, 35)}
          </span>
        </div>
      </div>
    </div>
  )
}