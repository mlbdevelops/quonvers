"use client"

import { ChevronLeft, User, AlertTriangle, Palette, Lock, UserPen, UserX2, Smile, Trash2, MessageCircle, Users, CheckCircle, ArrowLeft, Pin, Share2, Images, Clock, Filter, Filter2, Eye, Send, Forward} from 'lucide-react'
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
  
  const options = [
    { 
      label: "Theme",
      icon: Palette,
      action: () => setThemePopUp(true) 
    },
    { 
      label: "Nicknames",
      icon: UserPen,
      action: () => setNicknamesPopUp(true)
    },
    { 
      label: "Quick reaction",
      icon: Smile
    },
    { 
      label: "Read receipts", 
      icon: Eye 
    },
    { 
      label: "Create a group chat",
      icon: Users
    },
    { 
      label: "View shared media files",
      icon: Images 
    },
    { 
      label: "Pinned messages",
      icon: Pin 
    },
    { 
      label: "Disappearing message",
      icon: Clock
    },
    { 
      label: "Share contact",
      icon: Share2
    },
    { 
      label: "Message filtering",
      icon: Filter
    },
    { 
      label: "Allow message sharing",
      icon: Forward
    },
    { 
      label: "Report",
      icon: AlertTriangle
    },
    { 
      label: "Block",
      icon: UserX2
    },
    { 
      label: "Delete conversation",
      icon: Trash2,
      danger: true 
    }
  ]
  
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
          e && setTimeout(() => closeFunc({close_type: 'theme', content: e}), 100);
        }else{
          setTimeout(() => {setThemePopUp(false)}, 100);
        }
      }}/>}
      
      {nicknamesPopUp && <Nicknames room_id={room} user={loggedUser} participants={room.participants} onClose={(e) => {
        if (e) {
          setNicknamesPopUp(false)
          e && closeFunc({close_type: 'nicknames', content: e});
        }else {
          setNicknamesPopUp(false);
        }
      }}/>}
      <div className='w-full overflow-scroll flex flex-col pb-10 flex-1'>
        {options.map(({label, icon: Icon, action, danger}) => (
          <div onClick={action || undefined} className='flex items-center gap-4 w-full p-4 pb-3 pt-3 active:bg-[#1d1d1d77]'>
            <Icon/>
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}