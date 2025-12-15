import { useSearchParams } from 'next/navigation';
import { 
  ChevronLeft,
  Bold,
  Italic,
  List,
  AlignRight,
  AlignCenter,
  Plus,
  User,
  Images,
  FolderTree,
  Globe,
  Calendar,
  Sticker,
  Trash2,
  Smile,
  X,
  Map,
  RepeatCircle,
  Repeat
} from 'lucide-react'
//import { Preferences } from '@capacitor/preferences';
import { useState, useEffect, useRef } from 'react';
import Confirm from '@/components/ui/confirm.jsx'
import Loader from '@/components/ui/loading.jsx';
//import { useTranslation } from 'react-i18next';
import useCache from '@/hooks/quonversCachingSystem.js';
//import { Toast } from '@capacitor/toast';
import { Photos, ChevronDown } from 'lucide-react';
import Header from '@/components/elements/header';
import styles from '@/styles/create_post.module.scss';
import GifPicker from '@/components/media/gifPicker';
import StickerPicker from '@/components/media/stickerPicker';
import EmojiPicker from "emoji-picker-react";
import Location from '@/components/post/transition/location'
import Repost from '@/components/post/transition/repost'

export default function Create_post({onClose}){
  const bodyRef = useRef(null)
  
  const closeFunc = () => {
    const ref = bodyRef.current
    ref && ref.classList.add(styles.removeBody)
    setTimeout(() => onClose(true), 260)
  }
  //const {t} = useTranslation()
  //const { remove } = useCache()
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCategories, setIsCategory] = useState(false);
  const [category, setCategory] = useState('');
  const [postCaption, setPostCaption] = useState('');
  const [ageRate, setAgeRate] = useState('');
  const [age, setAge] = useState(2);
  const [msg, setMsg] = useState(false);
  const [msgData, setMsgData] = useState({});
  const [isSuccess, setSuccess] = useState(false);
  const [langList, setLangList] = useState(false);
  const [ageList, setAgeList] = useState(false);
  const { remove } = useCache();
  const [repost, setRepost] = useState(true);
  const [showRepost, setShowRepost] = useState(false);
  const [showLocationList, setShowLocationsList] = useState(false);
  const [location, setLocation] = useState('');
  
  const [emoPicker, setEmoEmojiPicker] = useState(false);
  const [token, setToken] = useState('');
  const [fontWeight, setFontWeight] = useState('');
  const [selectedLang, setSelectedLang] = useState('');
  const [showGif, setShowGif] = useState(false);
  const [showSticker, setShowSticker] = useState(false);
  const [fontStyle, setFontStyle] = useState('');
  const [tl, setTl] = useState('');
  const [user, setUser] = useState({});
  const textareaRef = useRef(null);
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = JSON.parse(localStorage.getItem('token'));
    if (user) {
      setUser(user);
      setToken(token);
    }
  }, []);
  
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'zh', name: '普通话 / 汉语' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'ar', name: 'العربية' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'ru', name: 'Русский' },
    { code: 'pt', name: 'Português' },
    { code: 'ur', name: 'اردو' },
    { code: 'id', name: 'Bahasa Indonesia' },
    { code: 'de', name: 'Deutsch' },
    { code: 'ja', name: '日本語' },
    { code: 'sw', name: 'Kiswahili' },
    { code: 'mr', name: 'मराठी' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'tr', name: 'Türkçe' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'vi', name: 'Tiếng Việt' },
    { code: 'ko', name: '한국어' }
  ];
  
  useEffect(() => {
    const loadLang = async () => {
      const { value } = await Preferences.get({ key: 'language' });
      const filter = languages.find(lng => lng.code === value)
      if (filter || value) setSelectedLang(filter.name);
    };
    //loadLang();
  }, []);
  
  const setfiles = async (e) => {
    const files = Array.from(e.target.files)
    if (images.length > 10) {
      return await Toast.show({
        text: 'You can only select up to 10 images.',
        duration: 'long',
        position: 'bottom',
      });
    }
    if (files) {
      setImages((prev) => [...new Set([...prev, ...files])].slice(0, 10))
    }
  }
  
  const create_post = async () => {
    if(!postCaption) return
    setIsLoading(true)
    const getLangCode = languages.find(lang => lang.name == selectedLang)?.code || 'eng'
    const form = new FormData();
    form.append('category', category)
    form.append('age_rate', age)
    form.append('lang', getLangCode)
    form.append('caption', postCaption);
    form.append('location', location);
    form.append('repost_allowance', repost);
    images.length && images.forEach((file) => {
      form.append('files', file);
    });
    
    const res = await fetch('http://localhost:4000/api/post/create_post', {
      method: 'POST',
      headers:{
        'token' : token
      },
      body: form
    })
    
    if (!res.ok) {
      setMsg(true)
      setMsgData({
        title: 'Error',
        msg: 'An error occured, check your network connection and try again.'
      })
      setIsLoading(false)
      return;
    }
    
    if (res.ok) {
      setIsLoading(false)
      onClose('close')
      remove('posts')
    }
  }
  
  const resize = () => {
    const el = textareaRef?.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };
  
  useEffect(() => resize(), [token]); 
  
  const ageRatings = [
    { label: "Kids", age: "5-9", code: 1},
    { label: "Pre-Teen", age: "10-12", code: 2 },
    { label: "Teenager", age: "13-17", code: 3 },
    { label: "Young adult", age: "18-25", code: 4 },
    { label: "Adult", age: "25+", code: 5 }
  ];
  
  const funnyTopics = [
    "Relatable",
    "Dark Humor",
    "Surreal / Absurd",
    "Dank Memes",
    "Wholesome Memes",
    "Sarcasm / Satire",
    "Puns / Wordplay",
    "Fails / Epic Fails",
    "Reaction Memes",
    "Animal Humor",
    "Work Humor",
    "School / Student Life",
    "Pop Culture Memes",
    "Movie Memes",
    "Gaming Humor",
    "Social Media Humor"
  ];
  
  return(
    <div 
      ref={bodyRef} 
      style={{
        marginTop: '100px',
        zIndex: 10000,
        overflow: 'scroll',
        paddingBottom: 100,
      }} 
      className={styles.body}>
      <Header 
        left={<span style={{
          fontSize: 30,
        }} onClick={closeFunc}>×</span>}
        title={'Create post'}
      />
      
      {isLoading?
        <Loader/>
      : ''}
      
      {showLocationList && <Location onClose={(e) => {
        setShowLocationsList(false)
        e && e !== 'close' && setLocation(e)
      }}/>}
      
      {showRepost && <Repost initialValue={repost} onClose={(e) => {
        setShowRepost(false)
        e !== 'close' && setRepost(e)
      }}/>}
      
      {msg && msgData.title?
        <Confirm msg={msgData.msg} title={msgData.title} actions={[
          <span onClick={() => setMsg(false)}>Ok</span>
        ]}/>
      : ''}
      
      {/*Category list*/}
      
      {emoPicker && (
        <div 
          className={`fixed bottom-0 left-0 right-0 ${styles.emoEmojiPicker} z-50 w-[100%] flex items-center justify-center`}
          style={{ padding: '8px', paddingBottom: 'max(8px, env(safe-area-inset-bottom))' }}
          onClick={(e) => e.stopPropagation()}
        >
          <EmojiPicker
            
            onEmojiClick={(emoji) => {
              setPostCaption((prev) => prev + emoji.emoji);
              resize();
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
      
      {showGif && (
        <GifPicker 
          onSelect={(url) => {
            setImages(prev => [...prev, { url, type: 'gif' }]);
          }} 
          onClose={() => setShowGif(false)} 
        />
      )}
      
      {showSticker && (
        <StickerPicker 
          onSelect={(url) => {
            setImages(prev => [...prev, { url, type: 'sticker' }]);
          }} 
          onClose={() => setShowSticker(false)} 
        />
      )}
      
      {isCategories?
        <div className={styles.cateBlur}>
          <div className={styles.box}>
            <h3 className={styles.h3}>
              Choose a category
            </h3>
            <div className={styles.cateList}>
              {funnyTopics.map((cat) => (
                <span onClick={() => {
                  setCategory(cat)
                  setIsCategory(false)
                }} className={styles.cate}>
                  {cat}
                  {category == cat? <div className={styles.actualCate}></div> : ''}
                </span>
              ))}
            </div>
            <button onClick={() => setIsCategory(false)} className={styles.closeB}>
              Close
            </button>
          </div>
        </div>
      : ''}
      
      {/*Languages list*/}
      
      {langList?
        <div className={styles.cateBlur}>
          <div className={styles.box}>
            <h3 className={styles.h3}>
              Choose a language
            </h3>
            <div className={styles.cateList}>
              {languages.map((code, name) => (
                <span onClick={() => {
                  setSelectedLang(code.name)
                  setLangList(false)
                }} className={styles.cate}>
                  {code.name}
                  {selectedLang == code.name? <div className={styles.actualCate}></div> : ''}
                </span>
              ))}
            </div>
            <button onClick={() => setLangList(false)} className={styles.closeB}>
              Close
            </button>
          </div>
        </div>
      : ''}
      
      {/*Age ratings list*/}
      
      <div className='mt-5 w-[87%] flex flex-col gap-2'>
        <div className='flex items-center gap-2'>
          <div className='h-8 w-8 bg-red-500 rounded-full flex items-center justify-center'>
            M
          </div>
          <span>
            {user.username}
          </span>
        </div>
        <textarea
          ref={textareaRef}
          value={postCaption}
          autoFocus
          onFocus={() => setEmoEmojiPicker(false)}
          onInput={(e) => {
            resize()
            setPostCaption(e.target.value)
          }}
          className='w-[90%] ml-3.5 border-0 p-2 pl-4'
          placeholder='Write something...'
          cols={1}
          rows={1}
          style={{
            border: 'none',
            borderLeft: '2px solid #373737',
            outline: 'none',
            resize: 'none'
          }}
        />
        <div className='flex items-center gap-4 pl-1'>
          
          {!emoPicker? (<Smile size={20} onClick={() => {
            setEmoEmojiPicker((prev) => prev? false : true) 
            setShowSticker(false) 
            setShowGif(false)}}/>) : (<X size={20} onClick={() => setEmoEmojiPicker(false)}/>)}
          
          {!showSticker?<Sticker size={20}
            onClick={() => {
              setShowSticker(true)
              setEmoEmojiPicker(false)
              setShowGif(false)
            }}
          />: (<X size={20} onClick={() => setShowSticker(false)}/>) }
          
          {!showGif?<span 
            className='font-bold text-[16px] p-0 m-0 h-5 flex items-center'
            onClick={() => {
              setShowGif(!showGif)
              setShowSticker(false)
              setEmoEmojiPicker(false)
            }}
          >GIF</span> : (<X size={20} onClick={() => {
            setShowGif(false)
          }}/>)}
          
        </div>
      </div>
      
      <div className={styles.mediaDiv}>
        
        <div className={styles.media}>
          <span className={styles.subMedia}>
            <Images size={20}/>
            Add images
          </span>
          <small className={styles.small}>{images?.length}/10</small> 
          
          <form 
            action='' 
            method=''
            encType="multipart/form-data"
            acceptCharset="utf-8"
            onSubmit={() => ''}
            className={styles.inputImage}
          >
            <input onChange={setfiles} accept="image/*" multiple type="file" name="files"/>
          </form>
          
          
        </div>
        
        {images.length >= 1?
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            overflowX: 'scroll',
            whiteSpace: 'nowrap'
          }}>
            {
              images.map((img) => {
                const image = URL.createObjectURL(img)
                return(
                  <div style={{
                    position: 'relative',
                    flexShrink: 0,
                  }}>
                    <span onClick={() => {
                      setImages((prev) => prev.filter(image => image != img))
                    }} style={{
                      position: 'absolute',
                      top: 6,
                      right: 6,
                      height: 20,
                      width: 20,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 50,
                      border: '0.5px solid #262626',
                      backgroundColor: '#1d1d1d',
                    }}>
                      ×
                    </span>
                    <img className={styles.postImg} src={image}/>
                  </div>
                )
              })
            }
          </div>
        : ''}
        
        <div onClick={() => setIsCategory(true)} className={styles.media}>
          <span className={styles.subMedia}>
            <FolderTree size={20}/>
            Add a category
          </span>
          <small className={styles.small}>{category || '•••'}</small>
        </div>
        
        <div onClick={() => setLangList(true)} className={styles.media}>
          <span className={styles.subMedia}>
            <Globe size={20}/>
            Languages
          </span>
          <small className={styles.small}>{selectedLang || '•••'}</small>
        </div>
        
        <div onClick={() => setShowRepost(true)} className={styles.media}>
          <span className={styles.subMedia}>
            <Repeat size={20}/>
            Allow repost
          </span>
          <small className={styles.small}>{!repost? 'Repost not allowed' : 'Repost allowed' || '•••'}</small>
        </div>
        
        <div onClick={() => setShowLocationsList(true)} className={styles.media}>
          <span className={styles.subMedia}>
            <Map size={20}/>
            Location
          </span>
          <small className={styles.small}>{location || '•••'}</small>
        </div>
        
      </div>
      
      <button onClick={create_post} className={styles.postButton}>
        Post
      </button>
    </div>
  );
}