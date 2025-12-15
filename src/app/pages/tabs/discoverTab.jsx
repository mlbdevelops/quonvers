"use client"

import Header from '@/components/elements/header'
import Post from '@/components/elements/post'
import PostSkeleton from '@/components/ui/postSkeleton'
import { Menu, Search, UserCircle, Plus, Photos, Sticker, Filter, Sliders } from 'lucide-react'
import { useRouter, useParams } from 'next/navigation'
import styles from '@/styles/discover.module.scss'
import fade from '@/styles/transition.module.scss'
import Create_post from '@/components/post/create_post'
import { useEffect, useState, useRef } from 'react';
import useCache from '@/hooks/quonversCachingSystem.js'
import FilterBox from '@/components/post/filter_box.jsx'

export default function discoverTab(){
  const router = useRouter();
  const [create, setCreate] = useState(false);
  const [show_filter, set_show_filter] = useState(false);
  const [user, setUser] = useState('');
  const [token, setToken] = useState('');
  const { setProvider, getProvider } = useCache()
  const [posts, setPosts] = useState([])
  const bodyRef = useRef(null)
  
  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
  
    const handleScroll = () => {
      setProvider("postTabScroll", body.scrollTop);
    };
  
    body.addEventListener("scroll", handleScroll);
    return () => body.removeEventListener("scroll", handleScroll);
  }, []);
  
  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    
    const savedScroll = getProvider("postTabScroll") || 0;
  
    setTimeout(() => {
      body.scrollTo({ top: Number(savedScroll), behavior: "instant" });
    }, 100);
  }, []);
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = JSON.parse(localStorage.getItem('token'));
    if (user) {
      setUser(user);
      setToken(token);
    }
  }, []); 
  
  const getPosts = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/post/getPosts', {
        headers: {
          'token' : token
        }
      })
      const data = await res.json()
      if (res.ok && data.posts.length) {
        setPosts((prev) => {
          const posts = [...prev, data.posts][0]
          setProvider('posts', posts)
          return posts
        })
      }
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }
  
  useEffect(() => {
    if (!token) return
    const cachedPosts = getProvider('posts') || []
    if (cachedPosts.length) {
      return setPosts(cachedPosts)
    }
    async function getEm(){
      await getPosts()
    }
    getEm()
  }, [token])
  
  const mockPosts = [
    {
      owner: {
        id: 1,
        username: '@darino_mundibu',
        name: 'Darino',
        profile: false,
      },
      caption: 'Hello to Newton, i am gappy to be here i love this app and would never want to give up ok it, i manage my time talking to people around Metting ppl is my favorite 😁🥳💬',
      photos: [],
      repost:{
        repost: true,
        data: {
          user:{
            username: 'bobby',
            name: 'Alexander',
            profile: 'A',
          },
          caption: "This looks good and i'm glad to be here and help to grow this community This looks good and i'm glad to be here and help to grow this community This looks good and i'm glad to be here and help to grow this community This looks good and i'm glad to be here and help to grow this community"
        }
      }
    },
    {
      owner: {
        id: 1,
        username: '@jane0172',
        name: 'Jane',
        profile: false,
      },
      caption: 'Hello to Newton, i am gappy to be here, i need to build a chat app where people can come and meets',
      photos: [],
      repost:{
        repost: false,
        data: null
      }
    },
    {
      owner: {
        id: 1,
        username: '@rocky9278',
        name: 'Rocky',
        profile: false,
      },
      caption: 'Hello to Newton, i am gappy to be here, Some could obviously find love 😁😁',
      photos: [],
      repost:{
        repost: false,
        data: null
      }
    },
    {
      owner: {
        id: 1,
        username: '@mark1378',
        name: 'zuck',
        profile: false,
      },
      caption: 'Mood 🍃',
      photos: [],
      repost:{
        repost: true,
        data: {
          user: {
            profile: 'M',
            username: 'michael',
            name: 'Myke',
          },
          caption: 'Hello to Newton, i am gappy to be here, Some could obviously find love 😁😁',
        }
      }
    },
    {
      owner: {
        id: 1,
        username: '@jordan8267',
        name: 'Jordan',
        profile: false,
      },
      caption: "I don't even know why the fuck do i exist 🥲, once i get rich i'l' run away from this trash of country, i promise and maybe come back to help em",
      photos: [],
      repost:{
        repost: false,
        data: null
      }
    },
    {
      owner: {
        id: 1,
        username: '@marcus837',
        name: 'Marcus',
        profile: false,
      },
      caption: 'Hello to Newton, i am happy to be here',
      photos: [],
      repost:{
        repost: false,
        data: null
      }
    },
  ]
  
  return(
    <div className='h-screen w-full text-center flex justify-between items-center flex-col pt-0'>
      
      {/*header*/} 
      
      <Header title='Feed' right={[
        
        <div onClick={() => set_show_filter(true)} key={1} className='flex items-center gap-2 rounded-full border pl-2 pr-2 bg-[rgba(106,105,254,0.125)] text-[#6a69fe]' style={{
          border: '0.5px solid #6a69fe7a'
        }}>
          <span className='text-[16px]'>
            Memes
          </span>
          <Sliders 
            size={17} 
            key={1}
          />
        </div>,
        
        <Search key={2} onClick={() => router.push('/search')}/>,
        <UserCircle key={3} onClick={() => router.push('/search')}/>,
       ]}/>
      
      {/*body*/}
      
      {show_filter && <FilterBox onClose={(e) => {
        set_show_filter((val) => !val)
      }}/>}
      
      <div ref={bodyRef} className='flex-1 w-full flex flex-col items-center overflow-y-scroll pb-20 pt-0'>
        <div className={`w-full p-2 min-h-[180px] flex gap-3 overflow-x-scroll justify-evenly items-center ${fade.fade}`}
        >
          <div className='w-[30%] h-[98%] rounded-xl bg-[#1d1d1d]'>
            
          </div>
          <div className='w-[30%] h-[98%] rounded-xl bg-[#1d1d1d]'>
            
          </div>
          <div className='w-[30%] h-[98%] rounded-xl bg-[#1d1d1d]'>
            
          </div>
        </div>
        
        {posts.length? posts.map((post, i) => (
          <Post 
            key={i} 
            singlePost={post}
          />
        )) : null}
        <PostSkeleton/>
      </div>
    </div>
  );
}