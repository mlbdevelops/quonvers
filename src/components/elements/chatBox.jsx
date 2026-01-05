import { useRouter } from 'next/navigation'
import dateFormat from '@/utils/dayjs.js'
import { useState, useEffect } from 'react'
import socket from "@/sockets/socket";
import Image from '@/components/elements/image'

export default function chatBox({name, message, time, profile, is_read, roomId, lastMsgSender, loggedUserId, lastMsgSenderId}){
  const router = useRouter()
  const formatedTime = dateFormat(time)
  const read = !is_read.find(u => u === loggedUserId)
  
  const send_seen = () => {
    socket.emit('seen', ({
      user: loggedUserId,
      room_id: roomId,
    }))
  }
  
  return(
    <div onClick={() => {
      send_seen()
      router.push(`/chat/${roomId}`)
    }} className='flex justify-between w-full h-[72px] p-3 items-center gap-2 active:bg-[#1d1d1d50]'>
      <div>
        {profile? <Image 
          className={'h-13 w-13 rounded-full border border-[#1d1d1d]'} 
          loading_box_style={'h-13 w-13 rounded-full bg-[#1d1d1d]'}
          src={profile}/> : <div className={'bg-[rgba(106,105,254,0.125)] w-13 h-13 rounded-[100px] flex justify-center items-center text-[#6a69fe] font-bold '}>{name[0].toUpperCase() || '?'}</div>}
      </div>
      <div className='flex flex-col items-start flex-1 gap-1'>
        <strong>
          {name}
        </strong>
        <small className={`text-[${!read? '#949494' : 'white'}] ${!read? 'font-normal' : 'font-bold'} overflow-hidden`}
        style={{
          whiteSpace: 'nowrap'
        }}
        >
          {loggedUserId === lastMsgSenderId? 'You' : lastMsgSender.split(' ')[0]}: {message.split('').length >= 22? `${message.substring(0, 22)}...` : message}
        </small>
      </div>
      <div className={'h-12 pr-2 items-end flex flex-col mb-1 justify-center gap-2 text-[#949494]'}>
        <small className={`text-[${!read && 'white'}] ${read? 'font-bold' : 'font-normal'}`}>
          {formatedTime}
        </small>
        {read && <div className='w-3 h-3 bg-[#6a69fe] rounded-2xl'></div>}
      </div>
    </div>
  );
}

