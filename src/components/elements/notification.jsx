import { MessageCircle, Heart } from 'lucide-react';

export default function NotificationBox({notification}) {
  return(
    <div className={`w-[100%] flex p-2 gap-2 items-center ${notification.isSeen? '' : 'bg-[#6a69fe17]'} active:bg-[rgb(26,26,26)]`}>
      
      <div className='h-13 w-13 flex gap-2 items-center justify-center text-[#6a69fe] rounded-full bg-[rgba(106,105,254,0.125)] font-bold' style={{
        position: 'relative',
      }}>
        {notification.user.username[0].toUpperCase()}
        <div style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          backgroundColor: 'white',
          borderRadius: '50px',
          padding: 4,
        }}>
          {notification.notifType === 'like'? <Heart fill='#6a69fe' size={13}/> : <MessageCircle color='' fill='#18cc00' size={13}/>}
        </div>
      </div>
      <div className='flex flex-col gap-1 items-start'>
        <span className='flex gap-1'>
          <strong>
            {notification.user.username} 
          </strong>
          {notification.msg}
        </span>
        <small className='text-[#818181]'>
          {notification.time}
        </small>
      </div>
    </div>
  );
}