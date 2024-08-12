import React, { useState, useEffect } from 'react';
import Banner from './components/Banner';
import Dashboard from './components/Dashboard';
import axios from 'axios';

const App = () => {
  const [bannerData, setBannerData] = useState({
    visible: false,
    description: '',
    timer: 10,
    link: ''
  });

  useEffect(() => {
    axios.get('/api/banner')
      .then(response => setBannerData(response.data));
  }, []);

  return (
    <div className="App">
      <Banner 
        visible={bannerData.visible}
        description={bannerData.description}
        timer={bannerData.timer}
        link={bannerData.link}
      />
      <Dashboard />
    </div>
  );
};

export default App;
