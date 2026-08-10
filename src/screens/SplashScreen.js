import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const ThemeColors = {
  primaryDark: '#054A29',
  primaryLight: '#0B663B',
  accentYellow: '#F3C649',
  accentGold: '#E6B800',
  starGrey: 'rgba(255, 255, 255, 0.75)',
  coinBase: '#E5B132',
  coinText: '#5C4300',
  white: '#FFFFFF',
  black: '#000000',
  whiteOverlay: 'rgba(255, 255, 255, 0.15)',
  whiteMuted: 'rgba(255, 255, 255, 0.4)',
  shadow: '#000000',
};

const SplashScreen = ({ navigation }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Rotation Animation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // 3 Second Timeout for Navigation
    const timer = setTimeout(() => {
      if (navigation) {
        navigation.replace('Login');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation, rotateAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={ThemeColors.primaryDark} />

      {/* Background Stars */}
      <Text style={[styles.starGold, { top: '8%', left: '8%', fontSize: 18 }]}>★</Text>
      <Text style={[styles.starGrey, { top: '6%', left: '42%', fontSize: 13 }]}>★</Text>
      <Text style={[styles.starGold, { top: '10%', right: '8%', fontSize: 16 }]}>★</Text>
      
      <Text style={[styles.starGrey, { top: '32%', left: '6%', fontSize: 14 }]}>★</Text>
      <Text style={[styles.starGold, { top: '35%', right: '6%', fontSize: 15 }]}>★</Text>

      <Text style={[styles.starGold, { bottom: '28%', left: '10%', fontSize: 16 }]}>★</Text>
      <Text style={[styles.starGrey, { bottom: '25%', right: '12%', fontSize: 14 }]}>★</Text>
      <Text style={[styles.starGold, { bottom: '8%', right: '15%', fontSize: 18 }]}>★</Text>

      {/* Background Dots */}
      <View style={[styles.dotGold, { top: '18%', left: '32%' }]} />
      <View style={[styles.dotGrey, { top: '28%', right: '28%' }]} />
      <View style={[styles.dotGold, { top: '48%', left: '5%' }]} />
      <View style={[styles.dotGrey, { top: '52%', right: '5%' }]} />
      <View style={[styles.dotGold, { bottom: '18%', left: '38%' }]} />
      <View style={[styles.dotGrey, { bottom: '10%', left: '12%' }]} />

      {/* Number Badges */}
      <View style={[styles.numberBadge, styles.badge9]}>
        <Text style={styles.badgeText}>9</Text>
      </View>
      <View style={[styles.numberBadge, styles.badge7]}>
        <Text style={styles.badgeText}>7</Text>
      </View>
      <View style={[styles.numberBadgeSmall, styles.badge2]}>
        <Text style={styles.badgeTextSmall}>2</Text>
      </View>
      <View style={[styles.numberBadgeSmall, styles.badge4]}>
        <Text style={styles.badgeTextSmall}>4</Text>
      </View>

      {/* Center Spinner & Logo */}
      <View style={styles.centerContainer}>
        <Animated.View style={[styles.spinnerRing, { transform: [{ rotate: spin }] }]}>
          <View style={[styles.dot, styles.dot1]} />
          <View style={[styles.dot, styles.dot2]} />
          <View style={[styles.dot, styles.dot3]} />
        </Animated.View>

        <View style={styles.logoCircle}>
          <Image
            source={require('../assets/Logo.jpeg')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Text Container */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Preparing your YesTime Plus experience...</Text>
        <Text style={styles.subtitle}>
          We are loading your wallet, latest draws and rewards.
        </Text>

        <View style={styles.indicatorContainer}>
          <View style={styles.smallDot} />
          <View style={styles.activeDot} />
          <View style={styles.smallDot} />
        </View>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  starGold: {
    position: 'absolute',
    color: ThemeColors.accentYellow,
    opacity: 0.95,
  },
  starGrey: {
    position: 'absolute',
    color: ThemeColors.starGrey,
    opacity: 0.85,
  },
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
  numberBadge: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: ThemeColors.white,
    borderWidth: 2,
    borderColor: ThemeColors.accentGold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberBadgeSmall: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: ThemeColors.white,
    borderWidth: 1.5,
    borderColor: ThemeColors.accentGold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: ThemeColors.black,
  },
  badgeTextSmall: {
    fontWeight: 'bold',
    fontSize: 12,
    color: ThemeColors.black,
  },
  badge9: { top: '12%', left: '18%' },
  badge7: { top: '15%', right: '15%' },
  badge2: { top: '22%', left: '8%' },
  badge4: { top: '23%', right: '10%' },
  centerContainer: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerRing: {
    position: 'absolute',
    width: 190,
    height: 190,
    borderRadius: 95,
    borderWidth: 1,
    borderColor: ThemeColors.whiteOverlay,
    justifyContent: 'center',
  },
  dot: {
    position: 'absolute',
    backgroundColor: ThemeColors.accentYellow,
    borderRadius: 10,
  },
  dot1: { width: 14, height: 14, left: 10, top: '45%' },
  dot2: { width: 10, height: 10, left: 2, top: '28%' },
  dot3: { width: 10, height: 10, left: 22, top: '65%' },
  logoCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: ThemeColors.white,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: ThemeColors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  logoImage: {
    width: 90,
    height: 90,
  },
  textContainer: {
    marginTop: 40,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  title: {
    color: ThemeColors.accentYellow,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: ThemeColors.white,
    fontSize: 13,
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 18,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    gap: 8,
  },
  smallDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: ThemeColors.whiteMuted,
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: ThemeColors.accentYellow,
  },
  coinStack: {
    position: 'absolute',
    bottom: '12%',
    left: '8%',
    alignItems: 'center',
  },
  coin: {
    width: 50,
    height: 12,
    backgroundColor: ThemeColors.coinBase,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: ThemeColors.accentGold,
    marginTop: -4,
  },
  topCoin: {
    height: 14,
    backgroundColor: ThemeColors.accentYellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coinText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: ThemeColors.coinText,
  },
});

export default SplashScreen;