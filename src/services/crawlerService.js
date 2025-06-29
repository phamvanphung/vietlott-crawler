  /////////////////////////////////////////////////////

// src/services/crawlerService.js
import { fetchVietlottResult } from './api/vietlottApi';
import { parseWithXPath } from './api/xpathParser';
import { upsertResult, checkExistingResult } from './supabaseService';

export const crawlWithAutoSuccess = async (vietlotId) => {
  // Validate and format the ID
  if (!vietlotId && vietlotId !== 0) {
    throw new Error('No ID provided');
  }

  const idStr = String(vietlotId);
  if (!/^\d+$/.test(idStr)) {
    throw new Error('ID must contain only digits');
  }


  const paddedId = idStr.padStart(7, '0');
  
  try {
    const html = await fetchVietlottResult(paddedId);
    
    const resultData = {
      ...parseWithXPath(html),
    //   vietlot_id: parseInt(idStr, 10), // Store original numeric ID
      crawled_at: new Date().toISOString()
    };

    const { data } = await upsertResult(resultData);
    return {
      status: 'success',
      data,
      message: `Successfully crawled ID: ${vietlotId} (padded: ${paddedId})`
    };
  } catch (error) {
    throw new Error(`Failed to crawl ID ${vietlotId}: ${error.message}`);
  }
};