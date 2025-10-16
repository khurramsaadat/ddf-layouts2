'use client';

import { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  end,
  duration = 1000,
  className = '',
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    // Reset counter when end value changes
    countRef.current = 0;
    setCount(0);
    startTimeRef.current = null;
    
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
    
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      
      const progress = timestamp - startTimeRef.current;
      const progressRatio = Math.min(progress / duration, 1);
      
      // Easing function for smoother animation
      const easedProgress = progressRatio < 0.5
        ? 4 * progressRatio * progressRatio * progressRatio
        : 1 - Math.pow(-2 * progressRatio + 2, 3) / 2;
      
      const nextCount = Math.round(easedProgress * end);
      
      if (nextCount !== countRef.current) {
        countRef.current = nextCount;
        setCount(nextCount);
      }
      
      if (progressRatio < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };
    
    frameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [end, duration]);
  
  return <span className={className}>{count}</span>;
}
