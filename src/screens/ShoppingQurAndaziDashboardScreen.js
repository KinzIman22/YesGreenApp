import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useResponsiveLayout } from '../utils/responsive';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native'; // Ensure ye imported ho

const ThemeColors = {
  primaryDark: '#2C1250',
  screenBg: '#F4F7F5',
  cardBg: '#FFFFFF',
  textDark: '#1A202C',
  textMuted: '#4A5568',
  white: '#FFFFFF',
  
  // Custom Purple Shades matching the UI
  purpleBanner: '#3A1569',
  couponCardBg: '#34125F',
  walletCardBg: '#3A1569',
  
  // Quick Menu Card Colors
  menuGreen: '#0B7A58',
  menuBlue: '#123D78',
  menuPurpleDark: '#3A1569',
  menuOrange: '#E67E22',
  menuPink: '#C0392B',
};

export default function ShoppingQurAndaziDashboardScreen({ navigation }) {
  const { width, containerMaxWidth } = useResponsiveLayout();

  // Determine actual max width constraint for inner elements
  const isConstrained = containerMaxWidth !== '100%';
  const maxContentWidth = isConstrained ? containerMaxWidth : width;
  const CONTAINER_WIDTH = maxContentWidth - 32;
  
  // Responsive grid calculation (2 columns for mobile/tablet, can handle larger widths gracefully)
  const GRID_CARD_WIDTH = (CONTAINER_WIDTH - 12) / 2;

  const cashbackCoupon = "807761";

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(cashbackCoupon);
    Alert.alert("Success", "Cashback coupon number copied to clipboard!");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2C1250" />

      <View style={[styles.responsiveWrapper, { maxWidth: containerMaxWidth }]}>
        
        {/* Top Header */}
        <View style={styles.topHeader}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={20} color={ThemeColors.white} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Shopping Qur'a Andazi</Text>
            <Text style={styles.headerSubTitle}>Your saving, your future</Text>
          </View>
          <View style={styles.levelBadge}>
            <Text style={styles.levelBadgeText}>Level 0</Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.scrollInnerWrapper}>
            
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

            {/* Cashback Coupon Section */}
            <View style={[styles.couponCard, { width: CONTAINER_WIDTH }]}>
              <View style={styles.couponCardTopRow}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <MaterialCommunityIcons name="ticket-confirmation-outline" size={16} color="#A0AEC0" style={{ marginRight: 6 }} />
                  <Text style={styles.couponCardLabel}>YOUR CASHBACK COUPON</Text>
                </View>
                <TouchableOpacity style={styles.copyBtn} onPress={copyToClipboard}>
                  <Ionicons name="copy-outline" size={13} color={ThemeColors.white} style={{ marginRight: 4 }} />
                  <Text style={styles.copyBtnText}>Copy</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.digitsRow}>
                {cashbackCoupon.split('').map((digit, index) => (
                  <View key={index} style={styles.digitBox}>
                    <Text style={styles.digitText}>{digit}</Text>
                  </View>
                ))}
              </View>

              {/* Bottom Stats inside Coupon Card */}
              <View style={styles.couponStatsRow}>
                <View style={styles.couponStatItem}>
                  <Text style={styles.couponStatVal}>0/30</Text>
                  <Text style={styles.couponStatLbl}>Level</Text>
                </View>
                <View style={styles.couponStatDivider} />
                <View style={styles.couponStatItem}>
                  <Text style={styles.couponStatVal}>Rs 0</Text>
                  <Text style={styles.couponStatLbl}>Shopping</Text>
                </View>
                <View style={styles.couponStatDivider} />
                <View style={styles.couponStatItem}>
                  <Text style={styles.couponStatVal}>Rs 0</Text>
                  <Text style={styles.couponStatLbl}>Prize</Text>
                </View>
              </View>
            </View>

            {/* Wallets Row */}
            <View style={[styles.walletsRow, { width: CONTAINER_WIDTH }]}>
              <View style={[styles.walletCard, { width: (CONTAINER_WIDTH - 10) / 2 }]}>
                <View style={styles.walletIconWrapper}>
                  <MaterialCommunityIcons name="wallet" size={20} color={ThemeColors.primaryDark} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.walletTitle} numberOfLines={1}>Main Wallet Bala...</Text>
                  <Text style={styles.walletAmount}>PKR 0</Text>
                </View>
              </View>

              <View style={[styles.walletCard, { width: (CONTAINER_WIDTH - 10) / 2 }]}>
                <View style={styles.walletIconWrapper}>
                  <MaterialCommunityIcons name="chart-line" size={20} color={ThemeColors.primaryDark} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.walletTitle} numberOfLines={1}>Saving</Text>
                  <Text style={styles.walletAmount}>PKR 0</Text>
                </View>
              </View>
            </View>

            {/* Quick Menu Section */}
            <View style={{ width: CONTAINER_WIDTH }}>
              <Text style={styles.sectionHeader}>Quick menu</Text>

              <View style={styles.gridContainer}>
                {/* Registered Shops */}
                <TouchableOpacity 
                  style={[styles.menuCard, { backgroundColor: ThemeColors.menuGreen, width: GRID_CARD_WIDTH }]}
                  onPress={() => {
                    const rootNav = navigation.getParent() || navigation;
                    rootNav.navigate('PublicShopDirectoryScreen');
                  }}
                >
                  <View style={styles.menuIconBox}>
                    <Ionicons name="storefront" size={22} color={ThemeColors.white} />
                  </View>
                  <View>
                    <Text style={styles.menuCardTitle}>Registered shops</Text>
                    <Text style={styles.menuCardSub}>Partner stores</Text>
                  </View>
                </TouchableOpacity>

                {/* My Shopping */}
                <TouchableOpacity 
                  style={[styles.menuCard, { backgroundColor: ThemeColors.menuBlue, width: GRID_CARD_WIDTH }]}
                  onPress={() => {
                    const rootNav = navigation.getParent() || navigation;
                    rootNav.navigate('MyShopScreen');
                  }}
                >
                  <View style={styles.menuIconBox}>
                    <Ionicons name="receipt-outline" size={22} color={ThemeColors.white} />
                  </View>
                  <View>
                    <Text style={styles.menuCardTitle}>My shopping</Text>
                    <Text style={styles.menuCardSub}>Purchase history</Text>
                  </View>
                </TouchableOpacity>

                {/* Level Table */}
                <TouchableOpacity style={[styles.menuCard, { backgroundColor: ThemeColors.menuPurpleDark, width: GRID_CARD_WIDTH }]}>
                  <View style={styles.menuIconBox}>
                    <MaterialCommunityIcons name="view-grid" size={22} color={ThemeColors.white} />
                  </View>
                  <View>
                    <Text style={styles.menuCardTitle}>Level table</Text>
                    <Text style={styles.menuCardSub}>Commitment & progress</Text>
                  </View>
                </TouchableOpacity>

                {/* My Savings */}
              <TouchableOpacity 
  style={[styles.menuCard, { backgroundColor: ThemeColors.menuOrange, width: GRID_CARD_WIDTH }]}
  onPress={() => {
    try {
      // Pehle direct navigate karne ki koshish karein
      navigation.navigate('MySavingsScreen');
    } catch (e) {
      // Agar fail ho toh parent ya root ke zariye try karein
      const parent = navigation.getParent();
      if (parent) {
        parent.navigate('MySavingsScreen');
      } else {
        console.log("Navigation error: ", e);
      }
    }
  }}
