import React, { useState, useEffect } from 'react'

const CountDown = ({value, onEnd}) => {
  const [countdown, setCountdown] = useState(value);
  useEffect(() => {
    setCountdown(value)
    const timer = setInterval(() => {
      setCountdown((e) => e - 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [value]);
  useEffect(() => {
    if (countdown === 0) {
      onEnd()
      console.log('Countdown finished!');
    }
  }, [countdown]);
  return (
    <>{countdown}</>
  )
}

export default CountDown