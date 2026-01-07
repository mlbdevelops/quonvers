"use client"

import { ChevronLeft, Search } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function search(){
  const router = useRouter();
  const [result, setResult] = useState([]);
  const [currentUser, setCurrentUser] = useState('')
  
  useEffect(() => {
    const userId = JSON.stringify(localStorage.getItem('user')).id
    if (userId) {
      setCurrentUser(userId)
    }
  }, [])
  
  const keywordsMatch = async (value) => {
    const res = await fetch(`http://localhost:4000/api/search/keywords?keyword=${value}`)
    const data = await res.json()
    if (res.ok) {
      setResult(data.query.filter(u => u.id !== currentUser))
    }
  }
  
  return(
    <div className='flex flex-col items-center pt-5'>
      <div className='flex items-center justify-evenly w-90'>
        <ChevronLeft onClick={() => router.back()}/>
        <input 
          type="text" 
          className='bg-[#1d1d1d] rounded-xl pt-1 pb-1 pl-3 pr-3 outline-0'
          placeholder='Search...'
          onChange={(e) => keywordsMatch(e.target.value)}
        />
        <Search/>
      </div>
      {result.length >= 1 && 
        <div className='w-full flex flex-col items-start pt-6'>
          {result.map((query, i) => (
            <div key={i} 
              className='w-90 flex items-center gap-4 active:bg-[#1d1d1d9c] p-2 pl-3'
              onClick={() => router.push(`/chat/new/?user=${query.id}`)}
            >
              {query.profile? 
                <img 
                  src={query.profile}
                  className='h-11 w-11 rounded-full border border-[#1d1d1d]'
                /> 
                : 
                <div
                  className='w-11 h-11 rounded-full bg-[rgba(106,105,254,0.125)] text-[#6a69fe] flex items-center justify-center font-bold border border-[#1d1d1d]'
                >{query?.username.substring(0, 1).toUpperCase()}
                </div>
              }
              {query.username}
            </div>
          ))}
        </div>
      }
    </div>
  );
}