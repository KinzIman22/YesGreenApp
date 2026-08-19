import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useResponsiveLayout } from '../utils/responsive';

const ThemeColors = {
  headerBg: '#FFFFFF', // Header Background White
  screenBg: '#F3F4F6',
  cardBg: '#FFFFFF',
  textDark: '#1F2937',
  textMuted: '#6B7280',
  white: '#FFFFFF',
  purplePrimary: '#5B21B6',
};

// 4 Types of Qur'a Andazi Data with Image Placeholders
const drawTypes = [
  {
    id: '1',
    title: "MemberShip Qur'a Andazi",
    subtitle: 'Big jackpot event',
    bgTheme: '#1E3A1E', // Dark Green
    imagePath: require('../assets/membership_qura_andazi.png'),
  },
  {
    id: '2',
    title: "Car Qur'a Andazi",
    subtitle: 'Grand prize program',
    bgTheme: '#1E3A8A', // Dark Blue
    imagePath: require('../assets/car.png'),
  },
  {
    id: '3',
    title: "Daily Qur'a Andazi",
    subtitle: 'Daily bonus round',
    bgTheme: '#78350F', // Dark Brown/Orange
    imagePath: require('../assets/coins.png'),
  },
  {
    id: '4',
    title: "Shopping Qur'a Andazi",
    subtitle: 'Earn while you play',
    bgTheme: '#4C1D95', // Dark Purple
    imagePath: require('../assets/Gift.png'),
  },
];

