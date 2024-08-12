import React, { useState, useEffect } from 'react';

const Banner = ({ showBanner, bannerText, endTime, link }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (endTime) {
      const intervalId = setInterval(() => {
        const now = new Date().getTime();
        const distance = endTime - now;
        if (distance < 0) {
          clearInterval(intervalId);
          setTimeLeft(0);
        } else {
          setTimeLeft(distance);
        }
      }, 1000);
      
      return () => clearInterval(intervalId);
    }
  }, [endTime]);

  const formatTime = (time) => {
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  if (!showBanner) return null;

  return (
    <div className="banner">
      <p>{bannerText}</p>
      <p>{formatTime(timeLeft)}</p>
      {link && <a href={link}>Learn More</a>}
    </div>
  );
};

export default Banner;
