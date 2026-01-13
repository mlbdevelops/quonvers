import Header from '@/components/elements/header';
import { X } from 'lucide-react';
//import styles from '@/styles/transition.module.scss'
import { useRef, useEffect, useState } from 'react';
import Prompt from '@/components/elements/prompt'
import styles from '@/styles/theme.module.scss'
import Image from '@/components/elements/image'
import socket from "@/sockets/socket";
import { emos } from '@/stickers/emoji'

export default function QuickReaction({onClose, participants, user, room_id}){
  const body = useRef(null)
  const [users, set_users] = useState(participants)
  const [selected_user, set_selected_user] = useState({})
  const [prompt, set_prompt] = useState(false)
  const [input, set_input] = useState('')
  
  function closeFunc(){
    const bd = body.current
    if (bd) {
      bd.classList.remove(styles.popUp)
      bd.classList.add(styles.removePopUp)
      setTimeout(() => {
        onClose()
      }, 100)
    }
  }
  
  const change_nickname = async (value) => {
    if(!selected_user && !input && !user) return
    
    const set_nickname = {
      user_id: selected_user.id,
      room_id: room_id,
      nickname: value,
      changer: user,
    }
    
    socket.emit('change_nickname', set_nickname)
  }
  
  return(
    <div ref={body} className={`w-full h-full z-20 bottom-0 fixed bg-[#0f0f0f] flex flex-col items-center ${styles.popUp}`}>
      <Header 
        left={<X onClick={() => closeFunc()}/>}
        title='Quick reactions'
        title_size='text-[19px]'
      />
      <div className='w-full flex flex-wrap overflow-scroll pl-5 pr-5 gap-5'>
        {emos.map((u, i) => (
          <span className='text-5xl'>
            {u}
          </span>
        ))}
      </div>
    </div>
  );
}