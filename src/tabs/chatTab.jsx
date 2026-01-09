import { MessageCircle, Menu, Search, UserCircle} from 'lucide-react'
import Header from '@/components/elements/header'
import ChatBox from '@/components/elements/chatBox'
import ChatSkeleton from '@/components/ui/chatSkeleton'
import { useEffect, useState } from 'react'
import useCache from '@/hooks/quonversCachingSystem'
import dayjs from '@/utils/dayjs.js'
import socket from "@/sockets/socket";

export default function ChatTab({onEmit}){
  
  const { setProvider, getProvider } = useCache()
  const [conversations, setConversations] = useState(getProvider('conversationsList') || []);
  const [user, setUser] = useState('');
  const [load, setLoad] = useState(true);
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user?.id) {
      setUser(user.id)
    }
  }, [])
  
  const log_out = () => {
    localStorage.clear()
    location.reload()
  }
  
  useEffect(() => {
    try {
      const token = JSON.parse(localStorage.getItem('token'))
      const getConvs = async () => {
        const cached = await getProvider('conversationsList') || []
        if (cached.length >= 1) return
        const res = await fetch('http://localhost:4000/api/chat/conversationList', {
          headers: {
            token
          }
        })
        const data = await res.json()
        
        if (res.ok && data.rooms.length) {
          setConversations(data.rooms)
          setProvider('conversationsList', data.rooms)
          setLoad(false)
        }
      }
      getConvs()
    } catch (error) {
      console.error(error);
    }
  }, [])
  
  useEffect(() => {
    const handler = (data) => {
      setConversations(prev => {
        const index = prev.findIndex(c => c.id === data.roomId)
        if (index === -1) return prev
        
        const conv = prev[index]
        const reci = conv.participants.find(p => p.id === data.sender_id)
        const updatedConv = {
          ...conv,
          lastMsg: {
            ...conv.lastMsg,
            content: data.content,
            sender: {
              ...conv.lastMsg.sender,
              name: reci?.name,
              username: reci?.username
            }
          }
        }
        
        const filtered = prev.filter((c, i) => i !== index)
        return [updatedConv, ...filtered]
      })
      onEmit()
    }
    
    socket.on('receive_message', handler)
    return () => socket.off('receive_message', handler)
  }, [])
  
  return(
    <div className='h-screen w-full text-center flex justify-between items-center flex-col'>
      <Header title='Messages' right={[<Menu size={22} key={1}/>, <UserCircle onClick={log_out} key={2}/>]}/>
      <div className='flex-1 flex w-[100%] pt-2 flex-col items-center overflow-scroll pb-25'>
        <div 
          type='text'
          className='bg-[#1d1d1d] p-3 pl-5 pr-5 rounded-[50px] w-[94%] flex items-center text-[darkgray] justify-start gap-3' 
        ><Search size={20}/> Search...</div>
        <div className='w-[100%] flex flex-col mt-4'>
          {conversations.length >= 1? conversations.map((msg, i) => {
            const getOtherUser = msg?.participants.find(u => u.id !== user)
            return (
              <ChatBox 
                key={i}
                name={getOtherUser?.name}
                time={msg?.updatedAt}
                is_read={msg?.seen_by}
                message={msg?.lastMsg.content}
                lastMsgSender={msg?.lastMsg.sender.name}
                lastMsgSenderId={msg?.lastMsg.sender.id}
                loggedUserId={user}
                roomId={msg?.id}
                profile={getOtherUser?.profile}
              />
            )
          }) : null}
        </div>
        
        {load && 
          <>
            <ChatSkeleton/>
            <ChatSkeleton/>
          </>
        }
        
      </div>
    </div>
  );
}