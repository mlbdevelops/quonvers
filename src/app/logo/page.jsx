import { MessageCircle, Send } from 'lucide-react'

export default function logo(){
  return(
    <div className='flex flex-col h-[100dvh] w-full items-center justify-center relative'>
      <MessageCircle size={150} color='' fill={'#6a69fe'}/>
      <MessageCircle size={100} color='' fill={'#6a69fe'} style={{
        transform: 'rotate(280deg)',
        position: 'absolute',
        marginLeft: 100,
        marginTop: 30,
      }}/>
      <Send className='absolute' fill='white' size={50}/>
    </div>
  );
}