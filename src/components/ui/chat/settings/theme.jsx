import styles from '@/styles/theme.module.scss'
import { useRef } from 'react'
import { ChevronDown } from 'lucide-react'

export default function theme({close}){
  const bodyRef = useRef(null)
  
  const onCloseB = () => {
    const ref = bodyRef.current
    ref && ref.classList.add(styles.removePopUp)
    close(true)
  }
  
  const mockThemes = [
    {
      name: 'Heart',
      type: 'Heart and love',
      media: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQDJN2_MwiAAjxJFJGZGfhRmYNmO4bgBLodm7ZlZStCN_Oqwz-yLD3T8w&s=10'
    },
    {
      name: 'Wednesday',
      type: 'Heart and love',
      media: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-OxEQLjUxAD-OTJ-5Md8GtZ7RQrTGFG_yWiidWnm2S3qQXjM7kple7-I&s=10'
    },
    {
      name: 'KPOP DEMON hunters (Huntrix)',
      type: 'Heart and love',
      media: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpl2rQHwNy3FnBxk_A9B3Wmh0bM67SrfD71lbme6SgZw&s=10'
    },
    {
      name: 'Asterix & Obélix',
      type: 'Heart and love',
      media: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQijkN9N5cN0l4X2bW0lPEZ6yGeSF2OLupjaltd6e6oOg&s=10'
    },
    {
      name: 'Cyberpunk',
      type: 'cyber',
      media: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWbmfT0w4dU6XuKc3pW9mlRYugyasesyiY1mC6ELpNs_jXgevwWDc5Tbo&s=10'
    },
    {
      name: 'Gumball waterson',
      type: 'funny',
      media: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbZRCm3hMvKtp6fEEZ3ghQM8nhczkQRbEiMiMjm4ae1g&s=10'
    },
  ]
  
  return(
    <div ref={bodyRef} className={`h-[80%] w-full fixed bottom-0 bg-[#1d1d1d] overflow-hidden flex flex-col rounded-t-[50px] ${styles.popUp}`} style={{
      zIndex: 10000,
    }}>
      <p
        className='font-bold text-2xl text-center m-5 mt-0 flex items-center mt-10'
      >
        <span onClick={onCloseB}><ChevronDown/></span>
        <span className='ml-5'>Themes</span>
      </p>
      
      
      <div className='grid grid-cols-3 gap-1 overflow-scroll p-2 pb-5'
        style={{
          height: '90%',
          //gridTemplateColumns: 'repeat(3, 1fr)'
        }}
      >
        {mockThemes.map((theme, i) => (
          <div onClick={onCloseB} className='flex flex-col'
            style={{
              transform: 'scale(0.93)',
            }}
          >
            <div 
              style={{
                backgroundImage: `url(${theme.media})`,
                objectFit: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
              className='w-[110px] h-[200px]  rounded-2xl'></div>
            <small
              className='font-bold ml-2'
            >{theme.name}</small>
          </div>
        ))}
      </div>
    </div>
  )
}