import styles from '@/styles/theme.module.scss'
import { useRef } from 'react'
import { X, Plus } from 'lucide-react'
import Header from '@/components/elements/header';
import Image from '@/components/elements/image'

export default function theme({close}){
  const bodyRef = useRef(null)
  
  const onCloseB = (photo_url) => {
    const ref = bodyRef.current
    ref && ref.classList.add(styles.removePopUp)
    close(photo_url)
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
      media: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZc3QRqCP14cDblmyw8TLAXLsCu_fJa0g0AaaMyvA6TLJb4j0anBckwRA&s=10'
    },
    {
      name: 'Gumball waterson',
      type: 'funny',
      media: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtM6B2QjRIB_eDT6fyUgfSE5ClVLHGvlUH95IJ8rv_-g&s=10'
    },
    {
      name: 'Dark space',
      type: 'space',
      media: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCvCICydabkUT4deVesiwnMKVGdK0mtu1pfvDA8y2YAg&s=10'
    },
    {
      name: 'Demon slayer(rengoku)',
      type: 'anime',
      media: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoC_yF1V4plXDDxoNMMyVy_X-RF9buxkHccanPKRSekHzl51GrHg-mZ2lv&s=10'
    },
    {
      name: 'Demon slayer(Kibutsuji Muzan)',
      type: 'anime',
      media: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD_XfVBnX8HZqY47SgEB46yAtDXwt4tcb8UqzDe4p9XJm4Wq07wMLWg0c&s=10'
    },
    {
      name: 'Demon slayer(Tanjiro Kamado)',
      type: 'anime',
      media: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFpagUZqPcJ0gZAhnw3DXeP-Y3ID-y0FftxSTPxQAKfA&s=10'
    },
    {
      name: 'Demon slayer(Nezuko Kamado)',
      type: 'anime',
      media: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3UVYicmATg4647Q1vyagvZ-4Ln4a529fdA1_PVYKLE8wfl8oB1NvawWh2&s=10'
    },
    {
      name: 'Gachiakuta(Rudo)',
      type: 'anime',
      media: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0mVEABVd8MWAcBTT-syTkh3iCqjzyxDLZ2xLo5Ml_AA&s=10'
    },
    {
      name: 'Heart',
      type: 'anime',
      media: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt5dQc9dKCEHyqzxvKHy7hG0pNmVITk5m4ayHwGoCAl7kHRM3_aL24BjM&s=10'
    },
    {
      name: 'Kpop demon hunters',
      type: 'anime',
      media: 'https://imagedelivery.net/c2SKP8Bk0ZKw6UDgeeIlbw/e7ee10da-e822-48f4-df4d-298aab99da00/public'
    },
    {
      name: 'Kpop demon hunters',
      type: 'anime',
      media: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8hmDRy1NtZbqCLkN1MXquc9upkpIX7x0pOWRoLt119A&s=10'
    },
    {
      name: 'Kpop demon hunters',
      type: 'anime',
      media: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB7_gNJGpsTTCl0jv0u8ALZ5PTbsJe9Pp4DpztrZwNrXUujOfYrGY7ESKZ&s=10'
    },
    {
      name: 'Kpop demon hunters',
      type: 'anime',
      media: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4-DBJg5ZOAfyOQ09S3egp4hFBkkEmCMdFdsJAd3VD_Q&s=10',
    },
  ]
  
  return(
    <div ref={bodyRef} className={`h-[100%] w-[100%] fixed bottom-0 bg-[#0f0f0f] overflow-hidden flex flex-col items-center ${styles.popUp}`} style={{
      zIndex: 10000,
    }}>
      <Header 
        left={<X onClick={() => onCloseB()} />}
        title='Theme'
        title_size='text-[19px]'
      />
      
      <div className='grid grid-cols-3 overflow-scroll w-[95%]'
        style={{
          height: '90%',
          //gridTemplateColumns: 'repeat(3, 1fr)'
        }}
      >
        <div className='flex flex-col active:scale-95 transition' style={{
              transform: 'scale(0.93)',
            }}>
          <div className='w-[110px] h-[200px]  rounded-2xl flex items-center justify-center' style={{
            background: 'radial-gradient(#00008f, #7400cd)',
          }}>
            <Plus size={50}/>
          </div>
          <small
            className='font-bold ml-2'
          >Upload</small>
        </div>
        
        {mockThemes.map((theme, i) => (
          <div onClick={() => onCloseB({
            theme_url: theme.media,
            theme_name: theme.name,
          })} className='flex flex-col active:scale-95 transition'
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
              className='w-[110px] h-[200px]  rounded-2xl bg-[#6a69fe33]'></div>
            <small
              className='font-bold ml-2'
            >{theme.name}</small>
          </div>
        ))}
      </div>
    </div>
  )
}