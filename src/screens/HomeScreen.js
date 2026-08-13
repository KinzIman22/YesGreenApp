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
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BANNER_WIDTH = SCREEN_WIDTH - 32;

const ThemeColors = {
  primaryDark: '#054A29',
  primaryLight: '#1A6C3E', 
  screenBg: '#F4F7F5',
  cardBg: '#FFFFFF',
  textDark: '#1A202C',
  textMuted: '#2D3748',
  textSubDark: '#4A5568',
  white: '#FFFFFF',
  
  // Gradient Pairs (Light -> Dark)
  deepGreenGradient: ['#1A6C3E', '#054A29'],
  cardMembershipGradient: ['#148F4C', '#0B522C'],
  
  // Other Colors
  cardBlue: '#1A4D8C',
  cardBrown: '#94380B',
  cardPurple: '#421E68',
  badgeGreenBg: '#C5E1A5',
  dividerDark: '#CBD5E0',
  iconBgLight: '#E8F5E9',
  iconBgStart: '#FFFFFF',
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

            {/* Profile Avatar */}
            <TouchableOpacity style={styles.profileAvatarContainer}>
              <LinearGradient
                colors={ThemeColors.deepGreenGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.profileAvatarGradient}
              >
                <Ionicons name="person" size={20} color={ThemeColors.white} />
              </LinearGradient>
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
            <MaterialCommunityIcons name="calendar-clock" size={24} color={ThemeColors.primaryDark} />
            <Text style={styles.statTitle}>Total Daily Draws</Text>
            <Text style={styles.statValue}>1440</Text>
            <Text style={styles.statSub}>After 4 Minutes</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Ionicons name="people" size={24} color={ThemeColors.primaryDark} />
            <Text style={styles.statTitle}>Active Programs</Text>
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statSub}>Running 24/7</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Ionicons name="time-outline" size={24} color={ThemeColors.primaryDark} />
            <Text style={styles.statTitle}>Draw Interval</Text>
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statSub}>Every 4 minutes</Text>
          </View>
        </View>

        {/* Total Balance Card */}
        <LinearGradient
          colors={ThemeColors.deepGreenGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.balanceCardGradient}
        >
          <View style={styles.balanceCardContent}>
            <LinearGradient
              colors={[ThemeColors.iconBgStart, ThemeColors.iconBgLight]}
              style={styles.fancyWalletWrapper}
            >
              <Ionicons name="wallet" size={22} color={ThemeColors.primaryDark} />
            </LinearGradient>
            
            <View style={styles.balanceTextContainer}>
              <Text style={styles.balanceTitle}>Total Balance</Text>
              <Text style={styles.balanceAmount}>PKR 0</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Quick Access Grid */}
        <Text style={styles.sectionHeader}>Quick Access</Text>
        <View style={styles.quickAccessRow}>
          <TouchableOpacity style={styles.quickAccessCard}>
            <LinearGradient
              colors={[ThemeColors.iconBgStart, ThemeColors.iconBgLight]}
              style={styles.fancyIconWrapper}
            >
              <MaterialCommunityIcons name="cash-plus" size={28} color={ThemeColors.primaryDark} />
              <Ionicons name="arrow-down-circle" size={14} color="#2E7D32" style={styles.iconBadgeOverlay} />
            </LinearGradient>
            <Text style={styles.quickAccessLabel} numberOfLines={1}>Deposit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickAccessCard}>
            <LinearGradient
              colors={[ThemeColors.iconBgStart, ThemeColors.iconBgLight]}
              style={styles.fancyIconWrapper}
            >
              <MaterialCommunityIcons name="cash-minus" size={28} color={ThemeColors.primaryDark} />
              <Ionicons name="arrow-up-circle" size={14} color="#D32F2F" style={styles.iconBadgeOverlay} />
            </LinearGradient>
            <Text style={styles.quickAccessLabel} numberOfLines={1}>Withdraw</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickAccessCard}>
            <LinearGradient
              colors={[ThemeColors.iconBgStart, ThemeColors.iconBgLight]}
              style={styles.fancyIconWrapper}
            >
              <MaterialCommunityIcons name="account-network" size={28} color={ThemeColors.primaryDark} />
            </LinearGradient>
            <Text style={styles.quickAccessLabel} numberOfLines={1}>Refer</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickAccessCard}>
            <LinearGradient
              colors={[ThemeColors.iconBgStart, ThemeColors.iconBgLight]}
              style={styles.fancyIconWrapper}
            >
              <MaterialCommunityIcons name="storefront" size={28} color={ThemeColors.primaryDark} />
            </LinearGradient>
            <Text style={styles.quickAccessLabel} numberOfLines={1}>All Shops</Text>
          </TouchableOpacity>
        </View>

        {/* Live Qur'a Andazi Banner */}
        <TouchableOpacity style={styles.liveBannerContainer} activeOpacity={0.9}>
          <LinearGradient
            colors={ThemeColors.deepGreenGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.liveBannerGradient}
          >
            <View style={styles.liveBannerLeft}>
              <View style={styles.liveImageContainer}>
                <Image 
                  source={require('../assets/Live.png')} 
                  style={styles.liveIconImage} 
                  resizeMode="cover" 
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.liveBannerTitle}>Live Qur'a Andazi</Text>
                <Text style={styles.liveBannerSub} numberOfLines={1}>Draw results • Winners • New joiners</Text>
              </View>
            </View>
            <View style={styles.arrowCircle}>
              <Ionicons name="chevron-forward" size={18} color={ThemeColors.white} />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Programs Grid Section */}
        <View style={styles.programHeaderRow}>
          <Text style={styles.sectionHeader}>4 Programs - Draw Every 4 Minutes</Text>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>1440 Draws/day</Text>
          </View>
        </View>

        <View style={styles.programGrid}>
          {/* Card 1: Membership - Green Gradient */}
          <TouchableOpacity style={styles.programCardContainer}>
            <LinearGradient
              colors={ThemeColors.cardMembershipGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.programCardGradient}
            >
              <Text style={styles.programTitle}>MemberShip Qur'a{'\n'}Andazi</Text>
              <Image 
                source={require('../assets/membership_qura_andazi.png')} 
                style={styles.programIconImage} 
                resizeMode="contain" 
              />
            </LinearGradient>
          </TouchableOpacity>

          {/* Card 2: Car */}
          <TouchableOpacity style={[styles.programCard, { backgroundColor: ThemeColors.cardBlue }]}>
            <Text style={styles.programTitle}>Car Qur'a Andazi</Text>
            <Image 
              source={require('../assets/car.png')} 
              style={styles.programIconImage} 
              resizeMode="contain" 
            />
          </TouchableOpacity>

          {/* Card 3: Daily */}
          <TouchableOpacity style={[styles.programCard, { backgroundColor: ThemeColors.cardBrown }]}>
            <Text style={styles.programTitle}>Daily Qur'a Andazi</Text>
            <Image 
              source={require('../assets/coins.png')} 
              style={styles.programIconImage} 
              resizeMode="contain" 
            />
          </TouchableOpacity>

          {/* Card 4: Shopping */}
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
  
  profileAvatarContainer: {
    width: 34,
    height: 34,
    borderRadius: 17,
    overflow: 'hidden',
  },
  profileAvatarGradient: {
    width: '100%',
    height: '100%',
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
    paddingVertical: 14,
    paddingHorizontal: 8,
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statTitle: { fontSize: 10, fontWeight: 'bold', color: ThemeColors.textDark, marginTop: 4, textAlign: 'center' },
  statValue: { fontSize: 16, fontWeight: 'bold', color: ThemeColors.textDark, marginVertical: 2 },
  statSub: { fontSize: 9, fontWeight: '600', color: ThemeColors.textMuted },
  statDivider: { width: 1.5, backgroundColor: ThemeColors.dividerDark, height: '80%', alignSelf: 'center' },

  /* Balance Card */
  balanceCardGradient: {
    borderRadius: 14,
    marginBottom: 18,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  balanceCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  fancyWalletWrapper: {
    width: 42,
    height: 42,
    borderRadius: 12,
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
    gap: 8,
  },
  quickAccessCard: {
    flex: 1,
    backgroundColor: ThemeColors.cardBg,
    borderRadius: 16,
    paddingVertical: 10,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  fancyIconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
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
  liveBannerContainer: {
    marginBottom: 18,
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  liveBannerGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  liveBannerLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 8 },
  liveImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 10,
    backgroundColor: '#FFFFFF',
  },
  liveIconImage: {
    width: '100%',
    height: '100%',
  },
  liveBannerTitle: { fontSize: 14, fontWeight: 'bold', color: ThemeColors.white },
  liveBannerSub: { fontSize: 10, color: '#E2E8F0', fontWeight: '500', marginTop: 2 },
  arrowCircle: {
    width: 30,
    height: 30,
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
    rowGap: 12,
  },
  
  programCard: {
    width: '48%',
    height: 150,
    borderRadius: 18,
    padding: 12,
    justifyContent: 'space-between', // Fixed typo here
    alignItems: 'center',
  },
  programCardContainer: {
    width: '48%',
    height: 150,
    borderRadius: 18,
    overflow: 'hidden',
  },
  programCardGradient: {
    width: '100%',
    height: '100%',
    padding: 12,
    justifyContent: 'space-between', // Fixed typo here
    alignItems: 'center',
  },
  
  programTitle: { 
    fontSize: 13, 
    fontWeight: 'bold', 
    color: ThemeColors.white,
    textAlign: 'center',
  },
  programIconImage: { 
    width: '80%',
    height: 75,
  },
});

export default HomeScreen;