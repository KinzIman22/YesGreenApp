import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, Image, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LiveQuraAndaziDashboardScreen({ navigation }) {
  const [couponNumbers, setCouponNumbers] = useState(['-', '-', '-', '-', '-', '-']);
  const [isUpdating, setIsUpdating] = useState(true);
  const [step, setStep] = useState(1); // 1: Car, 2: Daily, 3: Membership, 4: Shopping
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute timer

  // Blinking animation for the red dot
  const blinkAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Start blinking loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnim, {
          toValue: 0.2,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(blinkAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Jab bhi step change ho, rolling numbers aur updating state reset ho
  useEffect(() => {
    setIsUpdating(true);
    setCouponNumbers(['-', '-', '-', '-', '-', '-']);

    // 1. Random rolling numbers start honge
    const randomInterval = setInterval(() => {
      const randomArr = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10).toString());
      setCouponNumbers(randomArr);
    }, 100);

    // 2. 3 seconds ke baad actual numbers show honge step ke mutabiq
    const timer = setTimeout(() => {
      clearInterval(randomInterval);
      if (step === 1) {
        setCouponNumbers(['5', '4', '1', '7', '1', '4']);
      } else if (step === 2) {
        setCouponNumbers(['4', '1', '5', '7', '6', '1']);
      } else if (step === 3) {
        setCouponNumbers(['7', '8', '7', '8', '0', '2']);
      } else if (step === 4) {
        setCouponNumbers(['3', '9', '2', '4', '1', '8']);
      }
      setIsUpdating(false);
    }, 3000);

    return () => {
      clearInterval(randomInterval);
      clearTimeout(timer);
    };
  }, [step]);

  // 3. Timer countdown effect aur continuous rotation loop logic
  useEffect(() => {
    if (timeLeft > 0) {
      const countdown = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      // 4 steps complete hone ke baad wapas step 1 (Car Qur'a) par chala jayega
      if (step < 4) {
        setStep(step + 1);
      } else {
        setStep(1);
      }
      setTimeLeft(60); // Reset timer to 1 minute
    }
  }, [timeLeft, step]);

  // Determine styles and details based on current step
  const getCardDetails = () => {
    if (step === 1) {
      return {
        themeStyle: styles.carCardTheme,
        badgeText: "Car Qur'a",
        badgeIcon: require('../assets/car.png'),
        prizeText: "Prize: Rs 5,000",
        mainImage: require('../assets/car.png'),
        imageStyle: styles.mainCarImage,
      };
    } else if (step === 2) {
      return {
        themeStyle: styles.dailyCardTheme,
        badgeText: "Daily Qur'a",
        badgeIcon: require('../assets/coins.png'),
        prizeText: "Prize: Rs 30,000",
        mainImage: require('../assets/coins.png'),
        imageStyle: styles.mainCoinsImage,
      };
    } else if (step === 3) {
      return {
        themeStyle: styles.membershipCardTheme,
        badgeText: "Membership Qur'a",
        badgeIcon: require('../assets/membership_qura_andazi.png'),
        prizeText: "Prize: Rs 1,000",
        mainImage: require('../assets/membership_qura_andazi.png'),
        imageStyle: styles.mainMembershipImage,
      };
    } else {
      return {
        themeStyle: styles.shoppingCardTheme,
        badgeText: "Shopping Qur'a",
        badgeIcon: require('../assets/Gift.png'),
        prizeText: "Prize: Rs 3,000",
        mainImage: require('../assets/Gift.png'),
        imageStyle: styles.mainShoppingImage,
      };
    }
  };

  const cardDetails = getCardDetails();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F7F5" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={22} color="#1A202C" />
        </TouchableOpacity>

        <View style={styles.liveDashboardBadge}>
          <Animated.View style={[styles.redDot, { opacity: blinkAnim }]} />
          <Text style={styles.liveDashboardText}>Live Dashboard</Text>
        </View>

        {/* Profile icon replaced with App Logo */}
        <View style={styles.logoWrapper}>
          <Image source={require('../assets/Logo.jpeg')} style={styles.headerLogo} resizeMode="contain" />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Main Card */}
        <View style={[styles.mainCard, cardDetails.themeStyle]}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.carBadge}>
              <Image source={cardDetails.badgeIcon} style={styles.badgeCarIcon} resizeMode="contain" />
              <Text style={[
                styles.carBadgeText, 
                step === 2 && { color: '#5C3A21' }, 
                step === 3 && { color: '#0B522C' },
                step === 4 && { color: '#4A154B' }
              ]}>
                {cardDetails.badgeText}
              </Text>
            </View>

            <View style={styles.timerContainer}>
              <Ionicons name="time-outline" size={14} color="#F4C430" />
              <Text style={styles.timerText}> 00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</Text>
            </View>
          </View>

          {/* Prize Text */}
          <Text style={styles.prizeText}>{cardDetails.prizeText}</Text>

          {/* Center Main Image */}
          <View style={styles.carImageContainer}>
            <Image 
              source={cardDetails.mainImage} 
              style={cardDetails.imageStyle} 
              resizeMode="contain" 
            />
          </View>

          <Text style={styles.winningCouponLabel}>WINNING COUPON</Text>

          {/* Coupon Boxes */}
          <View style={styles.couponContainer}>
            {couponNumbers.map((num, index) => (
              <View key={index} style={styles.couponBox}>
                <Text style={styles.couponText}>{num}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.updatingText}>{isUpdating ? "Updating..." : "Live Result"}</Text>
        </View>

        {/* Live Activity Section Header */}
        <View style={styles.sectionHeaderRow}>
          <View style={styles.greenIndicator} />
          <Text style={styles.sectionTitle}>Live Activity</Text>
        </View>

        {/* Activity 1: Membership Qur'a */}
        <View style={styles.activityCard}>
          <View style={styles.iconGroup}>
            <View style={[styles.activityIconBox, { backgroundColor: '#F1F5F9', marginRight: 6 }]}>
              <Ionicons name="hourglass-outline" size={18} color="#0B522C" />
            </View>
            <View style={[styles.activityIconBox, { backgroundColor: '#E8F5E9' }]}>
              <Image source={require('../assets/membership_qura_andazi.png')} style={styles.activityIconImage} resizeMode="contain" />
            </View>
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>MemberShip Qur'a</Text>
            <Text style={styles.activitySub}>No winner in the last draw</Text>
            <Text style={styles.activityMeta}>Prize: Rs 0 | Draw #6132</Text>
          </View>
        </View>

        {/* Activity 2: Car Qur'a */}
        <View style={styles.activityCard}>
          <View style={styles.iconGroup}>
            <View style={[styles.activityIconBox, { backgroundColor: '#F1F5F9', marginRight: 6 }]}>
              <Ionicons name="hourglass-outline" size={18} color="#1A4D8C" />
            </View>
            <View style={[styles.activityIconBox, { backgroundColor: '#E3F2FD' }]}>
              <Image source={require('../assets/car.png')} style={styles.activityIconImage} resizeMode="contain" />
            </View>
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>Car Qur'a</Text>
            <Text style={styles.activitySub}>No winner in the last draw</Text>
            <Text style={styles.activityMeta}>Prize: Rs 0 | Draw #6081</Text>
          </View>
        </View>

        {/* Activity 3: Daily Qur'a */}
        <View style={styles.activityCard}>
          <View style={styles.iconGroup}>
            <View style={[styles.activityIconBox, { backgroundColor: '#F1F5F9', marginRight: 6 }]}>
              <Ionicons name="hourglass-outline" size={18} color="#94380B" />
            </View>
            <View style={[styles.activityIconBox, { backgroundColor: '#FBE9E7' }]}>
              <Image source={require('../assets/coins.png')} style={styles.activityIconImage} resizeMode="contain" />
            </View>
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>Daily Qur'a</Text>
            <Text style={styles.activitySub}>No winner in the last draw</Text>
            <Text style={styles.activityMeta}>Prize: Rs 0 | Draw #75275</Text>
          </View>
        </View>

        {/* Activity 4: Shopping Qur'a */}
        <View style={styles.activityCard}>
          <View style={styles.iconGroup}>
            <View style={[styles.activityIconBox, { backgroundColor: '#F1F5F9', marginRight: 6 }]}>
              <Ionicons name="hourglass-outline" size={18} color="#421E68" />
            </View>
            <View style={[styles.activityIconBox, { backgroundColor: '#EDE7F6' }]}>
              <Image source={require('../assets/Gift.png')} style={styles.activityIconImage} resizeMode="contain" />
            </View>
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>Shopping Qur'a</Text>
            <Text style={styles.activitySub}>No winner in the last draw</Text>
            <Text style={styles.activityMeta}>Prize: Rs 0 | Draw #75238</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
  },
  liveDashboardBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF3B30',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    marginRight: 6,
  },
  liveDashboardText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  logoWrapper: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
  },
  headerLogo: {
    width: '80%',
    height: '80%',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  mainCard: {
    borderRadius: 24,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  carCardTheme: {
    backgroundColor: '#1A4D8C', // Blue
  },
  dailyCardTheme: {
    backgroundColor: '#6B2D0C', // Dark Brown
  },
  membershipCardTheme: {
    backgroundColor: '#004D25', // Dark Green
  },
  shoppingCardTheme: {
    backgroundColor: '#3F1D63', // Purple
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginBottom: 6,
  },
  carBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeCarIcon: {
    width: 20,
    height: 14,
    marginRight: 4,
  },
  carBadgeText: {
    fontWeight: 'bold',
    color: '#1A4D8C',
    fontSize: 11,
  },
  prizeText: {
    color: '#E2E8F0',
    fontSize: 12,
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginBottom: 4,
    marginLeft: 2,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  timerText: {
    color: '#F4C430',
    fontWeight: 'bold',
    fontSize: 12,
  },
  carImageContainer: {
    marginVertical: 8,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainCarImage: {
    width: 120,
    height: 60,
  },
  mainCoinsImage: {
    width: 90,
    height: 55,
  },
  mainMembershipImage: {
    width: 90,
    height: 55,
  },
  mainShoppingImage: {
    width: 80,
    height: 55,
  },
  winningCouponLabel: {
    color: '#E2E8F0',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  couponContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
  },
  couponBox: {
    width: 44,
    height: 52,
    borderWidth: 1.5,
    borderColor: '#F4C430',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  couponText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  updatingText: {
    color: '#E2E8F0',
    fontSize: 11,
    fontStyle: 'italic',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  greenIndicator: {
    width: 4,
    height: 16,
    backgroundColor: '#054A29',
    borderRadius: 2,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A202C',
  },
  activityCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  activityIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIconImage: {
    width: '65%',
    height: '65%',
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1A202C',
  },
  activitySub: {
    fontSize: 11,
    color: '#4A5568',
    marginTop: 1,
  },
  activityMeta: {
    fontSize: 10,
    color: '#718096',
    marginTop: 2,
  },
});