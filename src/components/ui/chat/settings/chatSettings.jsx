"use client"

import { ChevronLeft, User, AlertTriangle, Palette, Lock, UserPen, UserX2, Smile, Trash2, MessageCircle, Users } from 'lucide-react'
import Header from '@/components/elements/header'
import Theme from '@/components/ui/chat/settings/theme'
import styles from '@/styles/chatSettings.module.scss'
import { useState } from 'react'

export default function ChatSettings({onClose, room, loggedUser}){
  const [recipient, setRecipient] = useState(room.participants?.find((p) => p.id !== loggedUser) || {});
  const [currentUser, setCurrentUser] = useState(room.participants?.find((p) => p.id === loggedUser) || {});
  const [themePopUp, setThemePopUp] = useState(false)
  
  const closeFunc = () => {
    onClose(true)
  }
  
  return(
    <div
      className={`w-full h-full bg-[#0a0a0a] flex flex-col items-center fixed top-0 ${styles.settingsContainer}`}
      style={{
        zIndex: 1000,
      }}
    >
      <Header 
        title='Settings'
        left={
          <ChevronLeft onClick={closeFunc}/>
        }
      />
      
      {themePopUp && <Theme close={(e) => {
        setTimeout(function() {setThemePopUp(false)}, 300);
      }}/>}
      
      <div className='flex relative w-50 gap-10 items-center mt-10'>
        {recipient?.profile? <img src={recipient.profile} className='w-[110px] h-[110px] bg-[rgba(106,105,254,0.125)] text-[#6a69fe] rounded-full mr-10 flex items-center justify-center font-bold border border-gray-900'/> : <div className='w-[110px] h-[110px] bg-[rgba(106,105,254,0.125)] text-[#6a69fe] rounded-full mr-10 flex items-center justify-center font-bold text-4xl'>
          {recipient.name[0].toUpperCase()}
        </div>}
        
        {currentUser?.profile? <img src={currentUser.profile} className='w-[110px] h-[110px] bg-red-700 rounded-full absolute right-0 flex items-center justify-center font-bold bg-[rgba(106,105,254,0.125)] text-[#6a69fe]' /> : <div className='w-[110px] h-[110px] rounded-full absolute right-0 flex items-center justify-center font-bold bg-[rgba(106,105,254,0.125)] text-[#6a69fe] text-4xl'>
          {currentUser.name[0].toUpperCase()}
        </div>}
      </div>
      
      <div className='flex items-center gap-7 m-5 mt-8 mb-8'>
        <div className='flex flex-col items-center gap-1 text-[15px]'>
          <User/>
          Profile
        </div>
        <div className='flex flex-col items-center gap-1 text-red-500 text-[15px]'>
          <AlertTriangle/>
          Report
        </div>
        <div className='flex flex-col items-center gap-1 text-red-500 text-[15px]'>
          <UserX2/>
          Block
        </div>
        <div className='flex flex-col items-center gap-1 text-red-500 text-[15px]'>
          <Trash2/>
          Delete
        </div>
      </div>
      
      <div className={'w-full flex flex-col gap-2'}>
        <div onClick={() => setThemePopUp(true)} className='flex items-center gap-4 p-2 ml-2'>
          <Palette/>
          Theme
        </div>
        <div className='flex items-center gap-4 p-2 ml-2'>
          <UserPen/>
          Nicknames
        </div>
        <div className='flex items-center gap-4 p-2 ml-2'>
          <Smile/>
          Quick reaction
        </div>
        <div className='flex items-center gap-4 p-2 ml-2'>
          <MessageCircle/>
          Read receipts
        </div>
        <div className='flex items-center gap-4 p-2 ml-2'>
          <Lock/>
          Privacy
        </div>
        <div className='flex items-center gap-4 p-2 ml-2'>
          <Users/>
          Create a group chat
        </div>
      </div>
      
    </div>
  );
}