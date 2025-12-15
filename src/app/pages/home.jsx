"use client"

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
  GalleryHorizontalEnd,
  Card
} from 'lucide-react'
import ChatTab from '@/app/pages/tabs/chatTab.jsx'
import NotificationsTab from '@/app/pages/tabs/notificationTab.jsx'
import SettingsTab from '@/app/pages/tabs/settingsTab.jsx'
import DiscoverTab from '@/app/pages/tabs/discoverTab.jsx'
import Stories from '@/app/pages/tabs/story'
import Create_popup from '@/components/post/create_popup'
import Create_post from '@/components/post/create_post'
import useCache from '@/hooks/quonversCachingSystem.js'

export default function Home(){
  const { setProvider, getProvider } = useCache()
  const [activeTab, setActiveTab] = useState(getProvider('homeTab') || 1)
  const [create_post, setCreate_post] = useState(false)
  const [create_popup, setCreate_popup] = useState(false)
  
  const tabs = [
    <DiscoverTab key={2}/>,
    <NotificationsTab key={3}/>,
    <Stories key={4}/>,
    <ChatTab key={1}/>,
  ]
  
  const icons = [
    <H key={2}/>,
    <Bell key={5}/>,
    <PlusCircle key={4}/>,
    <MessageCircle key={1}/>,
    <Card key={3}/>,
  ]
  
  const changeTab = (tab) => {
    if (!tab) {
      return
    }
    create_popup && setCreate_popup(false)
    setProvider('homeTab', tab);
    setActiveTab(getProvider('homeTab') || 1);
  };
  
  return(
    <div>
      {tabs[activeTab - 1]}
      {create_post && <Create_post onClose={() => setCreate_post(false)}/> }
      {create_popup && <Create_popup onClose={(e) => {
        setCreate_popup(false)
        e == 1 && setTimeout(() => setCreate_post(true), 100)
      }}/> }
      
      <Footer elems={[
        <H 
          key={2} 
          onClick={() => changeTab(1)}
          color={activeTab == 1? '#6a69fe' : 'darkgray'}
        />,
        <Bell color={activeTab == 2? '#6a69fe' : 'darkgray'} key={5} onClick={() => changeTab(2)}/>,
        <PlusCircle size={25} key={4} onClick={() => setCreate_popup(!create_popup)}/>,
        <GalleryHorizontalEnd color={activeTab == 3? '#6a69fe' : 'darkgray'} key={3} onClick={() => changeTab(3)}/>,
        <MessageCircle color={activeTab == 4? '#6a69fe' : 'darkgray'} key={1} onClick={() => changeTab(4)}/>,
      ]}/>
    </div>
  )
}