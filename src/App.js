import './App.css';
import React, { useEffect, useState } from 'react';
import MobilePortal from './components/shared/MobilePortal';
import DesktopPortal from './components/shared/DesktopPortal';
import { Analytics } from '@vercel/analytics/react';

function App() {
  const [deviceType, setDeviceType] = useState('desktop');

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const ua = navigator.userAgent;
      
      const isTouchDevice = () => {
        return (('ontouchstart' in window) ||
           (navigator.maxTouchPoints > 0) ||
           (navigator.msMaxTouchPoints > 0));
      };
      
      const isTablet = isTouchDevice() && 
                       Math.min(width, height) > 768 && 
                       Math.max(width, height) <= 1366;
      
      const isMobile = /Android|webOS|iPhone/i.test(ua) || 
                       (isTouchDevice() && Math.min(width, height) <= 768);

      if (isTablet) {
        setDeviceType(width > height ? 'tablet-landscape' : 'tablet-portrait');
      } else if (isMobile) {
        setDeviceType(width > height ? 'mobile-landscape' : 'mobile-portrait');
      } else {
        setDeviceType('desktop');
      }
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return (
    <>
      <div className="app-container">
        {deviceType.startsWith('mobile') && <MobilePortal deviceType={deviceType} />}
        {deviceType.startsWith('tablet') && <div>The tablet version of this website is currently in development. </div>}
        {deviceType === 'desktop' && <DesktopPortal />}
      </div>
      <Analytics />
    </>
  );
}

export default App;
