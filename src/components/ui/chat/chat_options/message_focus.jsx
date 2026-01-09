import { Plus, Forward, Share, Copy, AlertTriangle, Trash2, Pen, MessageCircleReply } from 'lucide-react';
import styles from '@/styles/transition.module.scss';

export default function MsgFocus({onClose, msg, user}){
  const reactions = [
    '😂',
    '🔥',
    '❤️',
    '😭',
    '👎',
    '👀'
  ]
  
  const options = [
    {
      label: 'Reply',
      icon: MessageCircleReply,
    },
    {
      label: 'Forward',
      icon: Forward,
    },
    {
      label: 'Edit',
      icon: Pen,
      display: msg.sender_id === user || false,
    },
    {
      label: 'Copy',
      icon: Copy,
    },
    {
      label: 'Report',
      icon: AlertTriangle,
    },
    {
      label: 'Delete',
      icon: Trash2,
      display: msg.sender_id === user || false,
      danger: true,
    },
  ]
  
  return(
    <div
      className='h-screen w-screen top-0 fixed bg-[#00000097] backdrop-blur-lg z-100 flex items-center justify-center' onClick={() => typeof onClose == 'function' && onClose()}>
      <div className={`w-full h-auto min-h-100 flex items-center flex-col gap-2 ${styles.height_scale}`}>
        <div onClick={(e) => e.stopPropagation()} className={`w-[95%] h-15 rounded-full bg-[#161616] flex items-center p-3 gap-1 justify-evenly ${styles.width_scale}`}>
          {reactions.map((obj, i) => (
            <span 
              key={i}
              className='text-[33px]'
            >
              {obj}
            </span>
          ))}
          <Plus 
            size={50}
            className='p-1 h-10 w-10 rounded-full bg-[#1f1f1f]'
          />
        </div>
        <div onClick={(e) => e.stopPropagation()} className={`${msg.sender_id === user? 'self-end' : 'self-start'} mr-4 ml-4 max-w-[250px] ${msg.sender_id === user? 'bg-[#6a69fe]' : 'bg-[#2c1e55]'} pt-[8px] pb-[8px] pl-[12px] pr-[12px] text-[14.5] break-words text-ellipsis`} style={{
          borderRadius: msg.sender_id === user? '20px 20px 5px 20px' : '20px 20px 20px 5px',
          backgroundColor: msg.type === 'text'? '' : 'transparent',
          fontSize: msg.type === 'text'? null : 40,
          padding: msg.type === 'text'? null : 0,
        }}>
          {msg?.content.length >= 70 && msg.type == 'text'? `${msg?.content.substring(0, 70)}...` : msg.type == 'emoji'? msg.content.substring(0, 8) : msg.content}
        </div>
        <div onClick={(e) => e.stopPropagation()} className={`w-[45%] bg-[#151515] flex flex-col items-center rounded-2xl justify-center pt-2 pb-2 ${msg.sender_id === user? 'self-end' : 'self-start'} mr-4 ml-4 overflow-hidden ${styles.scale}`}>
          {options.map(({label, icon: Icon, danger}, i) => (
            <div 
              key={i}
              className={`w-full flex items-center gap-4 h-[40px] pl-4 pr-4 justify-between ${danger && 'text-red-500'} active:bg-[#1d1d1d]`}
            >
              <span>
                {label}
              </span>
              <Icon size={20}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}