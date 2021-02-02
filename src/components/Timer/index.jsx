import { useState, useRef, useEffect } from 'react';

export const Timer = ({ timeout }) => {
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);
  const [currentTimeout, setCurrentTimeout] = useState(0);

  useEffect(() => {
    const runTimer = () => {
      const timeoutMS = new Date(timeout).getTime() - new Date().getTime();

      if (timeoutMS <= 0) {
        setCurrentTimeout(0);
        return;
      }

      let nextTickMS = (timeoutMS - timeoutMS % 1000) / 1000;

      setCurrentTimeout(nextTickMS);

      timeoutRef.current = setTimeout(() => {
        intervalRef.current = setInterval(() => {
          nextTickMS -= 1;
          setCurrentTimeout(nextTickMS);

          if (nextTickMS <= 0) {
            clearInterval(intervalRef.current);
          }
        }, 1000);

      }, timeout);
    };

    const handleFocus = () => {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
      runTimer();
    };

    window.addEventListener('focus', handleFocus, false);

    runTimer();

    return () => {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
      window.removeEventListener('focus', handleFocus, false);
    };
  }, [timeout]);

  const minutes = Math.floor(currentTimeout / 60);
  const seconds = currentTimeout - minutes * 60;

  return (
    <span>
      {minutes || ''}{minutes ? '' : ''}
      {seconds > 9 ? '' : '0'}{seconds}
    </span>
  );
}
