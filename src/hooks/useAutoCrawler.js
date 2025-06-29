// src/hooks/useAutoCrawler.js
import { useEffect } from 'react';
import { useCrawler } from '../contexts/CrawlerContext';
import { getHighestId } from '../services/supabaseService';

// Changed from named export to default export
export  function useAutoCrawler() {
  const { 
    isAutoCrawling, 
    progress, 
    startAutoCrawl, 
    stopAutoCrawl 
  } = useCrawler();

  useEffect(() => {
    const initializeAutoCrawl = async () => {
      if (isAutoCrawling && !progress) {
        const highestId = await getHighestId();
        startAutoCrawl();
      }
    };
    
    initializeAutoCrawl();
  }, [isAutoCrawling, progress, startAutoCrawl]);

  return {
    isAutoCrawling,
    progress,
    startAutoCrawl,
    stopAutoCrawl
  };
}