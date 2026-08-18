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
import { Ionicons, Feather } from '@expo/vector-icons';

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
  inputBorderActive: '#044223',
  iconGrey: '#718096',
  textDark: '#1A202C',
  textMuted: '#718096',
  successGreen: '#38A169',
};

const ChangePasswordScreen = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState('Kinzu22@');
  const [newPassword, setNewPassword] = useState('Kinzul33@');
  const [secureCurrent, setSecureCurrent] = useState(true);
  const [secureNew, setSecureNew] = useState(true);

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

      {/* Floating Card */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.floatingCard}>
          <Text style={styles.welcomeTitle}>Change Password</Text>
          <Text style={styles.welcomeSubtitle}>
            Your password is the first line of defence for your account. Choose something strong, unique, and only yours — so your data stays exactly where it belongs.
          </Text>

          {/* Current Password Field */}
          <Text style={styles.inputLabel}>Current Password</Text>
          <View style={styles.inputContainer}>
            <Feather name="lock" size={18} color={ThemeColors.iconGrey} style={styles.inputIconLeft} />
            <TextInput
              style={styles.textInput}
              secureTextEntry={secureCurrent}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              placeholder="Enter current password"
              placeholderTextColor="#A0AEC0"
            />
            <TouchableOpacity onPress={() => setSecureCurrent(!secureCurrent)} style={styles.eyeIconBtn}>
              <Ionicons
                name={secureCurrent ? "eye-off-outline" : "eye-outline"}
                size={18}
                color={ThemeColors.iconGrey}
              />
            </TouchableOpacity>
          </View>

          {/* New Password Field */}
          <Text style={styles.inputLabel}>New Password</Text>
          <View style={[styles.inputContainer, styles.activeInputContainer]}>
            <Feather name="lock" size={18} color={ThemeColors.buttonGreen} style={styles.inputIconLeft} />
            <TextInput
              style={styles.textInput}
              secureTextEntry={secureNew}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Enter new password"
              placeholderTextColor="#A0AEC0"
            />
            <TouchableOpacity onPress={() => setSecureNew(!secureNew)} style={styles.eyeIconBtn}>
              <Ionicons
                name={secureNew ? "eye-off-outline" : "eye-outline"}
                size={18}
                color={ThemeColors.iconGrey}
              />
            </TouchableOpacity>
          </View>

          {/* Password Requirements Box */}
          <View style={styles.requirementsBox}>
            <Text style={styles.reqTitle}>Password requirements</Text>
            
            <View style={styles.reqRow}>
              <Ionicons name="checkmark-circle-outline" size={15} color={ThemeColors.successGreen} style={{ marginRight: 8 }} />
              <Text style={styles.reqText}>At least 8 characters</Text>
            </View>
            <View style={styles.reqRow}>
              <Ionicons name="checkmark-circle-outline" size={15} color={ThemeColors.successGreen} style={{ marginRight: 8 }} />
              <Text style={styles.reqText}>Contains an uppercase letter</Text>
            </View>
            <View style={styles.reqRow}>
              <Ionicons name="checkmark-circle-outline" size={15} color={ThemeColors.successGreen} style={{ marginRight: 8 }} />
              <Text style={styles.reqText}>Contains a digit</Text>
            </View>
            <View style={[styles.reqRow, { marginBottom: 0 }]}>
              <Ionicons name="checkmark-circle-outline" size={15} color={ThemeColors.successGreen} style={{ marginRight: 8 }} />
              <Text style={styles.reqText}>Contains a special character (@, %, !, *)</Text>
            </View>
          </View>

          {/* Change Password Button */}
          <TouchableOpacity 
            style={styles.actionBtn} 
            activeOpacity={0.8}
            onPress={() => {
              // Action logic here
            }}
          >
            <Text style={styles.actionBtnText}>Change Password</Text>
          </TouchableOpacity>

          {/* Go Back Link */}
          <TouchableOpacity 
            style={styles.goBackRow} 
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={14} color={ThemeColors.textMuted} style={{ marginRight: 6 }} />
            <Text style={styles.goBackText}>Go Back</Text>
          </TouchableOpacity>

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
  welcomeSubtitle: { fontSize: 12.5, color: ThemeColors.textMuted, marginBottom: 20, lineHeight: 18 },
  
  inputLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: ThemeColors.textDark,
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ThemeColors.inputBg,
    borderWidth: 1,
    borderColor: ThemeColors.inputBorder,
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 50,
    marginBottom: 16,
  },
  activeInputContainer: {
    borderColor: ThemeColors.inputBorderActive,
    backgroundColor: ThemeColors.white,
  },
  inputIconLeft: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: ThemeColors.textDark,
    fontWeight: '500',
  },
  eyeIconBtn: {
    padding: 6,
  },

  requirementsBox: {
    backgroundColor: '#F8F9FA',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: ThemeColors.inputBorder,
    marginBottom: 20,
  },
  reqTitle: {
    fontSize: 12.5,
    fontWeight: 'bold',
    color: ThemeColors.textDark,
    marginBottom: 10,
  },
  reqRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  reqText: {
    fontSize: 12,
    color: ThemeColors.textMuted,
  },

  actionBtn: {
    backgroundColor: ThemeColors.buttonGreen,
    borderRadius: 14,
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  actionBtnText: {
    color: ThemeColors.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
  goBackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  goBackText: {
    fontSize: 13,
    fontWeight: '600',
    color: ThemeColors.textMuted,
  },
});

export default ChangePasswordScreen;