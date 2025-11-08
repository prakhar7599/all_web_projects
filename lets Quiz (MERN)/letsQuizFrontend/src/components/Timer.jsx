import React, { useState, useEffect } from "react";

const Timer = ({ time }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const getTime = (startingTime) => {
    const remainingTime = startingTime - Date.now();

    const hours = Math.floor(
      (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    setHours(hours);
    setMinutes(minutes);
    setSeconds(seconds);
  };

  useEffect(() => {
    const startingTime = Date.now() + time;
    const interval = setInterval(() => {
      getTime(startingTime);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <h1>
        {hours} : {minutes} : {seconds}
      </h1>
    </div>
  );
};

export default Timer;
