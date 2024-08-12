import React, { useState } from 'react';

const Dashboard = ({ onUpdateBanner }) => {
  const [bannerText, setBannerText] = useState('');
  const [endTime, setEndTime] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateBanner({ bannerText, endTime: new Date(endTime).getTime(), link });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Banner Text:
        <input type="text" value={bannerText} onChange={(e) => setBannerText(e.target.value)} />
      </label>
      <label>
        End Time:
        <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
      </label>
      <label>
        Link:
        <input type="text" value={link} onChange={(e) => setLink(e.target.value)} />
      </label>
      <button type="submit">Update Banner</button>
    </form>
  );
};

export default Dashboard;
