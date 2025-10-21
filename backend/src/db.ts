// Mock database for development
export const query = async (text: string, params?: any[]) => {
  console.log('🔍 Mock Query:', text);
  console.log('📝 Mock Params:', params);
  
  // Simulate database delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Return mock data for common queries
  if (text.includes('CREATE TABLE')) {
    console.log('✅ Mock: Tables created successfully');
    return { rows: [], rowCount: 0 };
  }
  
  if (text.includes('SELECT')) {
    console.log('✅ Mock: Returning empty result set');
    return { rows: [], rowCount: 0 };
  }
  
  return { rows: [], rowCount: 0 };
};

export const testConnection = async () => {
  console.log('✅ Mock database connected');
  return true;
};