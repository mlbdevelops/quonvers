import styles from '@/styles/skeletons.module.scss'

export default function ChatSkeleton(){
  return(
    <div className={`flex justify-between w-full h-[65px] p-3 items-center z-0 gap-2 ${styles.chatSkeleton}`}>
      <div>
        <div className={'bg-[#1d1d1d] w-13 h-13 rounded-[100px] flex justify-center items-center text-[#6a69fe] font-bold '}></div>
      </div>
      <div className='flex gap-2 flex-col items-start flex-1'>
        <div className='w-30 rounded-2xl h-3 bg-[#1d1d1d]'></div>
        <div className='w-50 rounded-2xl h-3 bg-[#1d1d1d]'></div>
      </div>
    </div>
  );
}