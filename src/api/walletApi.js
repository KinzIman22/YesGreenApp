import api from './api';

export const createWithdrawalRequest = async (withdrawalData) => {
  const { data } = await api.post('/wallet/withdrawal-requests', withdrawalData);
  return data;
};

// Get current wallet balance
export const getMyBalance = async () => {
  const { data } = await api.get('/wallet/my-balance');
  return data;
};

// Add balance / Deposit request
export const addBalance = async (formData) => {
  const { data } = await api.post('/wallet/add-balance', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};