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

const TermsConditionsScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Account Rules');
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
        <Text style={styles.headerTitle}>Terms & Conditions</Text>

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
          <Text style={styles.bannerTitle}>Terms & Conditions</Text>
          <Text style={styles.bannerSubtitle}>
            Rules for account use, module participation, and wallet-related activities.
          </Text>
        </View>

        {/* Filter Chips (Account Rules, Reward Eligibility, Fair Use) */}
        <View style={styles.chipsRow}>
          {['Account Rules', 'Reward Eligibility', 'Fair Use'].map((tab) => {
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
        </View>

        {/* Quick Actions Card */}
        <View style={styles.cardBox}>
          <Text style={styles.cardHeading}>Quick Actions</Text>
          
          <View style={styles.actionRow}>
            <View style={[styles.actionIconBox, { backgroundColor: '#EBF8FF' }]}>
              <MaterialCommunityIcons name="file-document-outline" size={20} color="#3182CE" />
            </View>
            <Text style={styles.actionText}>Follow module eligibility and payment rules before joining.</Text>
          </View>

          <View style={[styles.actionRow, { marginBottom: 0 }]}>
            <View style={[styles.actionIconBox, { backgroundColor: '#F0FFF4' }]}>
              <Feather name="shield" size={18} color="#38A169" />
            </View>
            <Text style={styles.actionText}>Keep your account details accurate and up to date.</Text>
          </View>
        </View>

        {/* Use of Service Card */}
        <View style={styles.cardBox}>
          <Text style={styles.cardHeading}>Use of Service</Text>
          <Text style={styles.cardBody}>
            By using this app, you agree to lawful use, accurate registration details, and compliance with all feature-specific participation rules.
          </Text>
        </View>

        {/* Rewards, Cashback, and Lottery Modules Card */}
        <View style={styles.cardBox}>
          <Text style={styles.cardHeading}>Rewards, Cashback, and Lottery Modules</Text>
          <Text style={styles.cardBody}>
            Eligibility for rewards and draws depends on module conditions, wallet requirements, cycle timing, and account standing.
          </Text>
        </View>

        {/* Account Responsibility Card */}
        <View style={styles.cardBox}>
          <Text style={styles.cardHeading}>Account Responsibility</Text>
          <Text style={styles.cardBody}>
            You are responsible for account activity performed under your credentials. Report suspicious activity promptly and avoid sharing OTP/password data.
          </Text>
        </View>

        {/* FAQ Dropdown 1: Can module rules change over time? */}
        <TouchableOpacity 
          style={styles.faqCard} 
          activeOpacity={0.8}
          onPress={() => toggleFaq(1)}
        >
          <View style={styles.faqHeaderRow}>
            <Text style={styles.faqTitle}>Can module rules change over time?</Text>
            <Ionicons 
              name={expandedFaq === 1 ? "chevron-up" : "chevron-down"} 
              size={18} 
              color={ThemeColors.iconGrey} 
            />
          </View>
          {expandedFaq === 1 && (
            <Text style={styles.faqContent}>
              Yes, rules and conditions may be updated periodically to align with system improvements and regulatory requirements. Users are advised to review them regularly.
            </Text>
          )}
        </TouchableOpacity>

        {/* FAQ Dropdown 2: What happens if terms are violated? */}
        <TouchableOpacity 
          style={[styles.faqCard, { marginBottom: 20 }]} 
          activeOpacity={0.8}
          onPress={() => toggleFaq(2)}
        >
          <View style={styles.faqHeaderRow}>
            <Text style={styles.faqTitle}>What happens if terms are violated?</Text>
            <Ionicons 
              name={expandedFaq === 2 ? "chevron-up" : "chevron-down"} 
              size={18} 
              color={ThemeColors.iconGrey} 
            />
          </View>
          {expandedFaq === 2 && (
            <Text style={styles.faqContent}>
              Violations can lead to temporary suspension, forfeiture of rewards, or permanent termination of the account depending on the severity of the breach.
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

  // Scroll Content Container
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 30,
  },

  // Banner Card at top of scroll
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

  // Chips Row
  chipsRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
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

  // Generic Card Box
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

  // Quick Actions specific rows
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

  // FAQ Accordion Card
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

export default TermsConditionsScreen;