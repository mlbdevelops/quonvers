'use client'

import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { Play, Pause } from 'lucide-react'
import Image from '@/components/elements/image'

export default function WaveformPlayer({ audioUrl, user_profile_url, user_name, place, style, sender}) {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [user, set_user] = useState('');
  const audio_player = useRef(null)
  
  useEffect(() => {
    set_user(JSON.parse(localStorage.getItem('user')).id || '')
  }, [])
  
  useEffect(() => {
    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#ffffff",
      progressColor: "#6a69fe",
      height: 30,
      cursorColor: '#00000000',
      responsive: true,
    });
    wavesurferRef.current.load(audioUrl);
    return () => wavesurferRef.current.destroy();
  }, [audioUrl]);
  
  const pause_audio = (e) => {
    const audio = audio_player.current
    e.stopPropagation()
    if (audio) {
      setIsPlaying(false);
      wavesurferRef.current.pause();
      audio.pause();
    }
  }
  
  const play_audio = (e) => {
    e.stopPropagation()
    const audio = audio_player.current
    if (audio) {
      setIsPlaying(true);
      wavesurferRef.current.play();
      audio.play();
    }
  }
  
  return (
    <div style={{ 
      ...style
      
    }} className={`w-[250px] h-15 rounded-full ${sender === user? 'rounded-br-md' : 'rounded-bl-md'} bg-[#303030] flex items-center p-2 justify-evenly gap-3 ${place}`}>
      {user_profile_url? <Image 
        className='w-11 h-11 rounded-full flex items-center justify-center text-2xl font-bold bg-[#2524ff91]' 
        loading_box_style='w-11 h-11 rounded-full flex items-center justify-center text-2xl font-bold bg-[#2524ff91]' 
        src={user_profile_url}
        /> : <div className='w-11 h-11 rounded-full flex items-center justify-center text-2xl font-bold bg-[#2524ff91]'>{user_name[0].toUpperCase()}</div>}
      <div>
        {!isPlaying? <Play fill='white' onClick={(e) => play_audio(e)}/> : 
        <Pause fill={'white'} onClick={(e) => pause_audio(e)}/>}
        <audio preload='none' ref={audio_player} src={audioUrl}/>
      </div>
      <div className='flex-1 bg-[#f2f2f224] p-2 rounded-full' ref={waveformRef} />
    </div>
  );
}