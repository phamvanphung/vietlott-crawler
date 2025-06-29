import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

export const getHighestId = async () => {
  const { data, error } = await supabase
    .from('vietlot_binggo_18_result')
    .select('vietlot_id')
    .order('vietlot_id', { ascending: false })
    .limit(1);
  
  if (error) throw new Error(error.message);
  return data[0]?.vietlot_id || 115710; // Default starting ID
};

export const upsertResult = async (resultData) => {
  const { data, error, count } = await supabase
    .from('vietlot_binggo_18_result')
    .upsert(
      { ...resultData, created_at: new Date().toISOString() },
      { onConflict: 'vietlot_id' }
    )
    .select()
    .maybeSingle();
  
  if (error) throw new Error(error.message);
  return { data, count };
};

export const getRecentResults = async (limit = process.env.REACT_APP_RESULT_LIMIT || 50) => {
  const { data, error } = await supabase
    .from('vietlot_binggo_18_result')
    .select('*')
    .order('result_date', { ascending: false })
    .limit(limit);
  
  if (error) throw new Error(error.message);
  return data;
};

export const checkAnomaly = async () => {
  const { data, error } = await supabase
    .from('vietlot_binggo_18_result')
    .select('result_total')
    .order('result_date', { ascending: false })
    .limit(16);
  
  if (error) throw new Error(error.message);
  
  return data.every(entry => entry.result_total !== 12);
};


// Add this new function
export const checkExistingResult = async (vietlotId) => {
  const { data, error } = await supabase
    .from('vietlot_binggo_18_result')
    .select('*')
    .eq('vietlot_id', vietlotId)
    .maybeSingle();

  if (error) {
    console.error('Error checking existing result:', error);
    return null;
  }
  return data;
};

export default supabase;