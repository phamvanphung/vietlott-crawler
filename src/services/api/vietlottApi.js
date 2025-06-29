// src/services/api/vietlottApi.js
export const fetchVietlottResult = async (paddedId) => {
  const proxyUrl = process.env. REACT_APP_PROXY_URL || '';
  const url = `https://vietlott.vn/vi/trung-thuong/ket-qua-trung-thuong/view-detail-bingo18-result?nocatche=1&id=${paddedId}`;
  
  const urlFinal = proxyUrl + url;
  try {
    const response = await fetch(urlFinal, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
        'Referer': 'https://vietlott.vn/',
        'X-Requested-With': 'XMLHttpRequest'
      },
      mode: 'cors'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.text();
  } catch (error) {
    console.error('Failed to fetch Vietlott result:', error);
    throw new Error(`Could not fetch data for ID ${paddedId}`);
  }
};