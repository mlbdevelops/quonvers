import Header from '@/components/elements/header';
import { X } from 'lucide-react';
//import styles from '@/styles/transition.module.scss'
import { useRef, useEffect, useState } from 'react';
import Prompt from '@/components/elements/prompt'
import styles from '@/styles/theme.module.scss'
import Image from '@/components/elements/image'
import socket from "@/sockets/socket";

export default function Nicknames({onClose, participants, user, room_id}){
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
    <div ref={body} className={`w-[100dvw] h-[100dvh] z-20 bottom-0 fixed bg-[#0f0f0f] flex flex-col items-center ${styles.popUp}`}>
      <Header 
        left={<X onClick={() => closeFunc()}/>}
        title='Nicknames'
        title_size='text-[19px]'
      />
      
      {prompt && 
        <Prompt 
          onCancel={() => {
            set_prompt(false)
            set_selected_user({})
          }}
          placeholder={selected_user.name}
          title='Nickname'
          onSubmit={(e) => {
            const findIndex = users.findIndex(u => u.id === selected_user.id)
            users[findIndex].name = e
            set_prompt(false)
            change_nickname(e)
          }}
        />}
      
      <div className='w-full flex flex-col'>
        {users.map((u, i) => (
          <div key={i} onClick={() => {
            set_prompt(true)
            set_selected_user(u)
          }} className='w-full flex gap-3 items-center active:bg-[#1d1d1d] p-2 pl-3'>
            {!u.profile? <div className='w-10 h-10 rounded-full flex items-center justify-center bg-[rgba(106,105,254,0.125)] text-[#6a69fe] font-bold'>
              {u.name[0].toUpperCase()}
            </div> : <Image 
              className='w-10 h-10 rounded-full bg-[rgba(106,105,254,0.125)]' 
              loading_box_style='w-10 h-10 rounded-full bg-[#1d1d1d]' 
              src={u.profile} alt="" />}
            <div className='flex flex-col'>
              <strong>
                Set nickname
              </strong>
              <span className='text-[darkgray] text-[12px]'>
                {u.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}