"use client"

import { ChevronLeft, User, AlertTriangle, Palette, Lock, UserPen, UserX2, Smile, Trash2, MessageCircle, Users, CheckCircle, ArrowLeft, Pin, Share2, Images, Clock, Filter, Filter2, Eye, Send } from 'lucide-react'
import Header from '@/components/elements/header'
import Theme from '@/components/ui/chat/settings/theme'
import Nicknames from '@/components/ui/chat/settings/nicknames';
import styles from '@/styles/chatSettings.module.scss'
import { useState } from 'react'
import Image from '@/components/elements/image'

export default function ChatSettings({onClose, room, loggedUser}){
  const [recipient, setRecipient] = useState(room.participants?.find((p) => p.id !== loggedUser) || {});
  const [currentUser, setCurrentUser] = useState(room.participants?.find((p) => p.id === loggedUser) || {});
  const [themePopUp, setThemePopUp] = useState(false)
  const [nicknamesPopUp, setNicknamesPopUp] = useState(false)
  
  const closeFunc = (params) => {
    onClose(params)
  }
  
  return(
    <div
      className={`w-full h-full bg-[#0a0a0a] flex flex-col items-center fixed top-0 ${styles.settingsContainer}`}
      style={{
        zIndex: 1000,
      }}
    >
      <Header 
        left={
          <ArrowLeft onClick={closeFunc}/>
        }
      />
      
      {themePopUp && <Theme close={(e) => {
        if (e) {
          setTimeout(() => {setThemePopUp(false)}, 300);
          e && setTimeout(() => closeFunc({close_type: 'theme', content: e}), 300);
        }else{
          setTimeout(() => {setThemePopUp(false)}, 300);
        }
      }}/>}
      
      {nicknamesPopUp && <Nicknames participants={room.participants} onClose={(e) => {
        if (e) {
          setNicknamesPopUp(false)
          e && closeFunc({close_type: 'nicknames', content: e});
        }else {
          setNicknamesPopUp(false);
        }
      }}/>}
      
      <div className='w-full overflow-scroll flex items-center justify-center flex-col flex-1'>
        
        <div className={'w-full flex flex-col gap-2 mb-10'}>
          <div onClick={() => setThemePopUp(true)} className='flex items-center gap-4 p-2 ml-2'>
            <Palette/>
            Theme
          </div>
          <div onClick={() => setNicknamesPopUp(true)} className='flex items-center gap-4 p-2 ml-2'>
            <UserPen/>
            Nicknames
          </div>
          <div className='flex items-center gap-4 p-2 ml-2'>
            <Smile/>
            Quick reaction
          </div>
          <div className='flex items-center gap-4 p-2 ml-2'>
            <Eye/>
            Read receipts
          </div>
          <div className='flex items-center gap-4 p-2 ml-2'>
            <Send/>
            Allow message sharing
          </div>
          <div className='flex items-center gap-4 p-2 ml-2'>
            <Users/>
            Create a group chat
          </div>
          <div className='flex items-center gap-4 p-2 ml-2'>
            <Images/>
            View shared media files
          </div>
          <div className='flex items-center gap-4 p-2 ml-2'>
            <Pin/>
            Pinned messages
          </div>
          <div className='flex items-center gap-4 p-2 ml-2'>
            <Clock/>
            Disappearing message
          </div>
          <div className='flex items-center gap-4 p-2 ml-2'>
            <Share2/>
            Share contact
          </div>
          <div className='flex items-center gap-4 p-2 ml-2'>
            <Filter/>
            Message filtering
          </div>
          <div className='flex items-center gap-4 p-2 ml-2'>
            <AlertTriangle/>
            Report
          </div>
          <div className='flex items-center gap-4 p-2 ml-2'>
            <UserX2/>
            Block
          </div>
          <div className='flex items-center gap-4 p-2 ml-2 text-red-500'>
            <Trash2/>
            Delete conversation
          </div>
        </div>
      </div>
      
    </div>
  );
}