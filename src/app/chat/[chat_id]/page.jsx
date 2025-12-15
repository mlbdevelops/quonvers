"use client";

import { Settings, ChevronLeft, Send, Smile, Plus, Clock, Check, Image, Keyboard, Phone, Video, Mic } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import styles from "@/styles/chat.module.scss";
import socket from "@/sockets/socket";
import dateFormat from "@/utils/dayjs";
import styles2 from "@/styles/home.module.scss";
import { v4 as uuid } from 'uuid';
import MediaPicker from '@/components/ui/chat/mediaPickerContainer';
import ChatSettings from '@/components/ui/chat/settings/chatSettings';
import EmojiPicker from "emoji-picker-react";

export default function ChatPage() {
  const [emoPicker, setEmoPicker] = useState(false);
  const router = useRouter();
  const search = useParams();
  const searchParams = new URLSearchParams(window.location.search).get('user');
  const chat_id = decodeURIComponent(search.chat_id);
  const [userMsg, setUserMessage] = useState("");
  const [user, setUserId] = useState("");
  const [roomId, setRoomId] = useState(chat_id);
  const [room, setRoom] = useState({});
  const [recipient, setRecipient] = useState({});
  const [msgs, setMsgs] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [focused, setFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMedia, setIsMedia] = useState(false);
  const [settings, setSettings] = useState(false);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null)
  
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.id) setUserId(storedUser.id);
  }, []);

  useEffect(() => {
    return
    if (isMedia) {
      const handleClick = () => {
        setTimeout(() => {
          setIsMedia(false);
        }, 10);
      };
      document.body.addEventListener("click", handleClick);
      return () => document.body.removeEventListener("click", handleClick);
    } else {
      setIsMedia(false);
    }
    return () => setIsMedia(true);
  }, [isMedia]);

  useEffect(() => {
    if (!user) return;
    const token = JSON.parse(localStorage.getItem("token"));
    setIsLoading(true);
    const getRoomData = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/chat/history/${roomId}?recipient=${searchParams}`,
          { headers: { token, "Content-Type": "application/json" } }
        );
        const data = await res.json();
        if (data.isCreateNewOnFirstMessage) {
          setRecipient(data.recipientUserWithNoExistingChatsHistory);
          setRoom(data.room);
          setMsgs([]);
          setIsLoading(false);
          return;
        }
        if (res.ok && !data.isCreateNewOnFirstMessage) {
          setMsgs(data.chats);
          setRoom(data.room);
          setIsLoading(false);
          const getRecipient = data.room.participants?.find((p) => p.id !== user);
          if (getRecipient) setRecipient(getRecipient);
        }
      } catch (error) {
        console.error("Error fetching chat:", error);
        setIsLoading(false);
      }
    };
    getRoomData();
  }, [roomId, user]);

  const scrollBottom = async (smooth) => {
    await bottomRef.current?.scrollIntoView(smooth);
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [msgs, focused]);

  useEffect(() => {
    socket.on("receive_message", (msgData) => {
      setMsgs((prev) => [...prev, msgData]);
    });
    socket.on("typing", (data) => {
      if (data.typing) setIsTyping(true);
    });
    return () => {
      socket.off("receive_message");
      socket.off("typing");
    };
  }, []);
  
  const sendMessage = () => {
    if (!userMsg.trim()) return;
    scrollBottom({behavior: 'smooth'})
    
    function hasAnyAlphabet(text) {
      return /\p{L}/u.test(text);
    }
    
    const msgData = {
      senderId: user,
      receiverId: recipient.id,
      content: userMsg.trim(),
      type: hasAnyAlphabet(userMsg)? "text" : "emoji",
      roomId,
    };
    socket.emit("private_message", msgData);
    setUserMessage("");
  };

  const type = () => {
    socket.emit("typing", { typing: true });
  };
  
  const resize = () => {
    const el = textareaRef?.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };
  
  if (isLoading && !recipient) {
    return (
      <div className="w-full h-[100dvh] flex flex-col justify-center items-center gap-4">
        <div className={styles2.loader}></div>
        Loading...
      </div>
    );
  }

  const header = (
    <div className="flex justify-between items-center w-full pl-2 pr-2 h-[65px]">
      <div className="flex gap-2 items-center">
        <ChevronLeft onClick={() => router.back()} />
        {!recipient.profile ? (
          <div className="bg-[rgba(106,105,254,0.125)] w-8 h-8 rounded-full flex justify-center items-center text-[#6a69fe] font-bold">
            {recipient?.name?.slice(0, 1).toUpperCase() || "•••"}
          </div>
        ) : (
          <img className="w-8 h-8 rounded-full border border-[#1d1d1d]" src={recipient.profile} />
        )}
        <span>{recipient?.name || "•••"}</span>
      </div>
      <div className="flex items-center gap-5">
        <Phone />
        <Video />
        <Settings onClick={() => setSettings(true)}/>
      </div>
    </div>
  );
  
  const noChatHistory = !msgs.length && (
    <div className='w-full flex flex-col items-center gap-2 overflow-hidden'>
      {!recipient.profile ? (
        <div className="bg-[rgba(106,105,254,0.125)] w-25 h-25 rounded-full flex justify-center items-center text-[#6a69fe] font-bold text-3xl">
          {recipient?.name?.slice(0, 1).toUpperCase() || "•••"}
        </div>
      ) : (
        <img className="w-25 h-25 rounded-full border border-[#1d1d1d]" src={recipient.profile} />
      )}
      <strong className='text-3xl'>{recipient?.name}</strong>
      <span className='text-[darkgray]'>{recipient?.username}</span>
    </div>
  );
  
  return (
    <div 
      className="flex flex-col justify-center items-center h-[100dvh]"
      style={{
        backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT67VK5k1_39RHbDp46pFX16c_iQF7-kVdroACT3HPbnw&s=10)',
        objectFit: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        //background: 'rgba(0, 0, 0, 0.6)'
      }}
    >
      {header}
      {noChatHistory}
      {settings && <ChatSettings loggedUser={user} room={room} onClose={(close) => close && setSettings(false)}/>}
      
      {isMedia && 
        <MediaPicker 
          onPick={(e) => { 
            e == 2 && setEmoPicker(true)
            setIsMedia(false)
          }}
        />
      }
      <div className="h-full w-full flex-1 overflow-scroll flex flex-col pb-5">
        <div className="flex flex-col items-center text-center">
          {msgs.map((msg, i) => (
            <div key={i} className={msg.sender_id === user ? styles.msgRight : styles.msgLeft}>
              
              {msg.sender_id !== user && recipient?.profile? <img className='h-[38px] w-[38px] rounded-full border border-[#1d1d1d]' src={recipient?.profile}/>
                : msg.sender_id !== user && !recipient?.profile?
                <div className='min-h-[38px] min-w-[38px] rounded-full border border-[#1d1d1d] bg-[rgba(106,105,254,0.125)] flex justify-center items-center font-bold text-[#6a69fe]' >{recipient?.name[0].toUpperCase()}</div>
              : null}
              
              
              <div className='flex flex-col'>
                <div 
                  className={msg.sender_id === user ? styles.msgTextRight : styles.msgTextLeft}
                  style={{
                    backgroundColor: msg.type === 'text'? '' : 'transparent',
                    fontSize: msg.type === 'text'? null : 40,
                    padding: msg.type === 'text'? null : 0,
                    //border: '1px solid'
                  }}
                >{msg.content}</div> 
                
                <div style={{
                  justifyContent: msg.sender_id == user? 'flex-end' : 'flex-start'
                }} className={styles.day}>
                  {dateFormat(msg.updatedAt)}
                  {msg.id === msgs[msgs.length - 1]?.id && msg.sender_id === user ? (
                    <Clock color="white" size={10} />
                  ) : msg.sender_id == user ? (
                    <Check color="white" size={10} />
                  ) : ''}
                </div>
              </div>
            </div>
          ))}
        </div>
        {isTyping && (
          <span className="w-[70px] m-1 text-[#6a69fe]" style={{ transform: "scale(0.80)" }}>Typing...</span>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="w-[95%] mb-2 mt-1 rounded-full h-12.5 overflow-hidden bg-[#1d1d1d7f] flex items-center justify-between pl-3 pr-3 gap-3 border border-[#1d1d1d] backdrop-blur-[3px]">
        <Plus style={{ transform: isMedia? 'rotate(315deg)' : null }} onClick={() => { setEmoPicker(false); setIsMedia(!isMedia); }} />
        <textarea
          className={styles.msgInput}
          placeholder="Write something..."
          value={userMsg}
          ref={textareaRef}
          onFocus={() => { setFocused(true); emoPicker && setEmoPicker(false) }}
          onBlur={() => setFocused(false)}
          onInput={(e) => { setUserMessage(e.target.value); type(); }}
        />
        <Mic size={20}/>
        <div className={`p-2 rounded-full text-white flex items-center justify-center border border-[#262626] bg-[#6a69fe]`} style={{ opacity: userMsg.trim() ? 1 : 0.5 }} onClick={sendMessage}>
          <Send size={15} stroke="white" />
        </div>
      </div>

      {emoPicker && (
        <div 
          className={`w-full ${styles.emopicker} z-50`}
          style={{ padding: '8px', paddingBottom: 'max(8px, env(safe-area-inset-bottom))' }}
          onClick={(e) => e.stopPropagation()}
        >
          <EmojiPicker
            onEmojiClick={(emoji) => {
              setUserMessage((prev) => prev + emoji.emoji);
            }}
            theme="dark"
            height={350}
            width='100%'
            searchDisabled={true}
            skinTonesDisabled={true}
            previewConfig={{ showPreview: false }}
          />
        </div>
      )}
    </div>
  );
}