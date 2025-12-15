import fade from '@/styles/fade.module.scss'

export default function postSkeleton(){
  return(
    <div className={`w-[98%] flex flex-col gap-3 p-5 pl-2 pr-2 ${fade.fade}`}>
      <div className='flex justify-between items-center'>
        <div className='flex gap-2'>
          <div className='h-12 w-12 flex items-center justify-center rounded-full bg-[#1d1d1d] text-[#6a69fe]'></div>
          <div className='flex flex-col text-left justify-center gap-2'>
            <div className='w-40 h-3 rounded-full bg-[#1d1d1d]'></div>
            <div className='w-20 h-3 rounded-full bg-[#1d1d1d]'>
            </div>
          </div>
        </div>
      </div>
      <div className='w-[86%] h-3 rounded-full bg-[#1d1d1d] ml-3'></div>
      <div className='w-[60%] h-3 rounded-full bg-[#1d1d1d] ml-3'></div>
      <div className='w-[70%] h-3 rounded-full bg-[#1d1d1d] ml-3'></div>
      <div className='flex gap-5 ml-2 text-[#c5c5c5]'>
        <div className='flex items-center bg-[#1d1d1d] w-5 h-5 rounded-full'></div>
        <div className='flex items-center bg-[#1d1d1d] w-5 h-5 rounded-full'></div>
        <div className='flex items-center bg-[#1d1d1d] w-5 h-5 rounded-full'></div>
      </div>
    </div>
  );
}