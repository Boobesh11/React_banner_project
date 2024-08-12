import React, { useState, useEffect } from 'react';
import './App.css';
import backgroundImage from './image.jpg'; // Import the background image

// Banner Component
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
      {link && <a href={link} target="_blank" rel="noopener noreferrer">Learn More</a>}
    </div>
  );
};

// Internal Dashboard Component
const Dashboard = ({ banner, onUpdateBanner }) => {
  const [localBanner, setLocalBanner] = useState(banner);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalBanner({ ...localBanner, [name]: value });
  };

  const handleSwitchChange = (e) => {
    setLocalBanner({ ...localBanner, showBanner: e.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateBanner(localBanner);
  };

  return (
    <form onSubmit={handleSubmit} className="dashboard-form">
      <label>
        Show Banner:
        <input
          type="checkbox"
          name="showBanner"
          checked={localBanner.showBanner}
          onChange={handleSwitchChange}
        />
      </label>
      <label>
        Banner Text:
        <input
          type="text"
          name="bannerText"
          value={localBanner.bannerText}
          onChange={handleInputChange}
        />
      </label>
      <label>
        End Time:
        <input
          type="datetime-local"
          name="endTime"
          value={new Date(localBanner.endTime).toISOString().slice(0, -1)}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Link:
        <input
          type="text"
          name="link"
          value={localBanner.link}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Update Banner</button>
    </form>
  );
};

// Main App Component
const App = () => {
  const [banner, setBanner] = useState({
    showBanner: true,
    bannerText: 'Welcome to My Website!',
    endTime: new Date().getTime() + 3600000, // 1 hour from now
    link: 'https://example.com',
  });

  const handleUpdateBanner = (updatedBanner) => {
    setBanner(updatedBanner);
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Banner
        showBanner={banner.showBanner}
        bannerText={banner.bannerText}
        endTime={banner.endTime}
        link={banner.link}
      />
      <Dashboard banner={banner} onUpdateBanner={handleUpdateBanner} />
    </div>
  );
};

export default App;
