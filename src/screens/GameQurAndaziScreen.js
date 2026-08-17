import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useResponsiveLayout } from '../utils/responsive';

const ThemeColors = {
  primaryBrown: '#79320E',
  screenBg: '#e6dfdc',
  cardBg: '#FFFFFF',
  textDark: '#1A202C',
  textMuted: '#4A5568',
  white: '#FFFFFF',
};

export default function GameQurAndaziScreen({ navigation }) {
  const { width, containerMaxWidth } = useResponsiveLayout();
  const [userBalance, setUserBalance] = useState(20); // Testing ke liye kam balance rakha hai taaki info notification show ho sakay
  const [showInfo, setShowInfo] = useState(false);

  const handleInvestNow = () => {
    const requiredAmount = 50;
    
    if (userBalance >= requiredAmount) {
      setShowInfo(false);
      Alert.alert("Success", "You have successfully invested Rs 50 in Game Qur'a Andazi!");
    } else {
      setShowInfo(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={ThemeColors.primaryBrown} />
      
      {/* Top Header */}
      <View style={styles.header}>
        <View style={[styles.headerWrapper, { maxWidth: containerMaxWidth === '100%' ? '100%' : containerMaxWidth }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Game Qur'a Andazi</Text>
            <Text style={styles.headerSubTitle}>Invest daily · Grow your prize</Text>
          </View>
        </View>
      </View>

      <View style={[styles.responsiveWrapper, { maxWidth: containerMaxWidth === '100%' ? '100%' : containerMaxWidth }]}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Main White Card */}
          <View style={styles.mainCard}>
            
            {/* Top Brown Dice Icon Box */}
            <View style={styles.topIconBox}>
              <Ionicons name="dice-outline" size={32} color="#FFFFFF" />
            </View>

            <Text style={styles.cardMainTitle}>Start Playing Game Qur'a Andazi</Text>
            
            <Text style={styles.cardDesc}>
              Invest PKR 50 each day to grow your prize.{'\n'}
              Day 1 → Rs 1,000 prize. Day 30 → Rs 30,000!{'\n'}
              Win by matching the daily Qur'a Andazi number.
            </Text>

            {/* Feature Row 1 */}
            <View style={styles.featureRow}>
              <View style={styles.featureIconBox}>
                <Ionicons name="trending-up-outline" size={18} color={ThemeColors.primaryBrown} />
              </View>
              <Text style={styles.featureText}>Prize grows: min(invested × 20, 30,000)</Text>
            </View>

            {/* Feature Row 2 */}
            <View style={styles.featureRow}>
              <View style={styles.featureIconBox}>
                <Ionicons name="calendar-outline" size={18} color={ThemeColors.primaryBrown} />
              </View>
              <Text style={styles.featureText}>Day only advances when you invest — no pressure</Text>
            </View>

            {/* Feature Row 3 */}
            <View style={styles.featureRow}>
              <View style={styles.featureIconBox}>
                <Ionicons name="trophy-outline" size={18} color={ThemeColors.primaryBrown} />
              </View>
              <Text style={styles.featureText}>Permanent token after reaching PKR 30,000 cap</Text>
            </View>

            {/* Invest Now Button */}
            <TouchableOpacity style={styles.investButton} onPress={handleInvestNow} activeOpacity={0.8}>
              <Ionicons name="play-circle-outline" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.investButtonText}>Invest Rs 50 — Start Now</Text>
            </TouchableOpacity>

          </View>

          {/* Info Notification Card (Appears when balance is less than 50) */}
          {showInfo && (
            <View style={styles.infoCard}>
              <View style={styles.infoIconWrapper}>
                <Ionicons name="information-outline" size={18} color="#FFFFFF" />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoTitle}>Info</Text>
                <Text style={styles.infoDesc}>Minimum Rs. 50 balance is required to join daily lottery.</Text>
              </View>
            </View>
          )}

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.primaryBrown,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    backgroundColor: ThemeColors.primaryBrown,
    alignItems: 'center',
  },
  headerWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  responsiveWrapper: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: ThemeColors.screenBg,
    minHeight: '100%',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerSubTitle: {
    color: '#F3C6A5',
    fontSize: 11,
    marginTop: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 40,
  },
  mainCard: {
    backgroundColor: ThemeColors.cardBg,
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  topIconBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: ThemeColors.primaryBrown,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  cardMainTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: ThemeColors.textDark,
    marginBottom: 8,
    textAlign: 'center',
  },
  cardDesc: {
    fontSize: 12,
    color: ThemeColors.textMuted,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
  },
  featureIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#FBE9E7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  featureText: {
    fontSize: 11,
    color: '#2D3748',
    flex: 1,
    fontWeight: '500',
  },
  investButton: {
    flexDirection: 'row',
    backgroundColor: ThemeColors.primaryBrown,
    width: '100%',
    height: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    elevation: 2,
  },
  investButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#0B2545',
    borderRadius: 16,
    padding: 14,
    marginTop: 16,
    alignItems: 'center',
    elevation: 3,
  },
  infoIconWrapper: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  infoDesc: {
    color: '#CBD5E1',
    fontSize: 11,
    lineHeight: 15,
  },
});