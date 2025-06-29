// src/contexts/CrawlerContext.jsx
import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { crawlWithAutoSuccess } from '../services/crawlerService';
import { getHighestId, checkExistingResult } from '../services/supabaseService';

const CrawlerContext = createContext();

export function CrawlerProvider({ children }) {
    // Define all state variables at the top
    const [isAutoCrawling, setIsAutoCrawling] = useState(false);
    const [progress, setProgress] = useState(null);
    const [status, setStatus] = useState('');
    const [notifications, setNotifications] = useState([]);
    const isAutoCrawlingRef = useRef(false); // Moved useRef to component level

    const clearNotifications = useCallback(() => {
        setNotifications([]);
    }, []);

    // In CrawlerContext.jsx
    const manualCrawl = useCallback(async (vietlotId) => {
        try {
            setStatus(`Processing ID: ${vietlotId}`);

            const result = await crawlWithAutoSuccess(vietlotId);

            if (result.error) {
                throw new Error(result.error);
            }

            setStatus(`Successfully crawled ID: ${vietlotId}`);
            return result;

        } catch (error) {
            let errorMsg = error.message;

            // Special handling for 403 errors
            if (error.message.includes('403')) {
                errorMsg = 'Access denied by Vietlott server. Please try again later.';
            }

            setStatus(`Failed: ${errorMsg}`);
            return { error: errorMsg };
        }
    }, []);

    // src/contexts/CrawlerContext.jsx
    const startAutoCrawl = useCallback(async () => {
        setIsAutoCrawling(true);
        isAutoCrawlingRef.current = true;
        let currentId = await getHighestId() + 1;
        let crawlInterval;

        const crawl = async () => {
            if (!isAutoCrawlingRef.current) return;

            try {
                await manualCrawl(currentId);
                currentId++;
            } catch (error) {
                console.error('Auto-crawl error:', error);
            }
        };


        // Initial immediate crawl
        await crawl();

        // Set up interval
        crawlInterval = setInterval(crawl, process.env.REACT_APP_CRAWL_INTERVAL || 60000); // 60 seconds

        return () => {
            isAutoCrawlingRef.current = false;
            clearInterval(crawlInterval);
                setIsAutoCrawling(false);
    isAutoCrawlingRef.current = false;
        };
    }, [manualCrawl]);

    const stopAutoCrawl = useCallback(() => {
        setIsAutoCrawling(false);
        isAutoCrawlingRef.current = false;
    }, []);

    return (
        <CrawlerContext.Provider value={{
            isAutoCrawling,
            progress,
            status,
            setStatus, // This must be included
            notifications,
            clearNotifications,
            manualCrawl,
            startAutoCrawl,
            stopAutoCrawl
        }}>
            {children}
        </CrawlerContext.Provider>
    );
}

export const useCrawler = () => useContext(CrawlerContext);