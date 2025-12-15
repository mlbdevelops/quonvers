import styles from '@/styles/authPopUp.module.scss'
import Login from '@/components/auth/login'
import { UserPlus, Lock } from 'lucide-react';
import { useState, useEffect } from 'react'
import { auth, provider, signInWithPopup } from "@/firebase/googleAuth.js";
import Load from '@/components/ui/loading'
import Confirm from '@/components/ui/confirm'

export default function AuthPopUp(){
  const [text, setText] = useState('');
  const [login, setLogin] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const words = ['Quonvers', 'Chat', 'Meet', 'Laugth'];
  
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
        msg: `Google Sign-in error: ${error}`,
        title: 'Google error'
      })
      setLoad(false)
    }
  }

  useEffect(() => {
    const currentWord = words[wordIndex];
    const typingSpeed = 100;
    const deletingSpeed = 70;
    const wordDelay = 1100;
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
          actions={[
            <div className='w-full' onClick={() => setNotif({})}>
              Ok
            </div>
          ]}
        />}
        <h1 className={styles.h1}>{text}</h1> 
        <div className={styles.optionsDiv}> 
          <div className={styles.option}>
            <div className={styles.icon}>
              <UserPlus/>
            </div>
            Create an account
          </div>
          <div onClick={() => setLogin(true)} className={styles.option}>
            <div className={styles.icon}>
              <Lock/>
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
        </div>
      </div>
      {login && (<Login close={<span onClick={() => setLogin(false)}>×</span>}/>)}
    </div>
  )
}