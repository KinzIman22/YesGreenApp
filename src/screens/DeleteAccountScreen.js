import React from 'react';
import {
  StyleSheet,
  Text,
  View,
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
  textDark: '#1A202C',
  textMuted: '#718096',
  dangerRed: '#E53E3E',
  dangerBg: '#FFF5F5',
  dangerBorder: '#FED7D7',
};

const DeleteAccountScreen = ({ navigation, route }) => {
  // Profile data jo pichli screen se pass hokar aayega
  const userData = route?.params?.userData || {
    name: 'Kinz Ul Iman',
    email: 'kinz@example.com',
  };

  const handleDeleteAccountPress = () => {
    // Delete Account button press hone par user ko wapis Home page par bhej dega
    navigation.reset({
      index: 0,
      routes: [{ name: 'TabNavigator', params: { screen: 'Home' } }],
    });
  };

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

        {/* User Profile Info in Header */}
        <View style={styles.headerContent}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={36} color={ThemeColors.iconGrey} />
          </View>
          <Text style={styles.userNameText}>{userData.name}</Text>
          <Text style={styles.userEmailText}>{userData.email}</Text>
        </View>
      </View>

      {/* Floating Card Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.floatingCard}>
          {/* Warning Icon Box */}
          <View style={styles.warningIconContainer}>
            <Ionicons name="alert" size={28} color={ThemeColors.dangerRed} />
          </View>

          {/* Warning Message */}
          <Text style={styles.warningTitle}>Unable to load profile. Please try again.</Text>

          {/* Reload Button */}
          <TouchableOpacity 
            style={styles.reloadBtn} 
            activeOpacity={0.8}
            onPress={() => {
              // Reload logic
            }}
          >
            <Ionicons name="reload" size={16} color="#553C9A" style={{ marginRight: 6 }} />
            <Text style={styles.reloadBtnText}>Reload</Text>
          </TouchableOpacity>

          {/* Delete Account Button (Redirects to Home) */}
          <TouchableOpacity 
            style={styles.deleteBtn} 
            activeOpacity={0.8}
            onPress={handleDeleteAccountPress}
          >
            <Feather name="trash-2" size={18} color={ThemeColors.dangerRed} style={{ marginRight: 8 }} />
            <Text style={styles.deleteBtnText}>Delete Account</Text>
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
    height: 230,
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
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: ThemeColors.white,
    borderWidth: 2,
    borderColor: ThemeColors.accentGold,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  userNameText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: ThemeColors.white,
    marginBottom: 2,
  },
  userEmailText: {
    fontSize: 12,
    color: ThemeColors.white,
    opacity: 0.8,
  },
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
    paddingTop: 36,
    paddingBottom: 40,
    alignItems: 'center',
    elevation: 4,
    shadowColor: ThemeColors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  warningIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFF5F5',
    borderWidth: 1.5,
    borderColor: '#FED7D7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  warningTitle: {
    fontSize: 14.5,
    fontWeight: 'bold',
    color: ThemeColors.textDark,
    textAlign: 'center',
    marginBottom: 24,
  },
  reloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAF5FF',
    borderWidth: 1,
    borderColor: '#E9D8FD',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginBottom: 24,
    width: '100%',
  },
  reloadBtnText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#553C9A',
  },
  deleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ThemeColors.dangerBg,
    borderWidth: 1,
    borderColor: ThemeColors.dangerBorder,
    borderRadius: 16,
    height: 52,
    width: '100%',
  },
  deleteBtnText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: ThemeColors.dangerRed,
  },
});

export default DeleteAccountScreen;