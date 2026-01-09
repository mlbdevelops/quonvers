"use client"

import dynamic from 'next/dynamic'
import { Settings, ChevronLeft, Send, Smile, Plus, Clock, Check, Keyboard, Phone, Video, Mic, Images, Sticker, Play, Pause, ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import styles from "@/styles/chat.module.scss";
import socket from "@/sockets/socket";
import dateFormat from "@/utils/dayjs";
import styles2 from "@/styles/home.module.scss";
import { v4 as uuid } from 'uuid';
import MediaPicker from '@/components/ui/chat/mediaPickerContainer';
import ChatSettings from '@/components/ui/chat/settings/chatSettings';
import Chat_component from '@/components/ui/chat/chat_component';
import Media_sheet from '@/components/ui/chat/chat_options/media_sheet';
import { useVoiceRecorder } from '@/components/ui/chat/record/voice_recorder';
import EmojiPicker from "emoji-picker-react";
import Sheet from '@/components/elements/sheet';
import Image from '@/components/elements/image'
import MsgFocus from '@/components/ui/chat/chat_options/message_focus'

export default function ChatPage() {
  const { recording, startRecording, stopRecording, audioURL, audioBlob } = useVoiceRecorder()
  const [emoPicker, setEmoPicker] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const recipient_user_id = new URLSearchParams(window.location.search).get('user');
  const [user_content, set_user_content] = useState("");
  //const searchParameters = new URLSearchParams(window.location.search);
  const chat_id = decodeURIComponent(searchParams.get('chat_id')) || "";
  const [user, setUserId] = useState("");
  const [theme, set_theme] = useState("");
  const [roomId, setRoomId] = useState(chat_id);
  const [room, setRoom] = useState({});
  const [recipient, setRecipient] = useState({});
  const [nickname, set_nickname] = useState(typeof room.nicknames == 'Array' && room?.nicknames.find(n => n.user_id === recipient.id)?.nickname || "");
  console.log(room)
  console.log(recipient)
  const [msgs, setMsgs] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [audio_playing, set_playing_audio] = useState(false);
  const [focused, setFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMedia, setIsMedia] = useState(false);
  const [settings, setSettings] = useState(false);
  const [reci_profile_loaded, setRecipient_profile_loaded] = useState(false);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null)
  const reciProfile = useRef(null)
  const recorder_button = useRef(null)
  const [show_msg_focus, set_show_msg_focus] = useState({} || null)
  const [show_sheet, set_show_sheet] = useState(false)
  const [counter_second, set_counter_sec] = useState(0)
  const [counter_min, set_counter_min] = useState(0)
  
  useEffect(() => {
    function counter(){
      if(!recording) return;
      setInterval(() => {
        if (Number(counter_second) >= 60) {
          set_counter_sec(0)
          set_counter_min((min) => min + 1)
        }else{
          set_counter_sec((sec) => sec + 1)
        }
      }, 1000)
    }
    counter()
  }, [recording])
  
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
    if (!user && !roomId) return;
    const token = JSON.parse(localStorage.getItem("token"));
    setIsLoading(true);
    const getRoomData = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/chat/history/${roomId}?user=${recipient_user_id}`,
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
    await bottomRef?.current?.scrollIntoView(smooth);
  };
  
  const upload_voice = async () => {
    if (!audioBlob && !audioURL) return;
    const form = new FormData()
    form.append('file', audioBlob)
    const req = await fetch('http://localhost:4000/api/chat/upload/voice', {
      method: 'POST',
      body: form
    })
    const res = await req.json()
    if (req.ok && res.audio_url) {
      sendMessage('audio', res.audio_url)
    }
  }
  
  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [msgs, focused]);

  useEffect(() => {
    socket.on("theme_changed", (data) => {
      set_theme(data.new_theme.theme_url)
    })
    socket.on("receive_message", async (msgData) => {
      await scrollBottom({behavior: 'smooth'})
      setMsgs((prev) => [...prev, msgData]);
    });
    socket.on("typing", (data) => {
      if (data.typing) setIsTyping(true);
    });
    return () => {
      socket.off("receive_message");
      socket.off("typing");
      socket.off('theme_changed')
    };
  }, []);
  
  const sendMessage = (type, content) => {
    if (!user_content.trim()) return;
    
    function hasAnyAlphabet(text) {
      return /\p{L}/u.test(text);
    }
    
    const msgData = {
      senderId: user,
      receiverId: recipient.id,
      content: content || user_content.trim(),
      type: type || hasAnyAlphabet(user_content)? "text" : "emoji",
      roomId,
    };
    socket.emit("private_message", msgData);
    
    scrollBottom({behavior: 'smooth'})
    set_user_content("");
  };
  
  const change_theme = (participants, theme, room_id, changer) => {
    const users_ids = participants.map(p => p.id)
    const user = participants.find(u => u.id === changer)?.name
    socket.emit("change_theme", {
      users_ids,
      theme,
      room_id,
      changer: user
    })
  }
  
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
    <div className="flex justify-between items-center w-full pl-2 pr-2 h-[55px]" style={{
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
    }}>
      <div className="flex gap-2 items-center">
        <ArrowLeft className='ml-1 mr-1' onClick={() => router.back()} />
        {!recipient?.profile ? (
          <div className="bg-[rgba(106,105,254,0.125)] w-8 h-8 rounded-full flex justify-center items-center text-[#6a69fe] font-bold">
            {recipient.name? recipient?.name?.slice(0, 1).toUpperCase() || "•••" : nickname}
          </div>
        ) : (
          <Image 
            ref={reciProfile} 
            className="w-8 h-8 rounded-full" 
            loading_box_style="bg-[#1d1d1d9c] w-8 h-8 rounded-full" 
            src={recipient.profile} />
        )}
      </div>
      <div onClick={() => setSettings(true)} className='flex-1 ml-2 mr-3 overflow-hidden text-ellipsis whitespace-nowrap'>
        <span className=''>{recipient?.name || "•••"}</span>
      </div>
      <div className="flex items-center gap-5">
        <Phone fill='white'/>
        <Video fill='white'/>
        <Settings onClick={() => setSettings(true)}/>
      </div>
    </div>
  );
  
  const noChatHistory = !msgs.length && (
    <div className='w-full flex flex-col items-center gap-2 overflow-hidden' style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
      {!recipient?.profile ? (
        <div className="bg-[rgba(106,105,254,0.125)] w-25 h-25 rounded-full flex justify-center items-center text-[#6a69fe] font-bold text-3xl">
          {recipient?.name?.slice(0, 1).toUpperCase() || "•••"}
        </div>
      ) : (
        <Image
          className="w-25 h-25 rounded-full border border-[#1d1d1d]" 
          loading_box_style="w-25 h-25 rounded-full border border-[#1d1d1d]" 
          src={recipient?.profile} />
      )}
      <strong className='text-3xl'>{recipient?.name}</strong>
      <span className='text-[darkgray]'>{recipient?.username}</span>
    </div>
  );
  
  return (
    <div 
      className={`flex flex-col justify-center items-center h-[100dvh] ${styles.body}`}
      style={{
        background: `url(${theme? theme : room?.bg_url})`,
      }}
    >
      {header}
      {noChatHistory}
      {settings && <ChatSettings loggedUser={user} room={room} onClose={(close) => {
        close && setSettings(false)
        if (close.close_type == 'theme') {
          change_theme(room?.participants, close?.content, room?._id, user)
          set_theme(close?.content?.theme_url)
        }
      }}/>}
      
      {isMedia && 
        <MediaPicker 
          onPick={(e) => { 
            e == 2 && setEmoPicker(true)
            setIsMedia(false)
          }}
        />
      }
      
      {show_msg_focus?.id && (
        <MsgFocus
          msg={show_msg_focus}
          user={user}
          onClose={() => {
            set_show_msg_focus(false)
          }}
        />
      )}
      
      {show_sheet && (
        <Sheet
          onClose={() => set_show_sheet(false)}
          body={<Media_sheet/>}
          className='h-[95%] bg-[#111111]'
        />
      )}
      
      <div className="h-full w-full flex-1 overflow-scroll flex flex-col pb-5" style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
        <div className="flex flex-col items-center text-center">
          {msgs?.map((msg, i) => (
            <Chat_component
              key={i}
              //
              msg={msg}
              current_user_profile={room.participants.find(u => u.id === user).profile}
              current_user_name={room.participants.find(u => u.id === user).name}
              i={i}
              recipient={recipient}
              user={user}
              id={msg._id}
              is_last={msgs[msgs.length - 1]._id === msg._id}
              onContextMenu={(e) =>{
                set_show_msg_focus(e)
                setEmoPicker(false)
              }}
            />
          ))}
        </div>
        {isTyping && (
          <span className="w-[70px] m-1 text-[#6a69fe]" style={{ transform: "scale(0.80)" }}>Typing...</span>
        )}
        <div ref={bottomRef} />
      </div>
      
      <div className='w-full flex items-center justify-evenly flex-col' style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
        
        <div className='w-full flex items-center justify-evenly'>
          <div className={`${recording? 'w-12' : 'w-[83%]'} mb-2 mt-1 rounded-full h-12 overflow-hidden flex items-center justify-between pl-3 pr-3 gap-3  backdrop-blur-[5px]`} style={{
            backgroundColor: '#2c2535',
          }}> 
            <Plus 
              style={{ 
                transform: isMedia? 'rotate(315deg)' : null
              }} 
              onClick={() => { 
                setEmoPicker(false); 
                setIsMedia((v) => !v);
              }}
            />
            <textarea
              className={styles.msgInput}
              placeholder="Message..."
              style={{
                opacity: recording? 0 : 1
              }}
              value={user_content}
              ref={textareaRef}
              onFocus={() => { setFocused(true); emoPicker && setEmoPicker(false) }}
              onBlur={() => setFocused(false)}
              onInput={(e) => { set_user_content(e.target.value); type(); }}
            />
            <Smile
              onClick={() => { 
                set_show_sheet(true)
                setIsMedia(false) 
                setEmoPicker(false)
              }}
            />
          </div>
          <div className={`${!recording? 'w-12' : 'w-[85%]'} h-12 rounded-full text-white flex items-center justify-center bg-[#6a69fe] transition ${recording && styles.sender}`} onClick={() => sendMessage()}>
            {user_content? <Send size={20} stroke="white" /> : 
              <div 
                className='flex w-full h-full rounded-full items-center justify-between scale-75'
                onTouchStart={() => {
                  !recording && startRecording()
                }}
                onTouchEnd={() => {
                  recording && stopRecording()
                  upload_voice()
                }}
              >
                {recording && <div className={styles.red_recording}></div>}
                {recording && <div className='flex items-center gap-1'>Recording: {counter_min}:{counter_second}</div>}
                <div className={`flex gap-1 ${recording? 'w-12' : 'w-full'} h-full rounded-full items-center justify-center`}>
                  <div className='w-[5%] h-[20%] bg-white rounded-full'></div>
                  <div className='w-[5%] h-[40%] bg-white rounded-full'></div>
                  <div className='w-[5%] h-[60%] bg-white rounded-full'></div>
                  <div className='w-[5%] h-[20%] bg-white rounded-full'></div>
                  <div className='w-[5%] h-[35%] bg-white rounded-full'></div>
                </div>
              </div>
            }
          </div>
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
              set_user_content((prev) => prev + emoji.emoji);
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