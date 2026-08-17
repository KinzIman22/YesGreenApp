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
  iconGrey: '#718096',
  placeholderText: '#A0AEC0',
  textDark: '#1A202C',
  textMuted: '#718096',
  forgotText: '#0B663B',
  badgeGreen: '#0B4734',
};

const UpdateProfileScreen = ({ navigation, route }) => {
  const initialData = route?.params?.userData || {
    name: 'Kinz Ul Iman',
    email: 'kinz@example.com',
  };

  const [fullName, setFullName] = useState(initialData.name);
  const emailAddress = initialData.email || '—';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={ThemeColors.primaryDark} />

      {/* Top Section */}
      <View style={styles.topSection}>
        {/* Back Button */}
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Ionicons name="chevron-back" size={20} color={ThemeColors.white} />
        </TouchableOpacity>

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
          <Text style={styles.welcomeTitle}>Update Profile</Text>
          <Text style={styles.welcomeSubtitle}>
            Update your name or profile photo. Your email address cannot be changed.
          </Text>

          {/* Avatar Upload Section */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarContainer}>
              <Ionicons name="person" size={42} color={ThemeColors.iconGrey} />
            </View>
            <TouchableOpacity style={styles.cameraBadgeBtn} activeOpacity={0.8}>
              <Ionicons name="camera" size={14} color={ThemeColors.white} />
            </TouchableOpacity>
          </View>

          {/* Full Name Field */}
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

          {/* Email Address Field (Fixed) */}
          <Text style={styles.inputLabel}>Email Address</Text>
          <View style={[styles.inputWrapper, styles.disabledInputWrapper]}>
            <Feather name="mail" size={18} color={ThemeColors.iconGrey} style={styles.inputIcon} />
            <TextInput
              style={[styles.textInput, { color: ThemeColors.textMuted }]}
              value={emailAddress}
              editable={false}
            />
            <View style={styles.fixedBadge}>
              <Text style={styles.fixedBadgeText}>Fixed</Text>
            </View>
          </View>

          {/* Update Profile Button */}
          <TouchableOpacity 
            style={styles.loginBtn} 
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.loginBtnText}>Update Profile</Text>
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
  backButton: {
    position: 'absolute',
    top: 15,
    left: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
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
  welcomeSubtitle: { fontSize: 13, color: ThemeColors.textMuted, marginBottom: 20, lineHeight: 18 },

  // Avatar Section
  avatarSection: {
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
    alignSelf: 'center',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: ThemeColors.inputBg,
    borderWidth: 2,
    borderColor: ThemeColors.inputBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraBadgeBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: ThemeColors.badgeGreen,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: ThemeColors.white,
  },

  // Inputs & Vector Icons
  inputLabel: { fontSize: 13, fontWeight: 'bold', color: ThemeColors.textDark, marginBottom: 8, marginTop: 10 },
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
  disabledInputWrapper: {
    backgroundColor: '#F7FAFC',
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: { flex: 1, fontSize: 14, color: ThemeColors.textDark },

  fixedBadge: {
    backgroundColor: '#F0FFF4',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#C6F6D5',
  },
  fixedBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2F855A',
  },

  // Login/Update Button Style matching Login screen button
  loginBtn: {
    backgroundColor: ThemeColors.buttonGreen,
    borderRadius: 12,
    height: 48,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: ThemeColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginTop: 24,
  },
  loginBtnText: { color: ThemeColors.white, fontSize: 15, fontWeight: 'bold' },

  goBackRow: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 16 
  },
  goBackText: { fontSize: 13, fontWeight: 'bold', color: ThemeColors.textMuted },
});

export default UpdateProfileScreen;