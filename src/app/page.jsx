"use client";

import Home from '@/app/pages/home';
import AuthPopUp from '@/app/pages/authPopUp';
import { useState, useEffect } from 'react';
import styles from '../styles/home.module.scss'

export default function App(){
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUser(user);
    }
    setIsLoading(false)
  }, []);
  
  if (isLoading) {
    return(
      <div className='w-full h-[100dvh] flex flex-col justify-center items-center gap-4'>
        <div className={styles.loader}></div> 
        Loading...
      </div>
    )
  }
  
  return(!isLoading && user.id? <Home/> : <AuthPopUp/>)
}