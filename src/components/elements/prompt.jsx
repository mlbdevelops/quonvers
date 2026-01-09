import { useState, useRef } from 'react'
import styles from '@/styles/transition.module.scss'

export default function Prompt({
  title,
  placeholder,
  def_value,
  onCancel,
  value,
  onSubmit
}) {
  const [default_value, set_default_value] = useState(def_value)

  const startY = useRef(0)
  const currentY = useRef(0)
  const promptRef = useRef(null)

  const onTouchStart = (e) => {
    startY.current = e.touches[0].clientY
  }

  const onTouchMove = (e) => {
    currentY.current = e.touches[0].clientY - startY.current
    if (currentY.current > 0 && promptRef.current) {
      promptRef.current.style.transform =
        `translateY(${currentY.current}px)`
    }
  }

  const onTouchEnd = () => {
    if (!promptRef.current) return
    if (currentY.current > 90) {
      promptRef.current.style.transform = 'translateY(100%)'
      setTimeout(() => {
        typeof onCancel === 'function' && onCancel()
      }, 200)
    } else {
      promptRef.current.style.transform = 'translateY(0)'
    }
    currentY.current = 0
  }

  return (
    <div
      onClick={() => typeof onCancel === 'function' && onCancel()}
      className="w-[100dvw] h-[100dvh] bg-[rgba(0,0,0,0.5)] top-0 fixed z-30"
    >
      <div
        ref={promptRef}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className={`w-full h-[190px] bg-[#1d1d1d] rounded-t-[25px] flex flex-col items-center justify-between overflow-hidden bottom-0 fixed ${styles.trans_sheet}`}
      >
        <div className="w-full flex items-center justify-center pt-2">
          <div className="w-10 h-1 rounded-full bg-[#545454]" />
        </div>

        <strong className="text-center text-xl">
          {title || 'Enter a title'}
        </strong>

        <input
          type="text"
          placeholder={placeholder || 'Type here...'}
          value={default_value}
          onChange={(e) => {
            set_default_value(e.target.value)
            //typeof value != 'function' && value(e.target.value)
          }}
          className="w-[90%] outline-none p-2 pl-4 rounded-xl bg-[#262626]"
        />

        <div className="w-full flex items-center justify-between border-t-2 border-[#262626]">
          <button
            onClick={() => typeof onCancel === 'function' && onCancel()}
            className="w-[50%] h-12 active:bg-[#262626] font-bold border-r border-r-[#262626]"
          >
            Cancel
          </button>

          <button
            onClick={() =>
              typeof onSubmit === 'function' && onSubmit(default_value)
            }
            className="w-[50%] border-l border-l-[#262626] h-12 active:bg-[#262626] text-[#6a69fe] font-bold"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  )
}