>
  <View style={styles.menuIconBox}>
    <MaterialCommunityIcons name="chart-box-outline" size={22} color={ThemeColors.white} />
  </View>
  <View>
    <Text style={styles.menuCardTitle}>My savings</Text>
    <Text style={styles.menuCardSub}>Balance & levels</Text>
  </View>
</TouchableOpacity>

                {/* Recent Draws */}
                <TouchableOpacity style={[styles.menuCard, { backgroundColor: ThemeColors.menuPurpleDark, width: GRID_CARD_WIDTH }]}
                onPress={() => navigation.navigate('RecentDrawsScreen')}
                
                >
                  <View style={styles.menuIconBox}>
                    <Ionicons name="time-outline" size={22} color={ThemeColors.white} />
                  </View>
                  <View>
                    <Text style={styles.menuCardTitle}>Recent draws</Text>
                    <Text style={styles.menuCardSub}>Past draw results</Text>
                  </View>
                </TouchableOpacity>

                {/* My Winning Draws */}
                <TouchableOpacity style={[styles.menuCard, { backgroundColor: ThemeColors.menuPink, width: GRID_CARD_WIDTH }]}
onPress={() => navigation.navigate('MyPrizesScreen')}
                
                >
                  <View style={styles.menuIconBox}>
                    <Ionicons name="trophy-outline" size={22} color={ThemeColors.white} />
                  </View>
                  <View>
                    <Text style={styles.menuCardTitle}>My winning draws</Text>
                    <Text style={styles.menuCardSub}>Wins & rewards</Text>
                  </View>
                </TouchableOpacity>

                {/* Permanent Coupons */}
                <TouchableOpacity style={[styles.menuCard, { backgroundColor: ThemeColors.menuPurpleDark, width: GRID_CARD_WIDTH }]}
                
                onPress={() => navigation.navigate('PermanentCouponeScreen')}
                
                >
                  <View style={styles.menuIconBox}>
                    <MaterialCommunityIcons name="ticket-percent-outline" size={22} color={ThemeColors.white} />
                  </View>
                  <View>
                    <Text style={styles.menuCardTitle}>Permanent Coupons</Text>
                    <Text style={styles.menuCardSub}>View Permanent Coupons</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C1250',
    alignItems: 'center',
  },
  responsiveWrapper: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#2C1250',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#2C1250',
    width: '100%',
    alignSelf: 'center',
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
  levelBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  levelBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: ThemeColors.white,
  },
  scrollContent: {
    backgroundColor: ThemeColors.screenBg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 16,
    paddingBottom: 30,
    minHeight: '100%',
  },
  scrollInnerWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  liveBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: ThemeColors.purpleBanner,
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
    marginBottom: 14,
  },
  digitBox: {
    flex: 1,
    aspectRatio: 0.85,
    marginHorizontal: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
  },
  digitText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: ThemeColors.white,
  },
  couponStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 10,
  },
  couponStatItem: {
    alignItems: 'center',
    flex: 1,
  },
  couponStatVal: {
    fontSize: 13,
    fontWeight: 'bold',
    color: ThemeColors.white,
  },
  couponStatLbl: {
    fontSize: 10,
    color: '#CBD5E0',
    marginTop: 1,
  },
  couponStatDivider: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
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
    width: '100%',
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