import { useState, useEffect, useRef } from 'react';

export const useQuizTimer = (duration: number, onTimeUp?: () => void) => {
  const [timeRemaining, setTimeRemaining] = useState(duration * 60);
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            if (onTimeUp) onTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeRemaining, onTimeUp]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const pause = () => setIsRunning(false);
  const resume = () => setIsRunning(true);
  const reset = () => {
    setTimeRemaining(duration * 60);
    setIsRunning(true);
  };

  return {
    timeRemaining,
    formattedTime: formatTime(timeRemaining),
    isRunning,
    pause,
    resume,
    reset,
  };
};
