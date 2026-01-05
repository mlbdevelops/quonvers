
export default function Header({title, left, right, title_size}){
  return(
    <div className='flex justify-between items-center color-white-500 w-[94%] pl-2 pr-2 h-[65px]'>
      <div className={'flex gap-3.5 items-center'}>
        {left}
        <strong className={`${title_size? title_size : 'text-2xl'}`}>
          {title && title}
        </strong>
      </div>
      <div className='text-[darkgray] flex items-center gap-5'>
        {right}
      </div>
    </div>
  )
}