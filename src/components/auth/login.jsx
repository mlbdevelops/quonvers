import styles from '@/styles/login.module.scss';
import Loader from '@/components/ui/loading';
import Confirm from '@/components/ui/confirm';
import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react'

export default function Login({close}){
  const [showPass, setShowPass] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [msgData, setMsgData] = useState({})
  
  const login = async () => {
    if (!email && !password) {
      return;
    }
    setIsLoading(true);
    const res = await fetch('http://localhost:4000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    
    const data = await res.json()
    
    if (!res.ok) {
      setMsgData({
        msg: data.msg,
        title: 'Login',
      })
      setIsLoading(false)
      return;
    }
    
    if (res.ok && data.token) {
      localStorage.setItem('user', JSON.stringify(data.user))
      localStorage.setItem('token', JSON.stringify(data.token))
    }
    location.reload()
    setIsLoading(false)
  }
  
  return(
    <div className={styles.body}>
      
      <div className={styles.close}>
        {close}
      </div>
      
      {isLoading && <Loader/>}
      
      {msgData?.title && 
        <Confirm
          msg={msgData.msg}
          title={msgData.title}
          onSubmit={() => setMsgData({})}
        />
      }
      
      <h1 className={styles.h1}>
        Welcome back
      </h1>
      <div className={styles.inpDiv}>
        <label className={styles.label}>
          Email
        </label>
        <input
          placeholder='Email'
          type='email'
          className={styles.input}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className={styles.label}>
          Password
        </label>
        <div className={styles.psswD}>
          <input
            placeholder='Password'
            type={!showPass? 'password' : 'text'}
            className={styles.input}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              paddingRight: 50,
            }}
          />
          {!showPass? <Eye size={30} onClick={() => setShowPass(true)} className={styles.eye}/> : <EyeClosed size={30} onClick={() => setShowPass(false)} className={styles.eye}/>}
          
        </div>
        <button onClick={login} className={styles.loginB}>
          Login
        </button>
      </div>
    </div>
  );
}