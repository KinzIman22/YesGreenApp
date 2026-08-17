import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useResponsiveLayout } from '../utils/responsive';

const ThemeColors = {
  screenBg: '#F4F6F9',
  primaryBlue: '#0D47A1',
  headerBg: '#1565C0',
  cardBg: '#FFFFFF',
  textDark: '#1A202C',
  textMuted: '#64748B',
  badgeBg: '#E3F2FD',
  badgeText: '#0D47A1',
};

export default function CarPlansScreen({ navigation }) {
  const { containerMaxWidth } = useResponsiveLayout();

  const carPlans = [
    {
      id: '1',
      title: 'Plan 1',
      price: '30 لاکھ',
      image: require('../assets/car1.png'), // Yahan apni image ka path dein
    },
    {
      id: '2',
      title: 'Plan 2',
      price: '60 لاکھ',
      image: require('../assets/car2.png'), // Yahan apni image ka path dein
    },
    {
      id: '3',
      title: 'Plan 3',
      price: '1.20 کروڑ',
      image: require('../assets/car3.png'), // Yahan apni image ka path dein
    },
    {
      id: '4',
      title: 'Plan 4',
      price: '2.50 کروڑ',
      image: require('../assets/car4.png'), // Yahan apni image ka path dein
    },
  ];

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
            <Text style={styles.headerTitle}>Car Plans Selection</Text>
            <Text style={styles.headerSubTitle}>Choose your daily lottery plan</Text>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <View style={[styles.responsiveWrapper, { maxWidth: containerMaxWidth === '100%' ? '100%' : containerMaxWidth }]}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Title & Description */}
          <View style={styles.introContainer}>
            <Text style={styles.mainHeading}>Choose your car plan</Text>
            <Text style={styles.subHeading}>
              Pick one of the four daily lottery plans and join now. Your chosen plan will be ready once you join.
            </Text>
          </View>

          {/* 4 Plans Cards */}
          {carPlans.map((plan) => (
            <TouchableOpacity 
              key={plan.id} 
              style={styles.planCard} 
              activeOpacity={0.9}
              onPress={() => {
                navigation.navigate('CarPlanDetailScreen',{plan:plan})
              }}
            >
              <View style={styles.cardHeaderRow}>
                <Text style={styles.planTitle}>{plan.title}</Text>
                <View style={styles.priceBadge}>
                  <Text style={styles.priceText}>{plan.price}</Text>
                </View>
              </View>

              <View style={styles.imageContainer}>
                <Image 
                  source={plan.image} 
                  style={styles.carImage} 
                  resizeMode="contain" 
                />
              </View>
            </TouchableOpacity>
          ))}

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
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerSubTitle: {
    color: '#BBDEFB',
    fontSize: 11,
    marginTop: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  introContainer: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  mainHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: ThemeColors.textDark,
    marginBottom: 6,
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 12,
    color: ThemeColors.textMuted,
    textAlign: 'center',
    lineHeight: 18,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: ThemeColors.textDark,
  },
  priceBadge: {
    backgroundColor: ThemeColors.badgeBg,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
  },
  priceText: {
    color: ThemeColors.badgeText,
    fontSize: 13,
    fontWeight: 'bold',
  },
  imageContainer: {
    height: 140,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  carImage: {
    width: '100%',
    height: '100%',
  },
});