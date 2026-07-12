import { useEffect, useRef } from 'react';

export function useEngagedSession(thresholdSeconds = 60) {
  const activeSeconds = useRef(0);
  const isActive = useRef(false);
  const hasFired = useRef(false);

  useEffect(() => {
    let activityTimeout: any;

    const pingActivity = () => {
      isActive.current = true;
      clearTimeout(activityTimeout);
      activityTimeout = setTimeout(() => {
        isActive.current = false;
      }, 3000);
    };

    window.addEventListener('scroll', pingActivity, { passive: true });
    window.addEventListener('mousemove', pingActivity, { passive: true });
    window.addEventListener('touchstart', pingActivity, { passive: true });
    window.addEventListener('keydown', pingActivity, { passive: true });

    const timer = setInterval(() => {
      if (isActive.current && !document.hidden && !hasFired.current) {
        activeSeconds.current += 1;
        if (activeSeconds.current >= thresholdSeconds) {
          hasFired.current = true;
          (window as any).dataLayer = (window as any).dataLayer || [];
          (window as any).dataLayer.push({ 
            event: 'engaged_reader_60s',
            seconds_active: thresholdSeconds
          });
        }
      }
    }, 1000);

    return () => {
      window.removeEventListener('scroll', pingActivity);
      window.removeEventListener('mousemove', pingActivity);
      window.removeEventListener('touchstart', pingActivity);
      window.removeEventListener('keydown', pingActivity);
      clearInterval(timer);
      clearTimeout(activityTimeout);
    };
  }, [thresholdSeconds]);
}
