import { ChevronDown as Cd, Search } from 'lucide-react'
import Header from '@/components/elements/header'
import styles from '@/styles/transition.module.scss'
import { useState } from 'react'

export default function Location({onClose}){
  
  const [queryValues, setQuery] = useState([])
  
  const closeFunc = (val) => {
    onClose(val)
  }
  
  const mockLocs = [
    { country: 'Poland', capital: 'Warsaw' },
    { country: 'Germany', capital: 'Berlin' },
    { country: 'France', capital: 'Paris' },
    { country: 'United States', capital: 'Washington, D.C.' },
    { country: 'Japan', capital: 'Tokyo' },
    { country: 'Canada', capital: 'Ottawa' },
    { country: 'Australia', capital: 'Canberra' },
    { country: 'United Kingdom', capital: 'London' },
    { country: 'Italy', capital: 'Rome' },
    { country: 'Spain', capital: 'Madrid' },
    { country: 'Brazil', capital: 'Brasília' },
    { country: 'Russia', capital: 'Moscow' },
    { country: 'China', capital: 'Beijing' },
    { country: 'India', capital: 'New Delhi' },
    { country: 'Mexico', capital: 'Mexico City' },
    { country: 'Argentina', capital: 'Buenos Aires' },
    { country: 'South Korea', capital: 'Seoul' },
    { country: 'Netherlands', capital: 'Amsterdam' },
    { country: 'Sweden', capital: 'Stockholm' },
    { country: 'Norway', capital: 'Oslo' },
    { country: 'Denmark', capital: 'Copenhagen' },
    { country: 'Finland', capital: 'Helsinki' },
    { country: 'Switzerland', capital: 'Bern' },
    { country: 'Austria', capital: 'Vienna' },
    { country: 'Belgium', capital: 'Brussels' },
    { country: 'Ireland', capital: 'Dublin' },
    { country: 'New Zealand', capital: 'Wellington' },
    { country: 'South Africa', capital: 'Pretoria' },
    { country: 'Egypt', capital: 'Cairo' },
    { country: 'Nigeria', capital: 'Abuja' },
    { country: 'Kenya', capital: 'Nairobi' },
    { country: 'Turkey', capital: 'Ankara' },
    { country: 'Greece', capital: 'Athens' },
    { country: 'Portugal', capital: 'Lisbon' },
    { country: 'Ireland', capital: 'Dublin' },
    { country: 'Chile', capital: 'Santiago' },
    { country: 'Colombia', capital: 'Bogotá' },
    { country: 'Peru', capital: 'Lima' },
    { country: 'Venezuela', capital: 'Caracas' },
  ]
  
  return(
    <div className={`w-screen h-full bg-[#0f0f0f] flex flex-col items-center bottom-0 fixed z-1000 ${styles.trans}`}>
      <Header title='Locations' left={<Cd onClick={() => closeFunc('close')}/>}/>
      <div className='flex items-center justify-evenly w-full pb-5'>
        <input 
          type="text" 
          className='p-2 pr-3 pl-5 rounded-full bg-[#1d1d1d] outline-0 border-0' 
          placeholder='Search location...' 
          style={{
            width: '80%',
          }}
          onChange={(e) => {
            const val = mockLocs.filter(c => c.country.startsWith(e.target.value))
            setQuery(val)
          }}
        />
        <Search/>
      </div>
      <div className='w-full p-4 pt-0 flex flex-col gap-2 overflow-scroll flex-1'>
        {!queryValues.length? mockLocs.map((loc, i) => (
          <div onClick={() => closeFunc(loc.capital)} className='flex flex-col' key={i}>
            <span className='font-bold text-[18px]'>
              {loc.country}
            </span>
            <span className='text-[darkgray]'>
              • {loc.capital}
            </span>
          </div>
        )) : 
        queryValues.map((loc, i) => (
          <div onClick={() => closeFunc(loc.capital)} className='flex flex-col' key={i}>
            <span className='font-bold text-[18px]'>
              {loc.country}
            </span>
            <span className='text-[darkgray]'>
              • {loc.capital}
            </span>
          </div>
        ))}
      </div>
    </div> 
  )
}