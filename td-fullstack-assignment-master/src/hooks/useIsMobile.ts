import { useState, useEffect } from 'react';

const isMobileDevice = (): boolean => {
  const userAgent =
    navigator.userAgent || navigator.vendor || (window as any).opera;

  return /android|avantgo|bada|blackberry|bb|blazer|compal|elaine|fennec|hiptop|iemobile|ipad|iphone|ipod|iris|kindle|lge|maemo|meego|midp|mmp|mobile|netfront|nokia|palm|phone|pocket|psp|series40|symbian|tizen|treo|up.browser|up.link|vodafone|wap|windows ce|xda|xiino/i.test(
    userAgent,
  );
};

const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  return isMobile;
};

export { useIsMobile };
