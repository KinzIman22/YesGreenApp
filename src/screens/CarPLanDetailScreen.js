import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useResponsiveLayout } from '../utils/responsive';

const ThemeColors = {
  screenBg: '#F4F6F9',
  primaryBlue: '#0D47A1',
  headerBg: '#1565C0',
  cardBg: '#FFFFFF',
  textDark: '#1A202C',
  textMuted: '#64748B',
  inputBg: '#FFFFFF',
  inputBorder: '#CBD5E1',
};

export default function CarPlanDetailScreen({ route, navigation }) {
  const { containerMaxWidth } = useResponsiveLayout();
  const { plan } = route.params || { 
    title: 'Plan 1', 
    price: '30 لاکھ', 
    totalAmount: 'PKR 3,000,000',
    image: require('../assets/car1.png')
  };

  const [referralCode1, setReferralCode1] = useState('');
  const [referralCode2, setReferralCode2] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={ThemeColors.headerBg} />
      
      {/* Top Header */}
      <View style={styles.header}>
        <View style={[styles.headerWrapper, { maxWidth: containerMaxWidth === '100%' ? '100%' : containerMaxWidth }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>{plan.title}</Text>
          </View>
          <TouchableOpacity style={styles.infoButton}>
            <Ionicons name="information-outline" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <View style={[styles.responsiveWrapper, { maxWidth: containerMaxWidth === '100%' ? '100%' : containerMaxWidth }]}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* 1st Card: Join With Qur'andazi */}
          <View style={styles.planCard}>
            <View style={styles.cardHeaderRow}>
              <Text style={styles.planTitle}>{plan.title}</Text>
              <Text style={styles.priceLabel}>{plan.price}</Text>
            </View>

            <View style={styles.imageContainer}>
              <Image source={plan.image} style={styles.carImage} resizeMode="contain" />
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statTitle}>Total amount</Text>
                <Text style={styles.statValue}>{plan.totalAmount || 'PKR 3,000,000'}</Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.statTitle}>Threshold</Text>
                <Text style={styles.statValue}>PKR 547,500</Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.statTitle}>Post-win monthly</Text>
                <Text style={styles.statValue}>PKR 36,000</Text>
              </View>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Referral code"
              placeholderTextColor="#94A3B8"
              value={referralCode1}
              onChangeText={setReferralCode1}
            />

            <TouchableOpacity style={styles.actionButton} activeOpacity={0.85}>
              <Text style={styles.actionButtonText}>Join With Qur'andazi</Text>
            </TouchableOpacity>

            <Text style={styles.descriptionText}>
              If you spin and win, you receive the car instantly and then pay the remaining balance via the fixed post-win monthly installments until the total is paid. If you do not win the spin, you must reach the threshold amount to get the car, after which you'll continue paying the post-win monthly installments.
            </Text>
          </View>

          {/* 2nd Card: Join With Installments */}
          <View style={styles.planCard}>
            <View style={styles.cardHeaderRow}>
              <Text style={styles.planTitle}>{plan.title}</Text>
              <Text style={styles.priceLabel}>{plan.price}</Text>
            </View>

            <View style={styles.imageContainer}>
              <Image source={plan.image} style={styles.carImage} resizeMode="contain" />
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statTitle}>Total amount</Text>
                <Text style={styles.statValue}>{plan.totalAmount || 'PKR 3,000,000'}</Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.statTitle}>Fixed monthly pay</Text>
                <Text style={styles.statValue}>PKR 45,000</Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.statTitle}>Duration</Text>
                <Text style={styles.statValue}>12 Months</Text>
              </View>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Referral code optional"
              placeholderTextColor="#94A3B8"
              value={referralCode2}
              onChangeText={setReferralCode2}
            />

            <TouchableOpacity style={styles.actionButton} activeOpacity={0.85}>
              <Text style={styles.actionButtonText}>Join With Installments</Text>
            </TouchableOpacity>

            <Text style={styles.descriptionText}>
              Pay your 12 month installments and get your car from YesTime Plus Pvt Ltd, then pay your remaining installments after getting the car.
            </Text>
          </View>

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
    backgroundColor: ThemeColors.headerBg,
    alignItems: 'center',
    elevation: 4,
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
  infoButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  planCard: {
    backgroundColor: ThemeColors.cardBg,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: ThemeColors.textDark,
  },
  priceLabel: {
    color: ThemeColors.primaryBlue,
    fontSize: 14,
    fontWeight: 'bold',
  },
  imageContainer: {
    height: 140,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  carImage: {
    width: '100%',
    height: '100%',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderRadius: 14,
    padding: 10,
    marginHorizontal: 4,
    alignItems: 'flex-start',
  },
  statTitle: {
    fontSize: 10,
    color: ThemeColors.textMuted,
    marginBottom: 4,
    fontWeight: '600',
  },
  statValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: ThemeColors.textDark,
  },
  input: {
    borderWidth: 1,
    borderColor: ThemeColors.inputBorder,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: ThemeColors.textDark,
    marginBottom: 16,
    backgroundColor: ThemeColors.inputBg,
  },
  actionButton: {
    backgroundColor: ThemeColors.headerBg,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 11,
    color: ThemeColors.textMuted,
    lineHeight: 18,
  },
});