"use client";

import socket from "./socket.js";
import { useEffect, useState } from "react";

export default function SocketProvider() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (!saved) return;
    const u = JSON.parse(saved);
    if (u?.id) setUser(u?.id);
  }, []);
  
  useEffect(() => {
    if (!user) return;
    if (!socket.connected) socket.connect();
    socket.emit("register", user);
    return () => {
      socket.disconnect();
    };
  }, [user]);

  return null;
}