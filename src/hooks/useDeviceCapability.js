import { useState, useEffect } from 'react';

export function useDeviceCapability() {
  const [capability, setCapability] = useState({
    isMobile: false,
    isLowPower: false,
    pixelRatio: 1,
    particleCount: 200,
    shadowQuality: true,
  });

  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth < 768;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const isLowPower = isMobile || dpr <= 1;

    setCapability({
      isMobile,
      isLowPower,
      pixelRatio: dpr,
      particleCount: isLowPower ? 80 : 200,
      shadowQuality: !isLowPower,
    });
  }, []);

  return capability;
}
