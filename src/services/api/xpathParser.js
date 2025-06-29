import { ca } from "date-fns/locale";

export const parseWithXPath = (html) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  const getXpathValue = (xpath) => {
    const result = doc.evaluate(
      xpath, 
      doc, 
      null, 
      XPathResult.STRING_TYPE, 
      null
    );
    return result.stringValue;
  };

  return {
    vietlot_id: parseInt(getXpathValue(
      '//*[@id="divBingoResultContent"]/div[2]/table/tbody/tr[3]/td[2]'
    ).replace('#', '')),
    
    result_total: parseInt(getXpathValue(
      '//*[@id="divBingoResultContent"]/div[2]/table/tbody/tr[4]/td[2]/div'
    )),
    
    result_date: formatDateString(getXpathValue(
      '//*[@id="divBingoResultContent"]/div[2]/table/tbody/tr[3]/td[1]'
    ))
  };
};

const formatDateString = (dateStr) => {
    try {

         const [day, month, year] = dateStr.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    } catch (error) {
        console.error('Error formatting date string:', error);
        return null; // or handle the error as needed
    }
 
};