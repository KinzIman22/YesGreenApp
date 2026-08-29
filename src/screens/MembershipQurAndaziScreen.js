import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getRegistrationLotteryInfo, payRegistrationLottery, playRegistrationLottery } from '../api/apiService';

export default function MembershipQurAndaziScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [lotteryInfo, setLotteryInfo] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  // Screen load hone par user ki lottery info fetch karna
  useEffect(() => {
    fetchLotteryData();
  }, []);

  const fetchLotteryData = async () => {
    try {
      setLoading(true);
      const data = await getRegistrationLotteryInfo();
      setLotteryInfo(data);
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Lottery data load nahi ho saka.');
    } finally {
      setLoading(false);
    }
  };

  // Join / Pay Registration Fee Function (PKR 1,500)
  const handleJoinNow = async () => {
    try {
      setActionLoading(true);
      setShowInfo(false);
      const res = await payRegistrationLottery();
      Alert.alert('Success', res.message || 'You have successfully enrolled in the Registration Lottery!');
      fetchLotteryData(); // Data refresh karne ke liye
    } catch (error) {
      // Agar wallet mein balance kam ho ya koi aur error aaye
      const errorMessage = error.response?.data?.message || 'Payment fail ho gayi.';
      if (errorMessage.toLowerCase().includes('balance') || error.response?.status === 400) {
        setShowInfo(true);
      } else {
        Alert.alert('Error', errorMessage);
      }
    } finally {
      setActionLoading(false);
    }
  };

  // Play Today's Draw Function (Once paid)
  const handlePlayToday = async () => {
    try {
      setActionLoading(true);
      const res = await playRegistrationLottery();
      Alert.alert('Result', res.message || 'Played successfully for today!');
      fetchLotteryData();
    } catch (error) {
      Alert.alert('Info', error.response?.data?.message || 'Aap aaj pehle hi play kar chuke hain.');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.center]} >
        <StatusBar barStyle="light-content" backgroundColor="#004D25" />
        <ActivityIndicator size="large" color="#004D25" />
      </SafeAreaView>
    );
  }

  const hasPaid = lotteryInfo?.hasPaid;
  const canPlayToday = lotteryInfo?.canPlayToday;
  const couponNumber = lotteryInfo?.lottery?.couponNumber;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#004D25" />
      
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>MemberShip Qur'a Andazi</Text>
          <Text style={styles.headerSubTitle}>PKR 1,000 prize per win</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Main White Card */}
        <View style={styles.mainCard}>
          
          {/* Top Green Icon Box */}
          <View style={styles.topIconBox}>
            <Ionicons name="ticket-outline" size={32} color="#FFFFFF" />
          </View>

          <Text style={styles.cardMainTitle}>
            {hasPaid ? 'Your Active Lottery' : 'Join Membership Lottery'}
          </Text>
          
          <Text style={styles.cardDesc}>
            {hasPaid 
              ? `Aapka permanent 6-digit coupon number yeh hai:\n`
              : 'Pay PKR 1,500 once to get a permanent 6-digit coupon. Play every day for free.\nWin PKR 1,000 every time your number matches!'}
          </Text>

          {hasPaid && (
            <View style={styles.couponBox}>
              <Text style={styles.couponText}>{couponNumber || '------'}</Text>
            </View>
          )}

          {/* Feature Row 1 */}
          <View style={styles.featureRow}>
            <View style={styles.featureIconBox}>
              <Ionicons name="wallet-outline" size={18} color="#004D25" />
            </View>
            <Text style={styles.featureText}>One-time fee of PKR 1,500 — never pay again</Text>
          </View>

          {/* Feature Row 2 */}
          <View style={styles.featureRow}>
            <View style={styles.featureIconBox}>
              <Ionicons name="ticket-outline" size={18} color="#004D25" />
            </View>
            <Text style={styles.featureText}>Permanent unique 6-digit coupon assigned forever</Text>
          </View>

          {/* Feature Row 3 */}
          <View style={styles.featureRow}>
            <View style={styles.featureIconBox}>
              <Ionicons name="repeat-outline" size={18} color="#004D25" />
            </View>
            <Text style={styles.featureText}>Spin daily and win PKR 1,000 indefinitely</Text>
          </View>

          {/* Action Button: Agar fee pay nahi ki toh Join Now, warna Play Today */}
          {!hasPaid ? (
            <TouchableOpacity 
              style={styles.joinButton} 
              onPress={handleJoinNow} 
              activeOpacity={0.8}
              disabled={actionLoading}
            >
              <Ionicons name="person-add-outline" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.joinButtonText}>
                {actionLoading ? 'Processing...' : 'Join Now • Rs 1,500'}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={[styles.joinButton, !canPlayToday && { backgroundColor: '#A0AEC0' }]} 
              onPress={handlePlayToday} 
              activeOpacity={0.8}
              disabled={actionLoading || !canPlayToday}
            >
              <Ionicons name="play-outline" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.joinButtonText}>
                {actionLoading ? 'Processing...' : canPlayToday ? 'Play Today\'s Draw' : 'Already Played Today'}
              </Text>
            </TouchableOpacity>
          )}

        </View>

        {/* Info Notification Card (Appears when balance is low or error occurs) */}
        {showInfo && (
          <View style={styles.infoCard}>
            <View style={styles.infoIconWrapper}>
              <Ionicons name="information-outline" size={18} color="#FFFFFF" />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoTitle}>Insufficient Balance / Info</Text>
              <Text style={styles.infoDesc}>Minimum Rs 1,500 is required in your wallet to join the Registration Lottery.</Text>
            </View>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#004D25',
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
    color: '#A3D9C9',
    fontSize: 11,
    marginTop: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 30,
  },
  mainCard: {
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#004D25',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  cardMainTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardDesc: {
    fontSize: 12,
    color: '#4A5568',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
  },
  couponBox: {
    backgroundColor: '#E8F5E9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#004D25',
  },
  couponText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004D25',
    letterSpacing: 2,
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
    backgroundColor: '#E8F5E9',
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
    flexDirection: 'row',
    backgroundColor: '#004D25',
    width: '100%',
    height: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    elevation: 2,
  },
  joinButtonText: {
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