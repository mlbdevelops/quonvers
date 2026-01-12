import styles from '@/styles/authPopUp.module.scss'
import Login from '@/components/auth/login'
import { UserPlus, Lock } from 'lucide-react';
import { useState, useEffect } from 'react'
import { auth, provider, signInWithPopup } from "@/firebase/googleAuth.js";
import Load from '@/components/ui/loading'
import Confirm from '@/components/ui/confirm'
import { Capacitor } from '@capacitor/core'
import { BackButton } from '@/hooks/backButton'

export default function AuthPopUp(){
  const [text, setText] = useState('');
  const [login, setLogin] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [is_native, set_is_native] = useState(true)
  const words = ['Quonvers', 'Chat', 'Meet', 'Explore'];
  
  useEffect(() => {
    async function check_platform (){
      if (await Capacitor.isNativePlatform()) return set_is_native(true)
      return set_is_native(false)
    }
    check_platform()
  }, [])
  
  const [load, setLoad] = useState(false);
  const [notif, setNotif] = useState({});
  
  async function signInWithGoogle() {
    setLoad(true)
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();
      const res = await fetch('http://localhost:4000/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      const data = await res.json()
      
      if (!res.ok) {
        setNotif({
          error: true,
          msg: data.msg,
          title: 'Google error'
        })
        setLoad(false)
      }
      
      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('token', JSON.stringify(data.token))
        location.reload()
      }
      
    } catch (error) {
      setNotif({
        error: true,
        msg: `Oops, something bad happened, check your network connection and try again, if the problem persists contact us.`,
        title: 'Google error'
      })
      setLoad(false)
    }
  }
  
  BackButton(() => {
    login && setLogin(false)
    notif && setNotif({})
  })
  
  useEffect(() => {
    const currentWord = words[wordIndex];
    const typingSpeed = 120;
    const deletingSpeed = 80;
    const wordDelay = 1200;
    let timer;
    
    if (!isDeleting && text.length < currentWord.length) {
      timer = setTimeout(() => {
        setText(prev => prev + currentWord[text.length]);
      }, typingSpeed);
    } else if (isDeleting && text.length > 0) {
      timer = setTimeout(() => {
        setText(prev => prev.substring(0, prev.length - 1));
      }, deletingSpeed);
    } else if (!isDeleting && text.length === currentWord.length) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, wordDelay);
    } else if (isDeleting && text.length === 0) {
    setIsDeleting(false);
    setWordIndex(prev => (prev + 1) % words.length);
    }
    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words]);
  
  
  return(
    <div className={styles.back}>
      <div className={styles.q}></div>
      <div className={styles.q2}></div>
      <div className={styles.body}>
        {load && <Load/>}
        {notif && notif.title && <Confirm
          msg={notif.msg}
          title={notif.title}
          onClose={() => setNotif({})}
          onSubmit={() => setNotif({})}
          cancel
          cancel_button_text='Report'
          submit_button_text='Try again'
        />}
        <h1 
          className={styles.h1}
          style={{
            marginTop: is_native? 70 : ''
          }}
        >{text}</h1> 
        <div className={styles.optionsDiv}> 
          <div className={styles.option}>
            <div className={styles.icon}>
              <UserPlus size={17}/>
            </div>
            Create an account
          </div>
          <div onClick={() => setLogin(true)} className={styles.option}>
            <div className={styles.icon}>
              <Lock size={17}/>
            </div>
            Login
          </div>
          <div className={styles.divider}>
            <div className={styles.div}></div>
            Or
            <div className={styles.div}></div>
          </div>
          <div onClick={signInWithGoogle} className={styles.option}>
            <div style={{fontSize: 20}} className={styles.icon}>
              G
            </div>
            continue with Google
          </div>
          <span className='text-center text-[12px] pl-2 pr-2'>
            By continuing, you're agree to our <strong className='text-[#6a69fe]'>
            Privacy policy</strong> and <strong className='text-[#6a69fe]'>
            Terms of use</strong>
          </span>
        </div>
      </div>
      {login && (<Login close={<span onClick={() => setLogin(false)}>×</span>}/>)}
    </div>
  )
}