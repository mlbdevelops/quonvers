import { useRef } from "react";
import styles from "@/styles/transition.module.scss";

export default function Sheet({ onClose, className, style, body}) {
  const startY = useRef(0);
  const currentY = useRef(0);
  const sheetRef = useRef(null);

  const onTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
  };

  const onTouchMove = (e) => {
    currentY.current = e.touches[0].clientY - startY.current;

    if (currentY.current > 0 && sheetRef.current) {
      sheetRef.current.style.transform =
        `translateY(${currentY.current}px)`;
    }
  };

  const onTouchEnd = () => {
    if (!sheetRef.current) return;

    // 👇 dismiss threshold
    if (currentY.current > 90) {
      sheetRef.current.style.transform = "translateY(100%)";
      setTimeout(onClose, 200);
    } else {
      // snap back
      sheetRef.current.style.transform = "translateY(0)";
    }

    currentY.current = 0;
  };

  return (
    <div
      onClick={onClose}
      className="w-[100dvw] h-[100dvh] bottom-0 fixed z-20"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div
        ref={sheetRef}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={style}
        className={`w-full h-[40%] bg-[#1d1d1d] bottom-0 fixed rounded-t-[30px] overflow-hidden ${styles.trans_sheet} ${className}`}
      >
        <div className="w-full flex items-center justify-center pt-2 pb-2">
          <div className="w-10 h-1 rounded-full bg-[darkgray]" />
        </div>
        {body}
      </div>
    </div>
  );
}