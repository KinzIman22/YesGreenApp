import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NetInfo from '@react-native-community/netinfo';
import { useResponsiveLayout } from '../utils/responsive';
import ErrorScreen from '../components/ErrorScreen';

const ThemeColors = {
  primaryPurple: '#4A148C',
  screenBg: '#3E1078',
  cardBg: '#FFFFFF',
  textDark: '#1A202C',
  textMuted: '#4A5568',
  white: '#FFFFFF',
  accentPurple: '#7B1FA2',
  successGreen: '#2E7D32',
};

export default function ShoppingQurAndaziScreen({ navigation }) {
  const { containerMaxWidth } = useResponsiveLayout();
  const [isConnected, setIsConnected] = useState(true);
  const [isJoining, setIsJoining] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  // Real-time network listener & initial fetch
  useEffect(() => {
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
    });

    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  // Agar internet nahi hai, toh ErrorScreen show hogi
  if (!isConnected) {
    return (
      <ErrorScreen 
        themeColor={ThemeColors.primaryPurple} 
        onRetry={() => {
          NetInfo.fetch().then(state => {
            setIsConnected(state.isConnected);
          });
        }} 
      />
    );
  }

const handleJoinProgram = () => {
    if (isJoined || isJoining) return;

    setIsJoining(true);

    // Chota delay taake loading feel ho
    setTimeout(() => {
      setIsJoining(false);
      setIsJoined(true);
      setShowSuccessNotification(true);

      // Thodi der baad navigate karein
      setTimeout(() => {
        setShowSuccessNotification(false);
        
        // Pehle direct check karein, agar parent zaroori hai toh wo use karein
        if (navigation.canGoBack() && navigation.replace) {
          try {
            navigation.replace('ShoppingQurAndaziDashboardScreen');
          } catch (e) {
            navigation.navigate('ShoppingQurAndaziDashboardScreen');
          }
        } else {
          navigation.navigate('ShoppingQurAndaziDashboardScreen');
        }
      }, 800);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={ThemeColors.screenBg} />
      
      {/* Top Header */}
      <View style={styles.header}>
        <View style={[styles.headerWrapper, { maxWidth: containerMaxWidth === '100%' ? '100%' : containerMaxWidth }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Shopping Qur'a Andazi</Text>
            <Text style={styles.headerSubTitle}>Your saving, your future</Text>
          </View>
        </View>
      </View>

      <View style={[styles.responsiveWrapper, { maxWidth: containerMaxWidth === '100%' ? '100%' : containerMaxWidth }]}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Main White Card */}
          <View style={styles.mainCard}>
            
            {/* Top Purple Bag Icon Box */}
            <View style={styles.topIconBox}>
              <Ionicons name="bag-handle-outline" size={32} color="#FFFFFF" />
            </View>

            <Text style={styles.cardMainTitle}>Join Cashback Program</Text>
            
            <Text style={styles.cardDesc}>
              Shop at partner stores to earn cashback rewards.{'\n'}
              Level up with every purchase — reach Level 30{'\n'}
              for a permanent coupon worth Rs 30,000!
            </Text>

            {/* Feature Row 1 */}
            <View style={styles.featureRow}>
              <View style={styles.featureIconBox}>
                <Ionicons name="cart-outline" size={18} color={ThemeColors.accentPurple} />
              </View>
              <Text style={styles.featureText}>Shop Rs 1,000 → unlock Level 1 play</Text>
            </View>

            {/* Feature Row 2 */}
            <View style={styles.featureRow}>
              <View style={styles.featureIconBox}>
                <Ionicons name="trending-up-outline" size={18} color={ThemeColors.accentPurple} />
              </View>
              <Text style={styles.featureText}>Prize = Level × Rs 1,000 (max Rs 30,000)</Text>
            </View>

            {/* Feature Row 3 */}
            <View style={styles.featureRow}>
              <View style={styles.featureIconBox}>
                <Ionicons name="infinite-outline" size={18} color={ThemeColors.accentPurple} />
              </View>
              <Text style={styles.featureText}>Permanent coupon at Level 30 — keep winning!</Text>
            </View>

            {/* Join / Joining / Joined Button */}
            <TouchableOpacity 
              style={[
                styles.joinButton, 
                isJoined && styles.joinedButtonState
              ]} 
              onPress={handleJoinProgram} 
              activeOpacity={0.8}
              disabled={isJoining || isJoined}
            >
              {isJoining ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color="#FFFFFF" style={{ marginRight: 8 }} />
                  <Text style={styles.joinButtonText}>Joining...</Text>
                </View>
              ) : isJoined ? (
                <View style={styles.loadingContainer}>
                  <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
                  <Text style={styles.joinButtonText}>Joined</Text>
                </View>
              ) : (
                <Text style={styles.joinButtonText}>Join Cashback Program</Text>
              )}
            </TouchableOpacity>

          </View>

          {/* Success Notification Card (Appears dynamically) */}
          {showSuccessNotification && (
            <View style={styles.successCard}>
              <View style={styles.successIconWrapper}>
                <Ionicons name="checkmark" size={16} color="#FFFFFF" />
              </View>
              <View style={styles.successTextContainer}>
                <Text style={styles.successTitle}>Success</Text>
                <Text style={styles.successDesc}>Cashback cycle started! You are now enrolled.</Text>
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
    backgroundColor: ThemeColors.screenBg,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    backgroundColor: ThemeColors.screenBg,
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
    color: '#D1C4E9',
    fontSize: 11,
    marginTop: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
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
    backgroundColor: ThemeColors.screenBg,
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
    backgroundColor: '#EDE7F6',
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
  joinButton: {
    backgroundColor: '#9575CD',
    width: '100%',
    height: 50,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    elevation: 2,
  },
  joinedButtonState: {
    backgroundColor: '#5E35B1',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  successCard: {
    flexDirection: 'row',
    backgroundColor: '#2E7D32',
    borderRadius: 16,
    padding: 14,
    marginTop: 16,
    alignItems: 'center',
    elevation: 3,
  },
  successIconWrapper: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  successTextContainer: {
    flex: 1,
  },
  successTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 1,
  },
  successDesc: {
    color: '#E8F5E9',
    fontSize: 11,
  },
});