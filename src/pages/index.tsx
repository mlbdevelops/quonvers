"use client";

import Home from "@/tabs/auth_tabs_controllers/home";
import AuthPopUp from "@/tabs/auth_tabs_controllers/authPopUp";
import { useEffect, useState } from "react";
import styles from "@/styles/home.module.scss";

type User = {
  id?: string;
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      setIsLoading(false);
      return;
    }
    try {
      const parsed = JSON.parse(storedUser)
      if (!parsed?.id || typeof parsed.id !== "string") {
        localStorage.removeItem("user");
        setUser(null);
      } else {
        setUser(parsed);
      }
    } catch {
      localStorage.removeItem("user");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-[100%] flex flex-col justify-center items-center gap-4">
        <img className='h-15 w-15 rounded-xl' src="/logo.png" alt="App logo"/>
        <div className='flex items-center gap-2'>
          <div className={styles.loader}></div> 
          Loading...
        </div>
      </div>
    );
  }

  return user?.id ? <Home/> : <AuthPopUp/>;
}