export default function LiveDrawScreen({ navigation }) {
  const { width, containerMaxWidth } = useResponsiveLayout();
  const isConstrained = containerMaxWidth !== '100%';
  const maxContentWidth = isConstrained ? containerMaxWidth : width;
  const CONTAINER_WIDTH = maxContentWidth - 32;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const horizontalScrollRef = useRef(null);
  const pauseTimerRef = useRef(null);

  // Auto-scroll upper cards every 2 seconds (stops when paused)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % drawTypes.length;
        if (horizontalScrollRef.current) {
          horizontalScrollRef.current.scrollTo({
            x: nextIndex * CONTAINER_WIDTH,
            animated: true,
          });
        }
        return nextIndex;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [CONTAINER_WIDTH, isPaused]);

  // Handle click on bottom options: pauses auto-scroll for 1 minute (60,000 ms)
  const handleSelectOption = (index) => {
    setCurrentIndex(index);
    if (horizontalScrollRef.current) {
      horizontalScrollRef.current.scrollTo({
        x: index * CONTAINER_WIDTH,
        animated: true,
      });
    }

    // Pause auto-scroll
    setIsPaused(true);

    // Clear existing timer if user clicks multiple options quickly
    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current);
    }

    // Resume auto-scroll after 1 minute (60,000 milliseconds)
    pauseTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 60000);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (pauseTimerRef.current) {
        clearTimeout(pauseTimerRef.current);
      }
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={[styles.responsiveWrapper, { maxWidth: containerMaxWidth }]}>
        
        {/* Header with Back Button (Left), Live Draw Badge (Center), Logo (Right) */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={24} color={ThemeColors.textDark} />
          </TouchableOpacity>
          
          <View style={styles.liveDrawBadge}>
            <View style={styles.redDot} />
            <Text style={styles.liveDrawText}>LIVE DRAW</Text>
          </View>

          <View style={styles.logoContainer}>
            <Image 
              source={require('../assets/Logo.jpeg')} 
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Main Full Screen Scroll Content */}
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.scrollInnerWrapper}>

            {/* Upper Horizontal Cards Slider */}
            <ScrollView
              ref={horizontalScrollRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              onMomentumScrollEnd={(event) => {
                const newIndex = Math.round(event.nativeEvent.contentOffset.x / CONTAINER_WIDTH);
                setCurrentIndex(newIndex);
              }}
              style={{ width: CONTAINER_WIDTH }}
            >
              {drawTypes.map((item) => (
                <View 
                  key={item.id} 
                  style={[
                    styles.drawCard, 
                    { width: CONTAINER_WIDTH, backgroundColor: item.bgTheme }
                  ]}
                >
                  <View style={styles.cardHeaderRow}>
                    <View>
                      <Text style={styles.cardTitle}>{item.title}</Text>
                      <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                    </View>
                    <View style={styles.timerBox}>
                      <Text style={styles.timerText}>01:38</Text>
                      <Text style={styles.nextDrawText}>NEXT DRAW</Text>
                    </View>
                  </View>

                  {/* Center Graphic Image */}
                  <View style={styles.graphicContainer}>
                    <View style={styles.graphicCircle}>
                      <Image 
                        source={item.imagePath} 
                        style={styles.graphicImage} 
                        resizeMode="contain"
                      />
                    </View>
                  </View>

                  {/* Token Numbers Box */}
                  <Text style={styles.tokenLabel}>6 DIGIT WINNING TOKEN NUMBER</Text>
                  <View style={styles.tokensRow}>
                    {['6', '3', '4', '0', '0', '1'].map((digit, idx) => (
                      <View key={idx} style={styles.tokenBox}>
                        <Text style={styles.tokenDigit}>{digit}</Text>
                      </View>
                    ))}
                  </View>

                  {/* Your Coupon Section */}
                  <Text style={styles.tokenLabel}>YOUR COUPON  •  Level 0</Text>
                  <View style={styles.tokensRow}>
                    {['1', '3', '1', '8', '3', '1'].map((digit, idx) => (
                      <View key={idx} style={styles.tokenBox}>
                        <Text style={styles.tokenDigit}>{digit}</Text>
                      </View>
                    ))}
                  </View>

                  {/* Action Button */}
                  <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
                    <Ionicons name="cart-outline" size={16} color={ThemeColors.white} style={{ marginRight: 6 }} />
                    <Text style={styles.actionButtonText}>Shop to Unlock Play</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>

            {/* Bottom Stacked Options */}
            <View style={[styles.bottomOptionsContainer, { width: CONTAINER_WIDTH }]}>
              {drawTypes.map((item, index) => {
                const isSelected = currentIndex === index;
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.optionItem,
                      isSelected && styles.selectedOptionItem
                    ]}
                    onPress={() => handleSelectOption(index)}
                    activeOpacity={0.8}
                  >
                    <View style={styles.optionLeftRow}>
                      <View style={styles.optionIconBox}>
                        <Image 
                          source={item.imagePath} 
                          style={styles.optionSmallImage} 
                          resizeMode="contain"
                        />
                      </View>
                      <Text style={styles.optionTitleText}>{item.title}</Text>
                    </View>

                    <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}>
                      {isSelected && <Ionicons name="checkmark" size={12} color={ThemeColors.white} />}
                    </View>
                  </TouchableOpacity>
                );
              })}
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
    backgroundColor: '#FFFFFF', // Matches white header
    alignItems: 'center',
  },
  responsiveWrapper: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  liveDrawBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF4D4D',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    marginRight: 6,
  },
  liveDrawText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: ThemeColors.screenBg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 16,
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
  scrollInnerWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  drawCard: {
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 16,
    minHeight: 440,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    alignSelf: 'center',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: ThemeColors.white,
  },
  cardSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 2,
  },
  timerBox: {
    alignItems: 'flex-end',
  },
  timerText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FACC15',
  },
  nextDrawText: {
    fontSize: 9,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  graphicContainer: {
    alignItems: 'center',
    marginVertical: 6,
  },
  graphicCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  graphicImage: {
    width: 55,
    height: 55,
  },
  tokenLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
    fontWeight: '600',
  },
  tokensRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tokenBox: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderWidth: 1,
    borderColor: '#A855F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tokenDigit: {
    fontSize: 16,
    fontWeight: 'bold',
    color: ThemeColors.white,
  },
  actionButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  actionButtonText: {
    color: ThemeColors.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  bottomOptionsContainer: {
    marginTop: 14,
    alignSelf: 'center',
  },
  optionItem: {
    backgroundColor: ThemeColors.cardBg,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedOptionItem: {
    backgroundColor: '#F3E8FF',
    borderColor: '#D8B4FE',
  },
  optionLeftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIconBox: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  optionSmallImage: {
    width: 18,
    height: 18,
  },
  optionTitleText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: ThemeColors.textDark,
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    backgroundColor: ThemeColors.purplePrimary,
    borderColor: ThemeColors.purplePrimary,
  },
});