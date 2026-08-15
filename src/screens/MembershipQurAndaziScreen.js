import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MembershipQurAndaziScreen({ navigation }) {
  // User ka available balance ya check state
  const [userBalance, setUserBalance] = useState(500); // Agar 1500 ya ziada hoga toh enroll ho jaye ga
  const [showInfo, setShowInfo] = useState(false);

  const handleJoinNow = () => {
    const requiredAmount = 1500;
    
    if (userBalance >= requiredAmount) {
      setShowInfo(false);
      // Enrollment successful logic yahan likhein
      Alert.alert("Success", "You have successfully enrolled in the Membership Lottery!");
    } else {
      // Agar Rs 1,500 pure nahi hain toh info notification show hoga
      setShowInfo(true);
    }
  };

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

          <Text style={styles.cardMainTitle}>Join Membership Lottery</Text>
          
          <Text style={styles.cardDesc}>
            Pay PKR 1,500 once to get a permanent 6-digit coupon. Play every day for free.{'\n'}
            Win PKR 1,000 every time your number matches!
          </Text>

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

          {/* Join Now Button */}
          <TouchableOpacity style={styles.joinButton} onPress={handleJoinNow} activeOpacity={0.8}>
            <Ionicons name="person-add-outline" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text style={styles.joinButtonText}>Join Now • Rs 1,500</Text>
          </TouchableOpacity>

        </View>

        {/* Info Notification Card (Appears when balance is less than 1500) */}
        {showInfo && (
          <View style={styles.infoCard}>
            <View style={styles.infoIconWrapper}>
              <Ionicons name="information-outline" size={18} color="#FFFFFF" />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoTitle}>Info</Text>
              <Text style={styles.infoDesc}>Minimum Rs 1,500 is required to join the Registration Lottery.</Text>
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
    backgroundColor: '#004D25',
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