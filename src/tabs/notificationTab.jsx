import Header from '@/components/elements/header'
import NotificationBox from '@/components/elements/notification'
import { UserCircle } from 'lucide-react'

export default function notificationsTab(){
  
  const mockNotifications = [
    {
      user: {
        userid: '1927',
        username: 'jack922',
      },
      msg: 'has liked your post',
      notifType: 'like',
      time: '1min ago',
      isSeen: false
    },
    {
      user: {
        userid: '192837',
        username: 'john8363',
      },
      msg: 'has commented your post',
      notifType: 'comment',
      time: '1h ago',
      isSeen: true
    },
    {
      user: {
        userid: '1927',
        username: 'alice',
      },
      msg: 'has liked your post',
      notifType: 'like',
      time: '3min ago',
      isSeen: true
    },
    {
      user: {
        userid: '1927',
        username: 'jack',
      },
      msg: 'has liked your post',
      notifType: 'like',
      time: '1min ago',
      isSeen: false
    },
    {
      user: {
        userid: '1927',
        username: 'jack',
      },
      msg: 'has liked your post',
      notifType: 'like',
      time: '1min ago',
      isSeen: false
    },
  ]
  
  return(
    <div className='h-screen w-full text-center flex justify-between items-center flex-col'>
      <Header 
        title='Notifications'
        right={[
          <UserCircle key={3} onClick={() => router.push('/search')}/>,
        ]}
      />
      <div className='w-full flex-1 flex flex-col items-center overflow-scrollf pb-20'>
        
        {mockNotifications.map((notif, i) => (
          <NotificationBox key={i} notification={notif}/>
        ))}
        
      </div>
    </div>
  );
}