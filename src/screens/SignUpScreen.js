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
import { signupUser } from '../api/authApi';

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

const SignUpScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cnic, setCnic] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // --- Handlers for Input Formatting ---
  const handleMobileChange = (text) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    if (cleaned.length <= 11) {
      setMobileNumber(cleaned);
    }
  };

  const handleCnicChange = (text) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    if (cleaned.length <= 13) {
      setCnic(cleaned);
    }
  };

  // --- Exception Handling & Real Backend Integration ---
  const handleSignUp = async () => {
    console.log("=== 1. SIGN UP BUTTON CLICKED ===");
    try {
      // 1. Empty Fields Exception
      if (!fullName.trim() || !email.trim() || !mobileNumber || !password || !confirmPassword || !cnic) {
        console.log("-> Validation Failed: Empty Fields");
        Alert.alert('Validation Error', 'Please fill in all the required fields.');
        return;
      }

      // 2. Email Exception
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        console.log("-> Validation Failed: Invalid Email");
        Alert.alert('Invalid Email', 'Please enter a valid email address.');
        return;
      }

      // 3. Mobile Number Exception
      if (mobileNumber.length < 11) {
        console.log("-> Validation Failed: Mobile Number length < 11");
        Alert.alert('Invalid Mobile Number', 'Mobile number must be 11 digits (e.g., 03001234567).');
        return;
      }

      // 4. Password Exceptions
      if (password.length < 6) {
        console.log("-> Validation Failed: Password too short");
        Alert.alert('Weak Password', 'Password must be at least 6 characters long.');
        return;
      }

      if (password !== confirmPassword) {
        console.log("-> Validation Failed: Passwords do not match");
        Alert.alert('Password Mismatch', 'Password and Confirm Password do not match.');
        return;
      }

      // 5. CNIC Exception
      if (cnic.length !== 13) {
        console.log("-> Validation Failed: CNIC length != 13");
        Alert.alert('Invalid CNIC', 'CNIC must be exactly 13 digits without dashes.');
        return;
      }

      // 6. Terms Checkbox Exception
      if (!agreeTerms) {
        console.log("-> Validation Failed: Terms not agreed");
        Alert.alert('Terms & Conditions', 'Please agree to the Terms & Conditions to proceed.');
        return;
      }

      console.log("-> All validations passed! Sending request to backend...");
      setIsLoading(true);

      const payload = {
        name: fullName.trim(),
        email: email.trim(),
        phone: mobileNumber.trim(),
        password: password,
        cnicNumber: cnic.trim(),
      };

      console.log("Payload data being sent:", payload);

      const response = await signupUser(payload);
      console.log("=== API SUCCESS RESPONSE ===", response);

      setIsLoading(false);
      navigation?.navigate('OTPVerification', { email: email.trim() });

    } catch (error) {
      setIsLoading(false);
      console.log("=== API ERROR CAUGHT ===");
      console.log("Error object:", error);
      console.log("Error response data:", error.response?.data);
      console.log("Error message:", error.message);

      const errorMsg = error.response?.data?.message || error.message || 'Signup failed. Please try again.';
      Alert.alert('Signup Error', Array.isArray(errorMsg) ? errorMsg[0] : errorMsg);
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
          <Text style={styles.welcomeTitle}>Create Your Account</Text>
          <Text style={styles.welcomeSubtitle}>
            Sign up to start playing in 4-minute draws
          </Text>

          {/* Full Name */}
          <Text style={styles.inputLabel}>Full Name</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="person-outline" size={18} color={ThemeColors.iconGrey} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your full name"
              placeholderTextColor={ThemeColors.placeholderText}
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

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

          {/* Mobile Number Handling */}
          <Text style={styles.inputLabel}>Mobile Number</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="call-outline" size={18} color={ThemeColors.iconGrey} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="03001234567"
              placeholderTextColor={ThemeColors.placeholderText}
              keyboardType="number-pad"
              maxLength={11}
              value={mobileNumber}
              onChangeText={handleMobileChange}
            />
          </View>

          {/* Password */}
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={18} color={ThemeColors.iconGrey} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Create a password"
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

          {/* Confirm Password */}
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={18} color={ThemeColors.iconGrey} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Re-enter your password"
              placeholderTextColor={ThemeColors.placeholderText}
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Ionicons
                name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                size={18}
                color={ThemeColors.iconGrey}
              />
            </TouchableOpacity>
          </View>

          {/* CNIC Handling */}
          <Text style={styles.inputLabel}>CNIC</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="card-outline" size={18} color={ThemeColors.iconGrey} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter 13 digit CNIC"
              placeholderTextColor={ThemeColors.placeholderText}
              keyboardType="number-pad"
              maxLength={13}
              value={cnic}
              onChangeText={handleCnicChange}
            />
          </View>

          {/* Terms Agreement Checkbox */}
          <TouchableOpacity
            style={styles.checkboxContainer}
            activeOpacity={0.8}
            onPress={() => setAgreeTerms(!agreeTerms)}
          >
            <Ionicons
              name={agreeTerms ? 'checkbox' : 'square-outline'}
              size={20}
              color={agreeTerms ? ThemeColors.buttonGreen : ThemeColors.iconGrey}
            />
            <Text style={styles.checkboxText}>
              I agree to the Terms & Conditions and Privacy Policy
            </Text>
          </TouchableOpacity>

          {/* Sign Up Button */}
          <TouchableOpacity
            style={styles.signUpBtn}
            activeOpacity={0.8}
            onPress={handleSignUp}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={ThemeColors.white} />
            ) : (
              <Text style={styles.signUpBtnText}>Sign Up</Text>
            )}
          </TouchableOpacity>

          {/* Navigation to Login */}
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation?.navigate('Login')}>
              <Text style={styles.loginLinkText}>Login</Text>
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
    paddingTop: 28,
    paddingBottom: 32,
    elevation: 4,
    shadowColor: ThemeColors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  welcomeTitle: { fontSize: 24, fontWeight: 'bold', color: ThemeColors.textDark, marginBottom: 6 },
  welcomeSubtitle: { fontSize: 13, color: ThemeColors.textMuted, marginBottom: 20 },

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
  inputIcon: { marginRight: 10 },
  textInput: { flex: 1, fontSize: 14, color: ThemeColors.textDark },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  checkboxText: {
    fontSize: 12,
    color: ThemeColors.textDark,
    marginLeft: 8,
    flex: 1,
    fontWeight: '500',
  },

  signUpBtn: {
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
  signUpBtnText: { color: ThemeColors.white, fontSize: 16, fontWeight: 'bold' },

  footerRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 24 },
  footerText: { fontSize: 13, color: ThemeColors.textMuted },
  loginLinkText: { fontSize: 13, fontWeight: 'bold', color: ThemeColors.forgotText },
});

export default SignUpScreen;