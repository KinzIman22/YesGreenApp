import api from './api';

// LoginScreen.js calls: loginUser(emailOrPhone.trim(), password)
// aur response ko direct destructure karta hai: { access_token, refreshToken, user } = response
// isliye yahan res.data return kar rahe hain (response object nahi).
export const loginUser = async (emailOrPhone, password) => {
  const { data } = await api.post('/auth/login', {
    email: emailOrPhone,
    password: password,
  });
  return data; // { access_token, refreshToken, user }
};

// SignUpScreen.js calls: signupUser(payload)
// jahan payload = { name, email, phone, password, cnicNumber }
// backend /auth/signup OTP email bhejta hai, isliye screen success par
// navigation.navigate('OTPVerification', { email }) karti hai.
export const signupUser = async (payload) => {
  const { data } = await api.post('/auth/signup', payload);
  return data;
};

// OTPVerificationScreen.js calls: verifyOtp({ email, otp })
export const verifyOtp = async ({ email, otp }) => {
  const { data } = await api.post('/auth/verify-otp', { email, otp });
  return data; // { access_token, refreshToken, user }
};

// OTPVerificationScreen.js calls: resendOtp({ email })
export const resendOtp = async ({ email }) => {
  const { data } = await api.post('/auth/resend-otp', { email });
  return data;
};

// ForgotPasswordScreen.js calls: forgotPassword({ email })
// Backend hamesha generic success message deta hai (email exist karta hai ya nahi, ye leak nahi hota).
// Reset OTP 10 minute ke liye valid hota hai.
export const forgotPassword = async ({ email }) => {
  const { data } = await api.post('/auth/forgot-password', { email });
  return data;
};

// ResetPasswordScreen.js (jab bane) ke liye - code = email par mila OTP
export const resetPassword = async ({ email, code, newPassword }) => {
  const { data } = await api.post('/auth/reset-password', { email, code, newPassword });
  return data;
};