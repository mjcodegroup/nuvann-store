// hooks/useBeforeLeave.ts
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useBeforeLeave = (onLeave: (url: string) => void) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
        onLeave(url);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [onLeave, router]);
};

export default useBeforeLeave;
