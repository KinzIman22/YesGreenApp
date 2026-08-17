import React, { useState } from 'react';
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
  primaryDark: '#0B7A58',
  screenBg: '#F4F7F5',
  cardBg: '#FFFFFF',
  textDark: '#1A202C',
  textMuted: '#718096',
  white: '#FFFFFF',
  errorBg: '#DE3838',
};

export default function TransactionsScreen({ navigation }) {
  const { containerMaxWidth } = useResponsiveLayout();
  const [selectedFilter, setSelectedFilter] = useState('History');
  const filters = ['History', 'Deposits', 'Withdrawals'];

  // Dynamic empty state content based on selected filter
  const getEmptyStateDetails = () => {
    switch (selectedFilter) {
      case 'Deposits':
        return {
          title: 'No deposit requests',
          subtitle: 'Your deposit requests will appear here',
        };
      case 'Withdrawals':
        return {
          title: 'No withdrawal requests',
          subtitle: 'Your withdrawal requests will appear here',
        };
      default:
        return {
          title: 'No transaction history',
          subtitle: 'Your transaction history will appear here',
        };
    }
  };

  const emptyState = getEmptyStateDetails();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={ThemeColors.primaryDark} />

      {/* Top Header */}
      <View style={styles.header}>
        <View style={[styles.headerWrapper, { maxWidth: containerMaxWidth === '100%' ? '100%' : containerMaxWidth }]}>
          <TouchableOpacity 
            style={styles.backBtn} 
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={22} color={ThemeColors.white} />
          </TouchableOpacity>
          
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>All Transactions</Text>
            <Text style={styles.headerSubtitle}>0 transactions · 0 deposits · 0 withdrawals</Text>
          </View>
        </View>
      </View>

      {/* Main Content Area */}
      <View style={[styles.contentContainer, { maxWidth: containerMaxWidth === '100%' ? '100%' : containerMaxWidth }]}>
        
        {/* Filter Section Card */}
        <View style={styles.filterCard}>
          <View style={styles.scrollWrapper}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={styles.filterScroll}
            >
              {filters.map((filter) => {
                const isActive = selectedFilter === filter;
                return (
                  <TouchableOpacity
                    key={filter}
                    style={[styles.chip, isActive ? styles.activeChip : styles.inactiveChip]}
                    onPress={() => setSelectedFilter(filter)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.chipText, isActive ? styles.activeChipText : styles.inactiveChipText]}>
                      {filter}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Empty State Body */}
          <View style={styles.emptyBody}>
            <View style={styles.emptyIconBox}>
              <Ionicons name="wallet-outline" size={32} color="#A0AEC0" />
            </View>
            <Text style={styles.emptyTitle}>{emptyState.title}</Text>
            <Text style={styles.emptySubtitle}>{emptyState.subtitle}</Text>
          </View>
        </View>

        {/* Error Bottom Banner */}
        <View style={styles.errorBanner}>
          <View style={styles.errorIconCircle}>
            <Ionicons name="alert" size={14} color={ThemeColors.errorBg} />
          </View>
          <View style={styles.errorTextContainer}>
            <Text style={styles.errorHeading}>Error</Text>
            <Text style={styles.errorMessage}>Request timed out. Please try again.</Text>
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.primaryDark,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    backgroundColor: ThemeColors.primaryDark,
    alignItems: 'center',
    paddingVertical: 12,
  },
  headerWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    alignSelf: 'center',
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: ThemeColors.white,
  },
  headerSubtitle: {
    fontSize: 11.5,
    color: '#E2E8F0',
    marginTop: 2,
    fontWeight: '500',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: ThemeColors.screenBg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 20,
    alignSelf: 'center',
  },
  filterCard: {
    flex: 1,
    backgroundColor: ThemeColors.cardBg,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EDF2F7',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  scrollWrapper: {
    width: '100%',
  },
  filterScroll: {
    flexDirection: 'row',
    paddingBottom: 4,
    alignItems: 'center',
  },
  chip: {
    paddingHorizontal: 22,
    paddingVertical: 9,
    borderRadius: 22,
    marginRight: 10,
    borderWidth: 1.5,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeChip: {
    backgroundColor: ThemeColors.primaryDark,
    borderColor: ThemeColors.primaryDark,
  },
  inactiveChip: {
    backgroundColor: ThemeColors.white,
    borderColor: '#CBD5E0',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  activeChipText: {
    color: ThemeColors.white,
  },
  inactiveChipText: {
    color: ThemeColors.textDark,
  },
  emptyBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  emptyIconBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: ThemeColors.textDark,
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 12,
    color: ThemeColors.textMuted,
    textAlign: 'center',
    fontWeight: '500',
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ThemeColors.errorBg,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  errorIconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: ThemeColors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  errorTextContainer: {
    flex: 1,
  },
  errorHeading: {
    fontSize: 12,
    fontWeight: 'bold',
    color: ThemeColors.white,
  },
  errorMessage: {
    fontSize: 11.5,
    color: '#FFF5F5',
    marginTop: 1,
  },
});