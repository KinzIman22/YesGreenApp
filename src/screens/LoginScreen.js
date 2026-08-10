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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ya 'react-native-vector-icons/Ionicons'

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
  iconGrey: '#718096', // Crisp Pure Grey Icon Color
  placeholderText: '#A0AEC0',
  textDark: '#1A202C',
  textMuted: '#718096',
  forgotText: '#0B663B',
};

const LoginScreen = ({ navigation }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={ThemeColors.primaryDark} />

      {/* Top Section */}
      <View style={styles.topSection}>
        {/* Background Stars */}
        <Text style={[styles.starGold, { top: 12, left: 18, fontSize: 18 }]}>★</Text>
        <Text style={[styles.starGrey, { top: 15, left: 110, fontSize: 13 }]}>★</Text>
        <Text style={[styles.starGold, { bottom: 18, left: 22, fontSize: 16 }]}>★</Text>

        <Text style={[styles.starGold, { top: 18, right: 150, fontSize: 12 }]}>★</Text>
        <Text style={[styles.starGrey, { top: 75, right: 25, fontSize: 15 }]}>★</Text>
        <Text style={[styles.starGold, { bottom: 20, right: 18, fontSize: 14 }]}>★</Text>

        {/* Background Dots */}
        <View style={[styles.dotGold, { top: 38, left: 65 }]} />
        <View style={[styles.dotGrey, { top: 70, left: 20 }]} />
        <View style={[styles.dotGold, { top: 110, left: 75 }]} />
        <View style={[styles.dotGrey, { top: 32, right: 100 }]} />
        <View style={[styles.dotGold, { top: 115, right: 55 }]} />

        {/* Number Badges */}
        <View style={[styles.numberBadgeSmall, styles.badge2]}>
          <Text style={styles.badgeTextSmall}>2</Text>
        </View>
        <View style={[styles.numberBadge, styles.badge7]}>
          <Text style={styles.badgeText}>7</Text>
        </View>
        <View style={[styles.numberBadgeSmall, styles.badge4]}>
          <Text style={styles.badgeTextSmall}>4</Text>
        </View>

        {/* Coins Stack */}
        <View style={styles.coinStack}>
          <View style={[styles.coin, styles.topCoin]}>
            <Text style={styles.coinText}>PKR</Text>
          </View>
          <View style={styles.coin} />
          <View style={styles.coin} />
          <View style={styles.coin} />
        </View>

        {/* Header Content */}
        <View style={styles.headerContent}>
          <Image
            source={require('../assets/Logo.jpeg')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.brandTitle}>
            YesTime <Text style={styles.brandTitleGold}>Plus</Text>
          </Text>
          <Text style={styles.brandSubtitle}>Play Better. Win Bigger.</Text>
        </View>
      </View>

      {/* Floating Card */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.floatingCard}>
          <Text style={styles.welcomeTitle}>Welcome Back</Text>
          <Text style={styles.welcomeSubtitle}>
            Log in to access your wallet & modules
          </Text>

          {/* Email / Mobile Field */}
          <Text style={styles.inputLabel}>Email or Mobile Number</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="person-outline" size={18} color={ThemeColors.iconGrey} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter email or mobile number"
              placeholderTextColor={ThemeColors.placeholderText}
              value={emailOrPhone}
              onChangeText={setEmailOrPhone}
            />
          </View>

          {/* Password Field */}
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={18} color={ThemeColors.iconGrey} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your password"
              placeholderTextColor={ThemeColors.placeholderText}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={18}
                color={ThemeColors.iconGrey}
              />
            </TouchableOpacity>
          </View>

          {/* Forgot Password Link */}
          <TouchableOpacity style={styles.forgotBtn}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Compact Login Button */}
          <TouchableOpacity style={styles.loginBtn} activeOpacity={0.8}>
            <Text style={styles.loginBtnText}>Log In</Text>
          </TouchableOpacity>

          {/* Footer Link */}
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity>
              <Text style={styles.signUpText}>Sign Up</Text>
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

  // Stars & Dots
  starGold: { position: 'absolute', color: ThemeColors.accentYellow, opacity: 0.95 },
  starGrey: { position: 'absolute', color: ThemeColors.starGrey, opacity: 0.85 },
  dotGold: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: ThemeColors.accentYellow,
    opacity: 0.9,
  },
  dotGrey: {
    position: 'absolute',
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: ThemeColors.starGrey,
    opacity: 0.8,
  },

  headerContent: { alignItems: 'center', marginTop: 10 },
  logoImage: { width: 60, height: 60, marginBottom: 6 },
  brandTitle: { fontSize: 22, fontWeight: 'bold', color: ThemeColors.white },
  brandTitleGold: { color: ThemeColors.accentYellow },
  brandSubtitle: { fontSize: 12, color: ThemeColors.white, opacity: 0.8, marginTop: 2 },

  // Badges & Coins
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

  // Scroll Container & Floating Card
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
    paddingTop: 28,
    paddingBottom: 32,
    elevation: 4,
    shadowColor: ThemeColors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  welcomeTitle: { fontSize: 24, fontWeight: 'bold', color: ThemeColors.textDark, marginBottom: 6 },
  welcomeSubtitle: { fontSize: 13, color: ThemeColors.textMuted, marginBottom: 24 },

  // Inputs & Vector Icons
  inputLabel: { fontSize: 13, fontWeight: 'bold', color: ThemeColors.textDark, marginBottom: 8, marginTop: 12 },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ThemeColors.inputBg,
    borderWidth: 1,
    borderColor: ThemeColors.inputBorder,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 52,
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: { flex: 1, fontSize: 14, color: ThemeColors.textDark },

  forgotBtn: { alignSelf: 'flex-end', marginTop: 12, marginBottom: 20 },
  forgotText: { fontSize: 13, fontWeight: 'bold', color: ThemeColors.forgotText },

  // Compact Login Button
  loginBtn: {
    backgroundColor: ThemeColors.buttonGreen,
    borderRadius: 12,
    height: 44,
    width: '85%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: ThemeColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  loginBtnText: { color: ThemeColors.white, fontSize: 15, fontWeight: 'bold' },
  footerRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 24 },
  footerText: { fontSize: 13, color: ThemeColors.textMuted },
  signUpText: { fontSize: 13, fontWeight: 'bold', color: ThemeColors.forgotText },
});

export default LoginScreen;