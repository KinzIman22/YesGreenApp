import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const ThemeColors = {
  primaryDark: '#054A29',
  screenBg: '#EEF2F0',
  buttonGreen: '#044223',
  white: '#FFFFFF',
  black: '#000000',
  cardBg: '#FFFFFF',
  inputBorder: '#E2E8F0',
  iconGrey: '#718096',
  textDark: '#1A202C',
  textMuted: '#718096',
  chipActiveBg: '#054A29',
  chipActiveText: '#FFFFFF',
  chipInactiveBg: '#FFFFFF',
  chipInactiveText: '#054A29',
  chipBorder: '#054A29',
};

const HelpCenterScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Wallet');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={ThemeColors.primaryDark} />

      {/* Simple Top Header Section */}
      <View style={styles.topSection}>
        {/* Back Button */}
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Ionicons name="chevron-back" size={20} color={ThemeColors.white} />
        </TouchableOpacity>

        {/* Header Title */}
        <Text style={styles.headerTitle}>Help Center</Text>

        {/* Info / Help Icon Button */}
        <TouchableOpacity 
          style={styles.infoButton} 
          activeOpacity={0.8}
        >
          <Ionicons name="information" size={20} color={ThemeColors.white} />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Top Banner Card inside scroll */}
        <View style={styles.bannerCard}>
          <Text style={styles.bannerTitle}>Help Center</Text>
          <Text style={styles.bannerSubtitle}>
            Find quick answers for wallet top-ups, cashback cycles, and lottery modules.
          </Text>
        </View>

        {/* Filter Chips (Wallet, Cashback, Lottery, Game Draw) */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScrollRow}>
          {['Wallet', 'Cashback', 'Lottery', 'Game Draw'].map((tab) => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.chip,
                  isActive ? styles.chipActive : styles.chipInactive,
                ]}
                onPress={() => setActiveTab(tab)}
                activeOpacity={0.8}
              >
                <Text style={[styles.chipText, isActive ? styles.chipTextActive : styles.chipTextInactive]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Quick Actions Card */}
        <View style={styles.cardBox}>
          <Text style={styles.cardHeading}>Quick Actions</Text>
          
          <View style={styles.actionRow}>
            <View style={[styles.actionIconBox, { backgroundColor: '#EBF8FF' }]}>
              <MaterialCommunityIcons name="wallet-outline" size={20} color="#3182CE" />
            </View>
            <Text style={styles.actionText}>Check your transaction history after each top-up.</Text>
          </View>

          <View style={styles.actionRow}>
            <View style={[styles.actionIconBox, { backgroundColor: '#F0FFF4' }]}>
              <Feather name="refresh-cw" size={16} color="#38A169" />
            </View>
            <Text style={styles.actionText}>Use pull-to-refresh if module stats look delayed.</Text>
          </View>

          <View style={[styles.actionRow, { marginBottom: 0 }]}>
            <View style={[styles.actionIconBox, { backgroundColor: '#FEFCBF' }]}>
              <Feather name="bell" size={16} color="#D69E2E" />
            </View>
            <Text style={styles.actionText}>Keep notifications enabled for draw and reward alerts.</Text>
          </View>
        </View>

        {/* How Rewards Modules Work Card */}
        <View style={styles.cardBox}>
          <Text style={styles.cardHeading}>How Rewards Modules Work</Text>
          <Text style={styles.cardBody}>
            Join a module from Home, maintain required wallet balance, and follow each module rules for eligibility. Progress and status are shown directly inside each module card.
          </Text>
        </View>

        {/* Balance and Payment Support Card */}
        <View style={styles.cardBox}>
          <Text style={styles.cardHeading}>Balance and Payment Support</Text>
          <Text style={styles.cardBody}>
            If balance is updated but not visible immediately on another tab, allow a moment for sync or open that page again. Most pages also support pull-to-refresh for instant updates.
          </Text>
        </View>

        {/* Lottery and Draw Questions Card */}
        <View style={styles.cardBox}>
          <Text style={styles.cardHeading}>Lottery and Draw Questions</Text>
          <Text style={styles.cardBody}>
            Draw countdown and eligibility values are fetched from server data. If you miss a cycle or see pending status, review module-specific requirements before rejoining.
          </Text>
        </View>

        {/* FAQ Dropdown: Why is my cashback not visible yet? */}
        <TouchableOpacity 
          style={[styles.faqCard, { marginBottom: 20 }]} 
          activeOpacity={0.8}
          onPress={() => toggleFaq(1)}
        >
          <View style={styles.faqHeaderRow}>
            <Text style={styles.faqTitle}>Why is my cashback not visible yet?</Text>
            <Ionicons 
              name={expandedFaq === 1 ? "chevron-up" : "chevron-down"} 
              size={18} 
              color={ThemeColors.iconGrey} 
            />
          </View>
          {expandedFaq === 1 && (
            <Text style={styles.faqContent}>
              Cashback amounts are processed according to cycle completion and verification rules. Please check back after the sync cycle finishes or pull-to-refresh.
            </Text>
          )}
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.screenBg,
  },
  topSection: {
    height: 70,
    backgroundColor: ThemeColors.primaryDark,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: ThemeColors.white,
  },
  infoButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 30,
  },
  bannerCard: {
    backgroundColor: ThemeColors.buttonGreen,
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    elevation: 3,
    shadowColor: ThemeColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: ThemeColors.white,
    marginBottom: 6,
  },
  bannerSubtitle: {
    fontSize: 12.5,
    color: ThemeColors.white,
    opacity: 0.85,
    lineHeight: 18,
  },
  chipsScrollRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipActive: {
    backgroundColor: ThemeColors.chipActiveBg,
    borderColor: ThemeColors.chipBorder,
  },
  chipInactive: {
    backgroundColor: ThemeColors.chipInactiveBg,
    borderColor: ThemeColors.inputBorder,
  },
  chipText: {
    fontSize: 12.5,
    fontWeight: '600',
  },
  chipTextActive: {
    color: ThemeColors.chipActiveText,
  },
  chipTextInactive: {
    color: ThemeColors.chipInactiveText,
  },
  cardBox: {
    backgroundColor: ThemeColors.cardBg,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: ThemeColors.inputBorder,
    elevation: 2,
    shadowColor: ThemeColors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  cardHeading: {
    fontSize: 15,
    fontWeight: 'bold',
    color: ThemeColors.primaryDark,
    marginBottom: 8,
  },
  cardBody: {
    fontSize: 13,
    color: ThemeColors.textMuted,
    lineHeight: 19,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  actionText: {
    flex: 1,
    fontSize: 13,
    color: ThemeColors.textDark,
    lineHeight: 18,
    fontWeight: '500',
  },
  faqCard: {
    backgroundColor: '#FAF5FF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E9D8FD',
  },
  faqHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  faqTitle: {
    fontSize: 13.5,
    fontWeight: 'bold',
    color: ThemeColors.primaryDark,
    flex: 1,
    marginRight: 10,
  },
  faqContent: {
    fontSize: 12.5,
    color: ThemeColors.textMuted,
    marginTop: 10,
    lineHeight: 18,
  },
});

export default HelpCenterScreen;