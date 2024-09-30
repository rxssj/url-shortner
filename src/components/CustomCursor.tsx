"use client"

import { useState, useEffect, useRef } from 'react'

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const positionRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      positionRef.current = { x: e.clientX, y: e.clientY }
      setIsVisible(true)
    }

    const updateCursorPosition = () => {
      if (cursorRef.current) {
        const { x, y } = positionRef.current
        const rect = cursorRef.current.getBoundingClientRect()
        const currentX = rect.left
        const currentY = rect.top
        
        const newX = currentX + (x - currentX) * 0.1
        const newY = currentY + (y - currentY) * 0.1
        
        cursorRef.current.style.transform = `translate3d(${newX}px, ${newY}px, 0)`
      }
      requestAnimationFrame(updateCursorPosition)
    }

    window.addEventListener('mousemove', updatePosition)
    window.addEventListener('mouseenter', () => setIsVisible(true))
    window.addEventListener('mouseleave', () => setIsVisible(false))

    updateCursorPosition()

    return () => {
      window.removeEventListener('mousemove', updatePosition)
      window.removeEventListener('mouseenter', () => setIsVisible(true))
      window.removeEventListener('mouseleave', () => setIsVisible(false))
    }
  }, [])

  return (
    <div 
      ref={cursorRef}
      className="fixed w-8 h-8 bg-blue-500 rounded-full pointer-events-none z-50"
      style={{
        opacity: isVisible ? 0.7 : 0,
        transition: 'opacity 0.3s ease',
        top: 0,
        left: 0,
      }}
    />
  )
}
