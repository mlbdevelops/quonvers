"use client";

import Home from "@/tabs/auth_tabs_controllers/home";
import AuthPopUp from "@/tabs/auth_tabs_controllers/authPopUp";
import { useEffect, useState } from "react";
import styles from "@/styles/home.module.scss";

type User = {
  id?: string; // optional on purpose
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
      const parsed = JSON.parse(storedUser);

      // ✅ validate
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
      <div className="w-full h-[100dvh] flex flex-col justify-center items-center gap-4">
        <div className={styles.loader}></div>
        Loading...
      </div>
    );
  }

  return user?.id ? <Home /> : <AuthPopUp />;
}