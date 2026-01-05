import { Ellipsis, Heart, MessageCircleMore, Send2, SendHorizontal, Repeat, Smile, Smile2 } from 'lucide-react'
import { useState } from 'react';
import styles from '@/styles/transition.module.scss'
import dateFormat from '@/utils/dayjs.js'

export default function post({singlePost}){
  const post = singlePost
  const owner = singlePost.data.owner
  const repost = singlePost.data.repost
  const caption = singlePost.data.caption
  
  const [liked, setLiked] = useState(false)
  const [showLongCaption, setShowLongShort] = useState(false)
  const [repostCaptionShort, setRepostCaptionShort] = useState(post.data.repost?.data?.caption.split(' ').slice(0, 14).join(' '))
  const [showLongPostCaption, setShowLongPostShort] = useState(false)
  const [postCaptionShort, setPostCaptionShort] = useState(post.data.caption.split(' ').slice(0, 20).join(' '))
  const [showReactions, setShowReactions] = useState(false)
  
  const formater = (value) => {
    const formater = Intl.NumberFormat('en', {notation: 'compact'})
    const formated = value? formater.format(value) : 0
    return formated
  }
  const [likeCount, setlikeCount] = useState(0)
  const reactions = [
    '😂',
    '😲',
    '😞',
    '😡',
    '😂',
    '😂',
    '😂',
  ]
  
  return(
    <div className='w-[98%] flex flex-col gap-3 border-b border-[#161616] border-b-3 p-5 pl-2 pr-2'>
      
      {/*Post header*/}
      
      <div className='flex justify-between items-center'>
        <div className='flex gap-2 items-center'>
          <div className='h-11 w-11 flex items-center justify-center rounded-full bg-[rgba(106,105,254,0.125)] text-[#6a69fe] font-bold'>
            {owner?.name[0].toUpperCase()}
          </div>
          <div className='flex flex-col text-left'>
            <span className='text-[15px]'
              style={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                minWidth: '99%',
                whiteSpace: 'nowrap',
              }}
            >
              {owner?.name}
            </span>
            <small className='text-[#818181]'>
              {post.data.location} {post.data.location && '•'} {dateFormat(post.created_at)} 
            </small>
          </div>
        </div>
        
        <div className='flex gap-1'>
          <Ellipsis color='#535353'/>
        </div>
        
      </div>
      
      {/*Post body*/}
      
      <p className={`text-left ${repost.repost? null : 'm-1'} ml-13`}
        style={{
          wordBreak: 'break-word'
        }}
      >
        {showLongPostCaption? caption : postCaptionShort}
        {caption.split(' ').length > 20 && <strong onClick={() => setShowLongPostShort(!showLongPostCaption)} className='ml-2 text-[#6a69fe] cursor-pointer'>
          {showLongPostCaption? 'See less' : 'See more'}
        </strong>}
      </p>
      {repost.repost? 
        (
          <div className='flex flex-col border rounded-3xl p-3 border-[#262626] gap-2 bg-[#131313]'
            style={{
              wordBreak: 'break-word'
            }}
          >
            <div className='flex items-center gap-1'>
              <div className='flex flex-col justify-center h-8 w-8 bg-red-500 text-white rounded-full'>
                {repost.data.user.profile}
              </div>
              <span className='font-bold'>
                {repost.data.user.name}
              </span>
              •
              <span className='text-[#818181]'>
                @{repost.data.user.username}
              </span>
            </div>
            <span className='text-start ml-3'>
              {showLongCaption? repost.data.caption : repostCaptionShort}
              <strong onClick={() => setShowLongShort(!showLongCaption)} className='ml-2 text-[#6a69fe] cursor-pointer'>
                {showLongCaption? 'See less' : 'See more'}
              </strong>
            </span>
          </div>
        ) 
        : 
        null
      }
      
      <div className='relative flex gap-5 ml-13 text-[#c5c5c5]'>
        
        <div className='flex items-center gap-2 h-5'>
          <Smile
            size={22}
            fill={liked? '#6a69fe3a' : ''}
            color={liked? '#6a69fe' : '#c5c5c5'}
            onClick={() => {
              setLiked((prev) => prev? false : true)
              setlikeCount((prev) => liked? prev - 1 : prev + 1)
            }}
            onContextMenu={() => {
              setShowReactions((prev) => !prev)
            }}
          />
          <span className='p-0'>
            {formater(likeCount || 3982) || '58'}
          </span>
        </div>
        
        <div className='flex items-center gap-2 h-5'>
          <MessageCircleMore 
            size={20}
          />
          <span className='p-0'>
            {formater(1900) || ''}
          </span>
        </div>
        
        <SendHorizontal size={20}/>
        <Repeat size={20}/>
        {showReactions? (
          <div className={`w-auto absolute bottom-[30px] h-10 pl-4 pr-4 border border-[#323232] p-2 flex items-center gap-5 bg-[#262626] ml-7 scale-1.5 overflow-hidden ${styles.width}`} style={{
            borderRadius: 50,
          }}>
            {reactions.map((r, i) => (
              <span style={{
                transform: 'scale(1.5)',
              }} key={i}>
                {r}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}