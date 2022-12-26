import { useState, useRef, useEffect } from 'react';

import styles from './styles.scss';

export const Timer = ({ timeout }) => {
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);
  const [finished, setFinished] = useState(true);
  const [currentTimeout, setCurrentTimeout] = useState(0);
  const [initialTimeout, setInitialTimeout] = useState(0);

  useEffect(() => {
    const runTimer = () => {
      const timeoutMS = new Date(timeout).getTime() - new Date().getTime();

      if (timeoutMS <= 0) {
        setCurrentTimeout(0);
        setFinished(true);
        return;
      }

      let nextTickMS = (timeoutMS - timeoutMS % 1000) / 1000;

      setCurrentTimeout(nextTickMS);
      setFinished(false);

      timeoutRef.current = setTimeout(() => {
        intervalRef.current = setInterval(() => {
          nextTickMS -= 1;
          setCurrentTimeout(nextTickMS);

          if (nextTickMS < 0) {
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
    setInitialTimeout(new Date(timeout).getTime() - new Date().getTime());

    return () => {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
      window.removeEventListener('focus', handleFocus, false);
    };
  }, [timeout]);

  if (finished || currentTimeout < 0) {
    return null;
  }

  const minutes = Math.floor(currentTimeout / 60);
  const seconds = currentTimeout - minutes * 60;

  return (
    <div className={styles.timer}>
      <div
        className={styles.progress}
        style={{ animationDuration: `${initialTimeout}ms` }}
      />
      {minutes || ''}{minutes ? ':' : ''}
      {seconds > 9 ? '' : '0'}{seconds}
    </div>
  );
}
