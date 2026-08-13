import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { VideoView, useVideoPlayer } from 'expo-video';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BANNER_WIDTH = SCREEN_WIDTH - 32;
const CARD_WIDTH = (BANNER_WIDTH - 12) / 2; // Perfect 2-column calculation

const ThemeColors = {
  primaryDark: '#054A29',
  screenBg: '#F4F7F5',
  cardBg: '#FFFFFF',
  textDark: '#1A202C',
  textMuted: '#2D3748',
  textSubDark: '#4A5568',
  white: '#FFFFFF',
  balanceCardBg: '#054A29',
  bannerGreen: '#054A29',
  
  // Program Cards Colors
  cardGreen: '#0B522C',
  cardBlue: '#1A4D8C',
  cardBrown: '#94380B',
  cardPurple: '#421E68',
  
  badgeGreenBg: '#C5E1A5',
  dividerDark: '#CBD5E0',
};

const HomeScreen = ({ navigation }) => {
  const [lang, setLang] = useState('EN');
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  const player1 = useVideoPlayer(require('../assets/Win.webm'), (p) => {
    p.loop = true;
    p.pause();
  });

  const player2 = useVideoPlayer(require('../assets/LuckyDraw.webm'), (p) => {
    p.loop = true;
    p.pause();
  });

  const handleVideoScroll = (event) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / BANNER_WIDTH);
    if (slide !== activeVideoIndex) {
      setActiveVideoIndex(slide);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={ThemeColors.screenBg} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Top Header */}
        <View style={styles.topHeader}>
          <View style={styles.logoRow}>
            <Image 
              source={require('../assets/Logo.jpeg')} 
              style={styles.headerLogoImage} 
              resizeMode="contain" 
            />
            <Text style={styles.headerTitle}>there</Text>
          </View>

          <View style={styles.headerRight}>
            <View style={styles.langToggle}>
              <TouchableOpacity
                style={[styles.langBtn, lang === 'EN' && styles.langBtnActive]}
                onPress={() => setLang('EN')}
              >
                <Text style={[styles.langText, lang === 'EN' && styles.langTextActive]}>EN</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.langBtn, lang === 'UR' && styles.langBtnActive]}
                onPress={() => setLang('UR')}
              >
                <Text style={[styles.langText, lang === 'UR' && styles.langTextActive]}>UR</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.profileAvatar}>
              <Ionicons name="person" size={20} color={ThemeColors.white} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Video Banner Section */}
        <View style={styles.videoBannerContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleVideoScroll}
            scrollEventThrottle={16}
            decelerationRate="fast"
            snapToInterval={BANNER_WIDTH}
            snapToAlignment="center"
          >
            <View style={styles.videoSlide}>
              <VideoView
                player={player1}
                style={styles.videoPlayer}
                fullscreenOptions={{ enable: true }}
                allowsPictureInPicture
              />
            </View>

            <View style={styles.videoSlide}>
              <VideoView
                player={player2}
                style={styles.videoPlayer}
                fullscreenOptions={{ enable: true }}
                allowsPictureInPicture
              />
            </View>
          </ScrollView>

          <View style={styles.bannerDots}>
            <View style={[styles.dot, activeVideoIndex === 0 && styles.activeDot]} />
            <View style={[styles.dot, activeVideoIndex === 1 && styles.activeDot]} />
          </View>
        </View>

        {/* Draw Stats Card */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <MaterialCommunityIcons name="calendar-clock" size={22} color={ThemeColors.primaryDark} />
            <Text style={styles.statTitle}>Total Daily Draws</Text>
            <Text style={styles.statValue}>1440</Text>
            <Text style={styles.statSub}>After 4 Minutes</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Ionicons name="people" size={22} color={ThemeColors.primaryDark} />
            <Text style={styles.statTitle}>Active Programs</Text>
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statSub}>Running 24/7</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Ionicons name="time-outline" size={22} color={ThemeColors.primaryDark} />
            <Text style={styles.statTitle}>Draw Interval</Text>
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statSub}>Every 4 minutes</Text>
          </View>
        </View>

        {/* Total Balance Card */}
        <View style={styles.balanceCard}>
          <View style={styles.fancyWalletWrapper}>
            <Ionicons name="wallet" size={22} color={ThemeColors.primaryDark} />
          </View>
          <View style={styles.balanceTextContainer}>
            <Text style={styles.balanceTitle}>Total Balance</Text>
            <Text style={styles.balanceAmount}>PKR 0</Text>
          </View>
        </View>

        {/* Quick Access Grid */}
        <Text style={styles.sectionHeader}>Quick Access</Text>
        <View style={styles.quickAccessRow}>
          {/* Deposit Button */}
          <TouchableOpacity 
            style={styles.quickAccessCard}
            onPress={() => navigation.navigate('DepositScreen')}
            activeOpacity={0.7}
          >
            <View style={styles.fancyIconWrapper}>
              <MaterialCommunityIcons name="cash-plus" size={26} color={ThemeColors.primaryDark} />
              <Ionicons name="arrow-down-circle" size={14} color="#2E7D32" style={styles.iconBadgeOverlay} />
            </View>
            <Text style={styles.quickAccessLabel} numberOfLines={1}>Deposit</Text>
          </TouchableOpacity>

          {/* Withdraw Button */}
          <TouchableOpacity 
            style={styles.quickAccessCard}
            onPress={() => navigation.navigate('WithdrawScreen')}
            activeOpacity={0.7}
          >
            <View style={styles.fancyIconWrapper}>
              <MaterialCommunityIcons name="cash-minus" size={26} color={ThemeColors.primaryDark} />
              <Ionicons name="arrow-up-circle" size={14} color="#D32F2F" style={styles.iconBadgeOverlay} />
            </View>
            <Text style={styles.quickAccessLabel} numberOfLines={1}>Withdraw</Text>
          </TouchableOpacity>

          {/* Refer Button */}
          <TouchableOpacity style={styles.quickAccessCard}>
            <View style={styles.fancyIconWrapper}>
              <MaterialCommunityIcons name="account-network" size={26} color={ThemeColors.primaryDark} />
            </View>
            <Text style={styles.quickAccessLabel} numberOfLines={1}>Refer</Text>
          </TouchableOpacity>

          {/* All Shops Button */}
          <TouchableOpacity style={styles.quickAccessCard}>
            <View style={styles.fancyIconWrapper}>
              <MaterialCommunityIcons name="storefront" size={26} color={ThemeColors.primaryDark} />
            </View>
            <Text style={styles.quickAccessLabel} numberOfLines={1}>All Shops</Text>
          </TouchableOpacity>
        </View>

        {/* Live Qur'a Andazi Banner */}
        <TouchableOpacity style={styles.liveBanner}>
          <View style={styles.liveBannerLeft}>
            <View style={styles.liveImageContainer}>
              <Image 
                source={require('../assets/Live.png')} 
                style={styles.liveIconImage} 
                resizeMode="cover" 
              />
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={styles.liveBannerTitle}>Live Qur'a Andazi</Text>
              <Text style={styles.liveBannerSub} numberOfLines={1}>Draw results • Winners • New joiners</Text>
            </View>
          </View>
          <View style={styles.arrowCircle}>
            <Ionicons name="chevron-forward" size={18} color={ThemeColors.white} />
          </View>
        </TouchableOpacity>

        {/* Programs Grid Section */}
        <View style={styles.programHeaderRow}>
          <Text style={styles.sectionHeader}>4 Programs - Draw Every 4 Minutes</Text>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>1440 Draws/day</Text>
          </View>
        </View>

        <View style={styles.programGrid}>
          <TouchableOpacity style={[styles.programCard, { backgroundColor: ThemeColors.cardGreen }]}>
            <Text style={styles.programTitle}>MemberShip Qur'a{'\n'}Andazi</Text>
            <Image 
              source={require('../assets/membership_qura_andazi.png')} 
              style={styles.programIconImage} 
              resizeMode="contain" 
            />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.programCard, { backgroundColor: ThemeColors.cardBlue }]}>
            <Text style={styles.programTitle}>Car Qur'a Andazi</Text>
            <Image 
              source={require('../assets/car.png')} 
              style={styles.programIconImage} 
              resizeMode="contain" 
            />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.programCard, { backgroundColor: ThemeColors.cardBrown }]}>
            <Text style={styles.programTitle}>Daily Qur'a Andazi</Text>
            <Image 
              source={require('../assets/coins.png')} 
              style={styles.programIconImage} 
              resizeMode="contain" 
            />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.programCard, { backgroundColor: ThemeColors.cardPurple }]}>
            <Text style={styles.programTitle}>Shopping Qur'a{'\n'}Andazi</Text>
            <Image 
              source={require('../assets/Gift.png')} 
              style={styles.programIconImage} 
              resizeMode="contain" 
            />
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
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 24,
  },

  /* Header */
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  logoRow: { flexDirection: 'row', alignItems: 'center' },
  headerLogoImage: { width: 32, height: 32, marginRight: 8 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: ThemeColors.textDark },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  langToggle: {
    flexDirection: 'row',
    backgroundColor: '#CBD5E0',
    borderRadius: 20,
    padding: 2,
    marginRight: 10,
  },
  langBtn: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 16 },
  langBtnActive: { backgroundColor: ThemeColors.primaryDark },
  langText: { fontSize: 11, fontWeight: 'bold', color: ThemeColors.textSubDark },
  langTextActive: { color: ThemeColors.white },
  profileAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: ThemeColors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Video Banner */
  videoBannerContainer: {
    height: 180,
    backgroundColor: '#000000',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
  },
  videoSlide: {
    width: BANNER_WIDTH,
    height: 180,
  },
  videoPlayer: {
    width: '100%',
    height: '100%',
  },
  bannerDots: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.6)',
    marginHorizontal: 3,
  },
  activeDot: { backgroundColor: ThemeColors.primaryDark, width: 16 },

  /* Stats Card */
  statsCard: {
    flexDirection: 'row',
    backgroundColor: ThemeColors.cardBg,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 6,
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  statItem: { flex: 1, alignItems: 'center', paddingHorizontal: 2 },
  statTitle: { fontSize: 10, fontWeight: 'bold', color: ThemeColors.textDark, marginTop: 4, textAlign: 'center' },
  statValue: { fontSize: 15, fontWeight: 'bold', color: ThemeColors.textDark, marginVertical: 2 },
  statSub: { fontSize: 9, fontWeight: '600', color: ThemeColors.textMuted, textAlign: 'center' },
  statDivider: { width: 1, backgroundColor: ThemeColors.dividerDark, height: '70%', alignSelf: 'center' },

  /* Total Balance Section */
  balanceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ThemeColors.balanceCardBg,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 18,
  },
  fancyWalletWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  balanceTextContainer: { justifyContent: 'center' },
  balanceTitle: { fontSize: 12, color: '#E2E8F0', fontWeight: '500' },
  balanceAmount: { fontSize: 16, fontWeight: 'bold', color: ThemeColors.white, marginTop: 2 },

  /* Quick Access Section */
  sectionHeader: { fontSize: 13, fontWeight: 'bold', color: ThemeColors.textDark, marginBottom: 10 },
  quickAccessRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  quickAccessCard: {
    width: (BANNER_WIDTH - 24) / 4,
    backgroundColor: ThemeColors.cardBg,
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  fancyIconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  iconBadgeOverlay: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  quickAccessLabel: { fontSize: 10, fontWeight: 'bold', color: ThemeColors.textDark, marginTop: 6, textAlign: 'center' },

  /* Live Banner */
  liveBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: ThemeColors.bannerGreen,
    borderRadius: 14,
    padding: 12,
    marginBottom: 18,
  },
  liveBannerLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 8 },
  liveImageContainer: {
    width: 38,
    height: 38,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 10,
    backgroundColor: '#FFFFFF',
  },
  liveIconImage: {
    width: '100%',
    height: '100%',
  },
  liveBannerTitle: { fontSize: 13, fontWeight: 'bold', color: ThemeColors.white },
  liveBannerSub: { fontSize: 10, color: '#E2E8F0', fontWeight: '500', marginTop: 1 },
  arrowCircle: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Program Grid */
  programHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badgeContainer: {
    backgroundColor: ThemeColors.badgeGreenBg,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  badgeText: { fontSize: 10, fontWeight: 'bold', color: ThemeColors.primaryDark },
  programGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  programCard: {
    width: CARD_WIDTH,
    height: 140,
    borderRadius: 16,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  programTitle: { 
    fontSize: 12, 
    fontWeight: 'bold', 
    color: ThemeColors.white,
    textAlign: 'center',
  },
  programIconImage: { 
    width: '85%',
    height: 65,
  },
});

export default HomeScreen;