"use client"

import socket from "@/sockets/socket";
import { useEffect, useState } from 'react'
import Footer from '@/components/elements/footer'
import { 
  MessageCircle,
  Settings,
  Bell, 
  Heart,
  PlusCircle,
  User,
  Home as H,
  GalleryHorizontalEnd
} from 'lucide-react'
import ChatTab from '@/tabs/chatTab.jsx'
import NotificationsTab from '@/tabs/notificationTab.jsx'
import SettingsTab from '@/tabs/settingsTab.jsx'
import DiscoverTab from '@/tabs/discoverTab.jsx'
import Stories from '@/tabs/story'
import Create_popup from '@/components/post/create_popup'
import useCache from '@/hooks/quonversCachingSystem.js'
import Notif_toast from '@/components/ui/toasts/notif_toast'

export default function Home(){
  const { setProvider, getProvider } = useCache()
  const [activeTab, setActiveTab] = useState(getProvider('homeTab') || 1)
  const [create_post, setCreate_post] = useState(false)
  const [show_toast, set_show_toast] = useState(false)
  const [create_popup, setCreate_popup] = useState(false)
  const [new_chat_emitted, set_new_chat_emitted] = useState(false)
  const [msg_data, set_msg_data] = useState({})
  
  useEffect(() => {
    const new_msg_handler = (data) => {
      set_new_chat_emitted(true)
      set_show_toast(true)
      console.log(data?.roomId)
      set_msg_data({
        type: 'msg',
        description: data?.content,
        room_id: data?.roomId,
      })
    }
    
    const new_theme_handler = (data) => {
      console.log(data?.room_id)
      set_new_chat_emitted(true)
      set_show_toast(true)
      set_msg_data({
        type: 'theme',
        description: data?.msg,
        room_id: data?.room_id,
        name: data?.changer,
        theme_data: data?.new_theme
      })
    }
    
    socket.on('receive_message', new_msg_handler)
    socket.on('theme_changed', new_theme_handler)
    return () => {
      socket.off('receive_message')
      socket.off('theme_changed')
    }
  }, [])
  
  const tabs = [
    <ChatTab onEmit={() => set_new_chat_emitted(true)} key={1}/>,
    <Stories key={4}/>,
    <NotificationsTab key={3}/>,
    <DiscoverTab key={2}/>,
  ]
  
  const changeTab = (tab) => {
    if (!tab) {
      return
    }
    create_popup && setCreate_popup(false)
    setProvider('homeTab', tab);
    setActiveTab(getProvider('homeTab') || 1);
    
    if (tab == 1 && new_chat_emitted) {
      set_new_chat_emitted(false)
    }
  };
  
  return(
    <div>
      {tabs[activeTab - 1]}
      {create_popup && <Create_popup onClose={(e) => {
        setCreate_popup(false)
        e == 1 && setTimeout(() => setCreate_post(true), 100)
      }}/> }
      {show_toast && activeTab != 1 && !create_popup && !create_post && 
        <Notif_toast 
          type={msg_data?.type} 
          room={msg_data?.room_id} 
          onClose={() => set_show_toast(false)} 
          description={msg_data?.description}
          media={msg_data?.theme_data?.theme_url || null}
          user={{name: msg_data?.name || 'Notr'}}
        />}
      
      <Footer elems={[
        <div key={7} className='relative'>
          {new_chat_emitted && <div className='w-3 h-3 rounded-full bg-red-500 absolute right-[-1px] top-[-1px] border border-2 border-[#0a0a0a]'></div>}
          <MessageCircle 
            color={activeTab == 1? '#6a69fe' : 'darkgray'} 
            fill={activeTab == 1? '#6a69fe' : 'transparent'} 
            onClick={() => changeTab(1)}/>
        </div>,
        <GalleryHorizontalEnd 
          color={activeTab == 2? '#6a69fe' : 'darkgray'} 
          fill={activeTab == 2? '#6a69fe' : 'transparent'} 
          key={3} 
          onClick={() => changeTab(2)}/>,
        
        <Bell 
          color={activeTab == 3? '#6a69fe' : 'darkgray'} 
          fill={activeTab == 3? '#6a69fe' : 'transparent'} 
          key={5} 
          onClick={() => changeTab(3)}
          
        />,
        <Heart
          key={2} 
          onClick={() => changeTab(4)}
          color={activeTab == 4? '#6a69fe' : 'darkgray'}
          fill={activeTab == 4? '#6a69fe' : 'transparent'}
        />
      ]}/>
    </div>
  )
}