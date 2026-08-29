import api from './api';

// ================= 1. REGISTRATION LOTTERY MODULE =================

export const payRegistrationLottery = async () => {
  const { data } = await api.post('/registration-lottery/pay');
  return data;
};

export const playRegistrationLottery = async () => {
  const { data } = await api.post('/registration-lottery/play');
  return data;
};

export const getRegistrationLotteryInfo = async () => {
  const { data } = await api.get('/registration-lottery/my-info');
  return data;
};

export const getNextDrawDetails = async () => {
  const { data } = await api.get('/registration-lottery/next-draw');
  return data;
};


// ================= 2. CAR CONTRIBUTION MODULE =================

export const getCarPlans = async () => {
  const { data } = await api.get('/car-participation/plans');
  return data;
};

export const joinCarPlan = async (joinData) => {
  // joinData = { planId: 1-4, referralCode: 'XYZ' }
  const { data } = await api.post('/car-participation/join', joinData);
  return data;
};

export const getCarParticipationInfo = async () => {
  const { data } = await api.get('/car-participation/my-participation');
  return data;
};

export const getCarContributionStats = async () => {
  const { data } = await api.get('/car-contributions/stats');
  return data;
};

export const makeCarContribution = async (contributionData) => {
  // contributionData = { participationId, amount }
  const { data } = await api.post('/car-contributions', contributionData);
  return data;
};

export const playCarSpin = async () => {
  const { data } = await api.post('/car-participation/play-now');
  return data;
};

export const requestCarClaim = async () => {
  const { data } = await api.post('/car-participation/request-car');
  return data;
};


// ================= 3. GAME MODULE =================

export const joinGameInvestment = async () => {
  const { data } = await api.post('/game/join');
  return data;
};

export const playGameNow = async (tokenId) => {
  const { data } = await api.post('/game/play-now', { tokenId });
  return data;
};

export const getGameActiveCycle = async () => {
  const { data } = await api.get('/game/active-cycle');
  return data;
};