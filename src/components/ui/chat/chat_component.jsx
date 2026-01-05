import styles from "@/styles/chat.module.scss";
import dateFormat from "@/utils/dayjs";
import { Settings, ChevronLeft, Send, Smile, Plus, Clock, Check, Keyboard, Phone, Video, Mic } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import WaveformPlayer from '@/components/ui/chat/record/wave/waveforms';
import Image from '@/components/elements/image'

export default function Chat_component({msg, recipient, i, user, is_last, current_user_name, current_user_profile, onContextMenu}){
  const [show_time, setShow_time] = useState(is_last || false)
  const [playing_id, set_playing_id] = useState('')
  
  const reciProfile = useRef(null)
  
  return(
    <div onContextMenu={onContextMenu} onClick={() => setShow_time(!show_time)} key={i} className={msg.sender_id === user ? styles.msgRight : styles.msgLeft}>
      
      {/*msg.sender_id !== user && recipient?.profile? <Image style={{
        marginBottom: show_time? '19px' : null,
      }} ref={reciProfile} 
        className='h-[38px] w-[38px] rounded-full' 
        loading_box_style='h-[38px] w-[38px] rounded-full bg-[#1d1d1d]' 
        src={recipient?.profile}/>
        : msg.sender_id !== user && !recipient?.profile?
        <div style={{
          marginBottom: show_time? '19px' : null,
        }} className='h-[38px] w-[38px] rounded-full shrink-0 bg-[rgba(106,105,254,0.125)] flex justify-center items-center font-bold text-[#6a69fe] shrink-0' >{recipient?.name[0].toUpperCase()}</div>
      : null*/}
      <div className='flex flex-col'>
        
        {/*Chat component content*/}
        
        {msg.type == 'text'? <div 
          className={msg.sender_id === user ? styles.msgTextRight : styles.msgTextLeft}
          style={{
            backgroundColor: msg.type === 'text'? '' : 'transparent',
            fontSize: msg.type === 'text'? null : 40,
            padding: msg.type === 'text'? null : 0,
          }}
        >{msg.content}</div> 
        
        : msg.type == 'voice'?
        
        <WaveformPlayer 
          audioUrl={msg.content}
          user_profile_url={msg.sender_id == user? current_user_profile : recipient.profile}
          user_name={msg.sender_id == user? current_user_name : recipient.name}
          place={msg.sender_id == user? 'self-end' : 'self-start'}
          id={msg._id}
          sender={msg.sender_id}
          p_id={playing_id}
          playing_id={(e) => set_playing_id(e)}
          style={{
            backgroundColor : msg.sender_id == user? '#6a69fe' : '#2c1e55'
          }}
        /> : null}
        
        <div style={{
          justifyContent: msg.sender_id == user? 'flex-end' : 'flex-start',
          display: show_time? 'flex' : 'none',
        }} className={styles.day}>
          {dateFormat(msg.updatedAt)}
          
          {!msg.delivered && msg.sender_id === user ? (
            <Clock color="white" size={10} />
          ) : msg.sender_id == user? (
            <Check color="white" size={10} />
          ) : ''}
        </div>
      </div>
    </div>
  )
}