import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { forgotPassword } from '../api/authApi';

const ThemeColors = {
  primaryDark: '#054A29',
  screenBg: '#EEF2F0',
  buttonGreen: '#044223',
  accentYellow: '#F3C649',
  accentGold: '#E6B800',
  starGrey: 'rgba(255, 255, 255, 0.75)',
  coinBase: '#E5B132',
  coinText: '#5C4300',
  white: '#FFFFFF',
  black: '#000000',
  cardBg: '#FFFFFF',
  inputBg: '#F8F9FA',
  inputBorder: '#E2E8F0',
  iconGrey: '#718096',
  placeholderText: '#A0AEC0',
  textDark: '#1A202C',
  textMuted: '#718096',
  forgotText: '#0B663B',
};

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendResetCode = async () => {
    if (!email.trim()) {
      Alert.alert('Validation Error', 'Please enter your email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    try {
      setIsLoading(true);

      // Real backend call - /auth/forgot-password
      await forgotPassword({ email: email.trim() });

      setIsLoading(false);
      Alert.alert(
        'Reset Code Sent',
        `A password reset code has been sent to ${email}`,
        [
          {
            text: 'OK',
            onPress: () => navigation?.navigate('OTPVerification', { email: email.trim() }),
          },
        ]
      );
    } catch (error) {
      setIsLoading(false);
      const errorMsg = error.response?.data?.message || 'Failed to send reset code. Please try again.';
      Alert.alert('Error', Array.isArray(errorMsg) ? errorMsg[0] : errorMsg);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={ThemeColors.primaryDark} />

      {/* Header Section */}
      <View style={styles.topSection}>
        <Text style={[styles.starGold, { top: 12, left: 18, fontSize: 18 }]}>★</Text>
        <Text style={[styles.starGrey, { top: 15, left: 110, fontSize: 13 }]}>★</Text>
        <Text style={[styles.starGold, { bottom: 18, left: 22, fontSize: 16 }]}>★</Text>
        <Text style={[styles.starGold, { top: 18, right: 150, fontSize: 12 }]}>★</Text>

        <View style={[styles.numberBadgeSmall, styles.badge2]}>
          <Text style={styles.badgeTextSmall}>2</Text>
        </View>
        <View style={[styles.numberBadge, styles.badge7]}>
          <Text style={styles.badgeText}>7</Text>
        </View>
        <View style={[styles.numberBadgeSmall, styles.badge4]}>
          <Text style={styles.badgeTextSmall}>4</Text>
        </View>

        <View style={styles.coinStack}>
          <View style={[styles.coin, styles.topCoin]}>
            <Text style={styles.coinText}>PKR</Text>
          </View>
          <View style={styles.coin} />
          <View style={styles.coin} />
          <View style={styles.coin} />
        </View>

        <View style={styles.headerContent}>
          <Image
            source={require('../assets/LoginLogo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.brandTitle}>
            YesTime <Text style={styles.brandTitleGold}>Plus</Text>
          </Text>
          <Text style={styles.brandSubtitle}>Play Better. Win Bigger.</Text>
        </View>
      </View>

      {/* Floating Card Section */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.floatingCard}>
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation?.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={20} color={ThemeColors.textDark} />
          </TouchableOpacity>

          <Text style={styles.welcomeTitle}>Forgot Password</Text>
          <Text style={styles.welcomeSubtitle}>Enter your email address</Text>

          {/* Email Address */}
          <Text style={styles.inputLabel}>Email Address</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={18} color={ThemeColors.iconGrey} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your email"
              placeholderTextColor={ThemeColors.placeholderText}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Send Reset Code Button */}
          <TouchableOpacity
            style={styles.actionBtn}
            activeOpacity={0.8}
            onPress={handleSendResetCode}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={ThemeColors.white} />
            ) : (
              <Text style={styles.actionBtnText}>Send Reset Code</Text>
            )}
          </TouchableOpacity>

          {/* Remembered Password / Login Link */}
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Remembered your password? </Text>
            <TouchableOpacity onPress={() => navigation?.navigate('Login')}>
              <Text style={styles.loginLinkText}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.screenBg,
  },
  topSection: {
    height: 220,
    backgroundColor: ThemeColors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  starGold: { position: 'absolute', color: ThemeColors.accentYellow, opacity: 0.95 },
  starGrey: { position: 'absolute', color: ThemeColors.starGrey, opacity: 0.85 },
  headerContent: { alignItems: 'center', marginTop: 10 },
  logoImage: { width: 60, height: 60, marginBottom: 6 },
  brandTitle: { fontSize: 22, fontWeight: 'bold', color: ThemeColors.white },
  brandTitleGold: { color: ThemeColors.accentYellow },
  brandSubtitle: { fontSize: 12, color: ThemeColors.white, opacity: 0.8, marginTop: 2 },

  numberBadge: {
    position: 'absolute',
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: ThemeColors.white,
    borderWidth: 2,
    borderColor: ThemeColors.accentGold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberBadgeSmall: {
    position: 'absolute',
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: ThemeColors.white,
    borderWidth: 1.5,
    borderColor: ThemeColors.accentGold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { fontWeight: 'bold', fontSize: 16, color: ThemeColors.black },
  badgeTextSmall: { fontWeight: 'bold', fontSize: 11, color: ThemeColors.black },
  badge2: { top: '12%', right: '28%' },
  badge7: { top: '18%', right: '12%' },
  badge4: { top: '42%', right: '5%' },

  coinStack: { position: 'absolute', left: '5%', top: '25%', alignItems: 'center' },
  coin: {
    width: 44,
    height: 10,
    backgroundColor: ThemeColors.coinBase,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: ThemeColors.accentGold,
    marginTop: -3,
  },
  topCoin: {
    height: 12,
    backgroundColor: ThemeColors.accentYellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coinText: { fontSize: 7, fontWeight: 'bold', color: ThemeColors.coinText },

  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  floatingCard: {
    backgroundColor: ThemeColors.cardBg,
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
    elevation: 4,
    shadowColor: ThemeColors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#EEF2F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  welcomeTitle: { fontSize: 24, fontWeight: 'bold', color: ThemeColors.textDark, marginBottom: 4 },
  welcomeSubtitle: { fontSize: 13, color: ThemeColors.textMuted, marginBottom: 24 },

  inputLabel: { fontSize: 13, fontWeight: 'bold', color: ThemeColors.textDark, marginBottom: 8, marginTop: 8 },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ThemeColors.inputBg,
    borderWidth: 1,
    borderColor: ThemeColors.inputBorder,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 52,
    marginBottom: 24,
  },
  inputIcon: { marginRight: 10 },
  textInput: { flex: 1, fontSize: 14, color: ThemeColors.textDark },

  actionBtn: {
    backgroundColor: ThemeColors.buttonGreen,
    borderRadius: 14,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: ThemeColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  actionBtnText: { color: ThemeColors.white, fontSize: 16, fontWeight: 'bold' },

  footerRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 24 },
  footerText: { fontSize: 13, color: ThemeColors.textMuted },
  loginLinkText: { fontSize: 13, fontWeight: 'bold', color: ThemeColors.forgotText },
});

export default ForgotPasswordScreen;