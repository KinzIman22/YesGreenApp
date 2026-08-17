import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  StatusBar, 
  TouchableOpacity, 
  ScrollView, 
  ActivityIndicator 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useResponsiveLayout } from '../utils/responsive';

const ThemeColors = {
  headerBg: '#0B7A58',
  screenBg: '#FFFFFF',
  textDark: '#1A202C',
  textMuted: '#718096',
  white: '#FFFFFF',
  chipActiveBg: '#0B7A58',
  chipInactiveBorder: '#CBD5E0',
  chipInactiveText: '#2D3748',
};

export default function NotificationsScreen({ navigation }) {
  const { containerMaxWidth } = useResponsiveLayout();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  // Filter categories
  const filters = ['All', 'Shopping', 'Cashback', 'Lottery'];

  // Simulate loading effect whenever filter changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200); // 1.2 seconds loading simulation

    return () => clearTimeout(timer);
  }, [selectedFilter]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={ThemeColors.headerBg} />

      {/* Top Header */}
      <View style={styles.header}>
        <View style={[styles.headerWrapper, { maxWidth: containerMaxWidth === '100%' ? '100%' : containerMaxWidth }]}>
          <Text style={styles.headerTitle}>Notifications</Text>
        </View>
      </View>

      <View style={[styles.responsiveWrapper, { maxWidth: containerMaxWidth === '100%' ? '100%' : containerMaxWidth }]}>
        
        {/* Filter Chips Row */}
        <View style={styles.filterContainer}>
          <View style={[styles.filterInnerWrapper, { maxWidth: containerMaxWidth === '100%' ? '100%' : containerMaxWidth }]}>
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
                    style={[
                      styles.chip,
                      isActive ? styles.activeChip : styles.inactiveChip
                    ]}
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
        </View>

        {/* Content Area: Loading vs Empty State */}
        <View style={styles.contentBody}>
          {isLoading ? (
            <View style={styles.centerContainer}>
              <ActivityIndicator size="large" color={ThemeColors.headerBg} />
            </View>
          ) : (
            <View style={styles.centerContainer}>
              <View style={styles.emptyIconContainer}>
                <Ionicons name="time-outline" size={54} color="#A0AEC0" />
              </View>
              <Text style={styles.emptyText}>No notifications in this filter</Text>
            </View>
          )}
        </View>

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
  header: {
    width: '100%',
    backgroundColor: ThemeColors.headerBg,
    alignItems: 'center',
  },
  headerWrapper: {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  headerTitle: {
    color: ThemeColors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  responsiveWrapper: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: ThemeColors.screenBg,
    paddingBottom: 70, // Content stays safely above the bottom tab bar
  },
  filterContainer: {
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
    backgroundColor: ThemeColors.white,
  },
  filterInnerWrapper: {
    width: '100%',
    alignSelf: 'center',
    paddingVertical: 12,
  },
  filterScroll: {
    paddingHorizontal: 12,
  },
  chip: {
    paddingHorizontal: 16, // Reduced padding for better mobile fit (Redmi 12 optimized)
    paddingVertical: 7,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  activeChip: {
    backgroundColor: ThemeColors.chipActiveBg,
    borderColor: ThemeColors.chipActiveBg,
  },
  inactiveChip: {
    backgroundColor: ThemeColors.white,
    borderColor: ThemeColors.chipInactiveBorder,
  },
  chipText: {
    fontSize: 12.5, // Adjusted font size to prevent text overflow
    fontWeight: '600',
  },
  activeChipText: {
    color: ThemeColors.white,
  },
  inactiveChipText: {
    color: ThemeColors.chipInactiveText,
  },
  contentBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyIconContainer: {
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#718096',
  },
});