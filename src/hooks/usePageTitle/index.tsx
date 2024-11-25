import { useEffect } from 'react';

export function usePageTitle(title: string) {
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      if (document.title !== title) {
        document.title = title;
      }
    });

    document.title = title;

    observer.observe(
        // @ts-ignore
      document.querySelector('title'),
      { childList: true, characterData: true, subtree: true }
    );

    // Cleanup function
    return () => observer.disconnect();
  }, [title]);
}
