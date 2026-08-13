import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Clipboard,
  Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useResponsiveLayout } from '../utils/responsive'; // Import responsive helper

const ThemeColors = {
  primaryDark: '#0A2540',
  screenBg: '#F4F7F5',
  cardBg: '#FFFFFF',
  textDark: '#1A202C',
  textMuted: '#4A5568',
  white: '#FFFFFF',
  
  // Custom Card Colors matching the UI
  deepBlueBanner: '#123D78',
  couponCardBg: '#103468',
  walletCardBg: '#123D78',
  
  // Quick Menu Card Colors
  menuBlue: '#123D78',
  menuGreen: '#0B7A58',
  menuOrange: '#E67E22',
  menuDarkGreen: '#0B522C',
  menuPurple: '#6C3483',
  menuPink: '#C0392B',
};

const CarQuraAndaziScreen = ({ navigation }) => {
  const { width, containerMaxWidth } = useResponsiveLayout();

  // Dynamic width calculations based on current screen container
  const CONTAINER_WIDTH = containerMaxWidth === '100%' ? width - 32 : containerMaxWidth - 32;
  const GRID_CARD_WIDTH = (CONTAINER_WIDTH - 12) / 2;

  const couponNumber = "596104";

  const copyToClipboard = () => {
    Clipboard.setString(couponNumber);
    Alert.alert("Success", "Coupon number copied to clipboard!");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#123D78" />

      <View style={[styles.responsiveWrapper, { maxWidth: containerMaxWidth === '100%' ? '100%' : containerMaxWidth }]}>
        
        {/* Top Header */}
        <View style={styles.topHeader}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={20} color={ThemeColors.white} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Car Qur'a Andazi</Text>
            <Text style={styles.headerSubTitle}>Contribution & Referral</Text>
          </View>
          <View style={styles.activeBadge}>
            <View style={styles.activeDot} />
            <Text style={styles.activeBadgeText}>Active</Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* View Live Qur'a Andazi Banner */}
          <TouchableOpacity style={[styles.liveBanner, { width: CONTAINER_WIDTH }]}>
            <View style={styles.liveBannerLeft}>
              <View style={styles.playIconCircle}>
                <Ionicons name="play" size={16} color={ThemeColors.white} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.liveBannerTitle}>View Live Qur'a Andazi</Text>
                <Text style={styles.liveBannerSub}>Watch the live draw • see your number spin</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color={ThemeColors.white} />
          </TouchableOpacity>

          {/* Coupon Number Section */}
          <View style={[styles.couponCard, { width: CONTAINER_WIDTH }]}>
            <View style={styles.couponCardTopRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name="ticket-confirmation-outline" size={16} color="#A0AEC0" style={{ marginRight: 6 }} />
                <Text style={styles.couponCardLabel}>YOUR COUPON NUMBER</Text>
              </View>
              <TouchableOpacity style={styles.copyBtn} onPress={copyToClipboard}>
                <Ionicons name="copy-outline" size={13} color={ThemeColors.white} style={{ marginRight: 4 }} />
                <Text style={styles.copyBtnText}>Copy</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.digitsRow}>
              {couponNumber.split('').map((digit, index) => (
                <View key={index} style={styles.digitBox}>
                  <Text style={styles.digitText}>{digit}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Wallets Row */}
          <View style={styles.walletsRow}>
            <View style={[styles.walletCard, { width: (CONTAINER_WIDTH - 10) / 2 }]}>
              <View style={styles.walletIconWrapper}>
                <MaterialCommunityIcons name="wallet" size={20} color={ThemeColors.primaryDark} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.walletTitle}>Main Wallet Bala...</Text>
                <Text style={styles.walletAmount}>PKR 0</Text>
              </View>
            </View>

            <View style={[styles.walletCard, { width: (CONTAINER_WIDTH - 10) / 2 }]}>
              <View style={styles.walletIconWrapper}>
                <MaterialCommunityIcons name="chart-line" size={20} color={ThemeColors.primaryDark} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.walletTitle}>Saving</Text>
                <Text style={styles.walletAmount}>PKR 0</Text>
              </View>
            </View>
          </View>

          {/* Quick Menu Section */}
          <Text style={styles.sectionHeader}>Quick menu</Text>

          <View style={styles.gridContainer}>
            {/* Car Qura Andazi */}
            <TouchableOpacity style={[styles.menuCard, { backgroundColor: ThemeColors.menuBlue, width: GRID_CARD_WIDTH }]}>
              <View style={styles.menuIconBox}>
                <Ionicons name="car-sport" size={22} color={ThemeColors.white} />
              </View>
              <View>
                <Text style={styles.menuCardTitle}>Car Qur'a Andazi</Text>
                <Text style={styles.menuCardSub}>Progress & phase</Text>
              </View>
            </TouchableOpacity>

            {/* Add Contribution */}
            <TouchableOpacity style={[styles.menuCard, { backgroundColor: ThemeColors.menuGreen, width: GRID_CARD_WIDTH }]}>
              <View style={styles.menuIconBox}>
                <Ionicons name="add" size={22} color={ThemeColors.white} />
              </View>
              <View>
                <Text style={styles.menuCardTitle}>Add Contribution</Text>
                <Text style={styles.menuCardSub}>Purchase history</Text>
              </View>
            </TouchableOpacity>

            {/* Change Plan */}
            <TouchableOpacity style={[styles.menuCard, { backgroundColor: ThemeColors.menuOrange, width: GRID_CARD_WIDTH }]}>
              <View style={styles.menuIconBox}>
                <MaterialCommunityIcons name="swap-horizontal" size={22} color={ThemeColors.white} />
              </View>
              <View>
                <Text style={styles.menuCardTitle}>Change Plan</Text>
                <Text style={styles.menuCardSub}>Switch to another plan</Text>
              </View>
            </TouchableOpacity>

            {/* Referral Program */}
            <TouchableOpacity style={[styles.menuCard, { backgroundColor: ThemeColors.menuDarkGreen, width: GRID_CARD_WIDTH }]}>
              <View style={styles.menuIconBox}>
                <MaterialCommunityIcons name="account-group" size={22} color={ThemeColors.white} />
              </View>
              <View>
                <Text style={styles.menuCardTitle}>Referral Program</Text>
                <Text style={styles.menuCardSub}>Partner stores</Text>
              </View>
            </TouchableOpacity>

            {/* Contribution History */}
            <TouchableOpacity style={[styles.menuCard, { backgroundColor: ThemeColors.menuPurple, width: GRID_CARD_WIDTH }]}>
              <View style={styles.menuIconBox}>
                <Ionicons name="time-outline" size={22} color={ThemeColors.white} />
              </View>
              <View>
                <Text style={styles.menuCardTitle}>Contribution History</Text>
                <Text style={styles.menuCardSub}>Past draw results</Text>
              </View>
            </TouchableOpacity>

            {/* Recent Qura Andazi */}
            <TouchableOpacity style={[styles.menuCard, { backgroundColor: ThemeColors.menuPurple, width: GRID_CARD_WIDTH }]}>
              <View style={styles.menuIconBox}>
                <Ionicons name="time-outline" size={22} color={ThemeColors.white} />
              </View>
              <View>
                <Text style={styles.menuCardTitle}>Recent Qur'a Andazi</Text>
                <Text style={styles.menuCardSub}>Past draw results</Text>
              </View>
            </TouchableOpacity>

            {/* Winning History */}
            <TouchableOpacity style={[styles.menuCard, { backgroundColor: ThemeColors.menuPink, width: GRID_CARD_WIDTH }]}>
              <View style={styles.menuIconBox}>
                <Ionicons name="trophy-outline" size={22} color={ThemeColors.white} />
              </View>
              <View>
                <Text style={styles.menuCardTitle}>Winning History</Text>
                <Text style={styles.menuCardSub}>Wins & rewards</Text>
              </View>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#123D78', // Background matching top theme for web side gaps
    alignItems: 'center',
  },
  responsiveWrapper: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#123D78',
  },
  
  /* Header Styles */
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#123D78',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: ThemeColors.white,
  },
  headerSubTitle: {
    fontSize: 11,
    color: '#CBD5E0',
    marginTop: 1,
  },
  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(39, 174, 96, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#27AE60',
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#27AE60',
    marginRight: 5,
  },
  activeBadgeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#27AE60',
  },

  scrollContent: {
    backgroundColor: ThemeColors.screenBg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 30,
    minHeight: '100%',
  },

  /* Live Banner */
  liveBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: ThemeColors.deepBlueBanner,
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
  },
  liveBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  playIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  liveBannerTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: ThemeColors.white,
  },
  liveBannerSub: {
    fontSize: 10,
    color: '#CBD5E0',
    marginTop: 2,
  },

  /* Coupon Section */
  couponCard: {
    backgroundColor: ThemeColors.couponCardBg,
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
  },
  couponCardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  couponCardLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#A0AEC0',
    letterSpacing: 0.5,
  },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  copyBtnText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: ThemeColors.white,
  },
  digitsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  digitBox: {
    flex: 1,
    aspectRatio: 0.85,
    marginHorizontal: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#D4AF37', // Gold border tint matching images
    alignItems: 'center',
    justifyContent: 'center',
  },
  digitText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: ThemeColors.white,
  },

  /* Wallets Row */
  walletsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  walletCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ThemeColors.walletCardBg,
    borderRadius: 14,
    padding: 12,
  },
  walletIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  walletTitle: {
    fontSize: 11,
    color: '#CBD5E0',
    fontWeight: '500',
  },
  walletAmount: {
    fontSize: 13,
    fontWeight: 'bold',
    color: ThemeColors.white,
    marginTop: 1,
  },

  /* Quick Menu */
  sectionHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: ThemeColors.textDark,
    marginBottom: 12,
    marginLeft: 2,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuCard: {
    height: 125,
    borderRadius: 16,
    padding: 12,
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  menuIconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuCardTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: ThemeColors.white,
  },
  menuCardSub: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 1,
  },
});

export default CarQuraAndaziScreen;