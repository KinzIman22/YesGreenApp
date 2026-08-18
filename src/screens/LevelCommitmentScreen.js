import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  StatusBar, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useResponsiveLayout } from '../utils/responsive';

const ThemeColors = {
  headerBg: '#5B21B6', // Purple theme
  screenBg: '#F3F4F6',
  cardBg: '#FFFFFF',
  textDark: '#1F2937',
  textMuted: '#6B7280',
  white: '#FFFFFF',
  purplePrimary: '#5B21B6',
};

export default function MySavingsScreen({ navigation }) {
  const { width, containerMaxWidth } = useResponsiveLayout();

  // Determine actual max width constraint for inner elements
  const isConstrained = containerMaxWidth !== '100%';
  const maxContentWidth = isConstrained ? containerMaxWidth : width;
  const CONTAINER_WIDTH = maxContentWidth - 32;
  
  // Responsive grid calculation for 2 columns with spacing
  const STAT_CARD_WIDTH = (CONTAINER_WIDTH - 12) / 2;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={ThemeColors.headerBg} />

      <View style={[styles.responsiveWrapper, { maxWidth: containerMaxWidth }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={22} color={ThemeColors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My savings</Text>
        </View>

        {/* Body Content */}
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.scrollInnerWrapper}>

            {/* Statistics Section */}
            <View style={[styles.sectionContainer, { width: CONTAINER_WIDTH }]}>
              <View style={styles.sectionHeaderRow}>
                <View style={styles.sectionIndicator} />
                <Text style={styles.sectionTitle}>Statistics</Text>
              </View>

              <View style={styles.statsCardContainer}>
                <View style={styles.statsGrid}>
                  
                  {/* Total Shopping Card */}
                  <View style={[styles.statBox, { width: STAT_CARD_WIDTH, backgroundColor: '#F5F3FF' }]}>
                    <View style={[styles.iconBox, { backgroundColor: '#EDE9FE' }]}>
                      <Ionicons name="cart-outline" size={20} color="#7C3AED" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.statAmount} numberOfLines={1}>Rs 0</Text>
                      <Text style={styles.statLabel} numberOfLines={1}>Total Shopping</Text>
                    </View>
                  </View>

                  {/* Total Winnings Card */}
                  <View style={[styles.statBox, { width: STAT_CARD_WIDTH, backgroundColor: '#FEFCE8' }]}>
                    <View style={[styles.iconBox, { backgroundColor: '#FEF08A' }]}>
                      <Ionicons name="trophy-outline" size={20} color="#CA8A04" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.statAmount} numberOfLines={1}>Rs 0</Text>
                      <Text style={styles.statLabel} numberOfLines={1}>Total Winnings</Text>
                    </View>
                  </View>

                  {/* Total Wins Card */}
                  <View style={[styles.statBox, { width: STAT_CARD_WIDTH, backgroundColor: '#F0FDF4' }]}>
                    <View style={[styles.iconBox, { backgroundColor: '#DCFCE7' }]}>
                      <Ionicons name="checkmark-circle-outline" size={20} color="#16A34A" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.statAmount} numberOfLines={1}>0</Text>
                      <Text style={styles.statLabel} numberOfLines={1}>Total Wins</Text>
                    </View>
                  </View>

                  {/* Purchases Card */}
                  <View style={[styles.statBox, { width: STAT_CARD_WIDTH, backgroundColor: '#F1F5F9' }]}>
                    <View style={[styles.iconBox, { backgroundColor: '#E2E8F0' }]}>
                      <Ionicons name="receipt-outline" size={20} color="#475569" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.statAmount} numberOfLines={1}>0</Text>
                      <Text style={styles.statLabel} numberOfLines={1}>Purchases</Text>
                    </View>
                  </View>

                </View>
              </View>
            </View>

            {/* Level Commitment Section (Clickable) */}
            <TouchableOpacity 
              style={[styles.levelTouchableCard, { width: CONTAINER_WIDTH }]}
              onPress={() => navigation.navigate('LevelCommitmentScreen')}
              activeOpacity={0.7}
            >
              <View style={styles.levelSectionHeader}>
                <Ionicons name="grid-outline" size={18} color={ThemeColors.purplePrimary} style={{ marginRight: 8 }} />
                <Text style={styles.purpleSectionTitle}>Level commitment</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={ThemeColors.textMuted} />
            </TouchableOpacity>

          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.headerBg,
    alignItems: 'center',
  },
  responsiveWrapper: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: ThemeColors.headerBg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: ThemeColors.headerBg,
    width: '100%',
    alignSelf: 'center',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: ThemeColors.white,
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: ThemeColors.screenBg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingBottom: 40,
    minHeight: '100%',
  },
  scrollInnerWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  sectionContainer: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionIndicator: {
    width: 4,
    height: 16,
    backgroundColor: '#5B21B6',
    borderRadius: 2,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: ThemeColors.textDark,
  },
  statsCardContainer: {
    backgroundColor: ThemeColors.cardBg,
    borderRadius: 20,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statBox: {
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  statAmount: {
    fontSize: 15,
    fontWeight: 'bold',
    color: ThemeColors.textDark,
  },
  statLabel: {
    fontSize: 11,
    color: ThemeColors.textMuted,
    marginTop: 1,
  },
  levelTouchableCard: {
    backgroundColor: ThemeColors.cardBg,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  levelSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  purpleSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: ThemeColors.purplePrimary,
  },
});