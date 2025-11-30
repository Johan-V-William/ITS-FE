import { useState, useEffect } from 'react';

interface UseTimerReturn {
  minutes: number;
  seconds: number;
  timeLeft: number;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useTimer = (initialMinutes: number): UseTimerReturn => {
  const [timeLeft, setTimeLeft] = useState<number>(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState<boolean>(true);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return { minutes, seconds, timeLeft, setIsRunning };
};