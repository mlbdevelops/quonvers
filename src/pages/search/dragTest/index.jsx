'use client';
import { useState, useRef } from 'react';

export default function DraggableBox() {
  const boxRef = useRef();
  const [pos, setPos] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    e.preventDefault();
    setDragging(true);
    setOffset({
      x: e.clientX - pos.x,
      y: e.clientY - pos.y
    });
  };

  const handleTouchStart = (e) => {
    setDragging(true);
    const touch = e.touches[0];
    setOffset({
      x: touch.clientX - pos.x,
      y: touch.clientY - pos.y
    });
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      setPos({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y
      });
    }
  };

  const handleTouchMove = (e) => {
    if (dragging) {
      const touch = e.touches[0];
      setPos({
        x: touch.clientX - offset.x,
        y: touch.clientY - offset.y
      });
    }
  };

  const stopDrag = () => setDragging(false);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      onTouchMove={handleTouchMove}
      onTouchEnd={stopDrag}
      style={{ width: '100vw', height: '100vh', position: 'relative' }}
    >
      <div
        ref={boxRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{
          position: 'absolute',
          top: pos.y,
          left: pos.x,
          width: 120,
          height: 120,
          backgroundColor: 'purple',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'grab',
          userSelect: 'none',
          borderRadius: 20,
        }}
      >
        Drag me
      </div>
    </div>
  );
}