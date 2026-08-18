import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  StatusBar, 
  TouchableOpacity, 
  ScrollView, 
  ActivityIndicator,
  Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useResponsiveLayout } from '../utils/responsive';

const ThemeColors = {
  headerBg: '#0B7A58',
  screenBg: '#F7FAFC',
  textDark: '#1A202C',
  textMuted: '#718096',
  white: '#FFFFFF',
  chipActiveBg: '#0B7A58',
  chipInactiveBorder: '#CBD5E0',
  chipInactiveText: '#2D3748',
  cardBg: '#FFFFFF',
  cardBorder: '#E2E8F0',
};

// Dummy notification items categorized by filters
const ALL_NOTIFICATIONS = [
  {
    id: '1',
    category: 'Cashback',
    title: 'Cashback Cycle Started!',
    description: 'Your cashback coupon is: 131831. Show this to shopkeepers when making purchases.',
    time: '9m ago',
    icon: 'information-circle',
    iconColor: '#0B7A58',
    iconBg: '#E6F4EA',
  },
  {
    id: '2',
    category: 'Shopping',
    title: 'New Store Discount!',
    description: 'Get an extra 10% off on partner fashion stores near you this weekend.',
    time: '2h ago',
    icon: 'bag-handle',
    iconColor: '#D69E2E',
    iconBg: '#FEFCBF',
  },
  {
    id: '3',
    category: 'Lottery',
    title: 'Weekly Lucky Draw!',
    description: 'You have been entered into the Friday Mega Lucky Draw. Stay tuned!',
    time: '1d ago',
    icon: 'ticket',
    iconColor: '#3182CE',
    iconBg: '#EBF8FF',
  },
];

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
    }, 700);

    return () => clearTimeout(timer);
  }, [selectedFilter]);

  // Filter notifications based on selected chip
  const filteredNotifications = selectedFilter === 'All' 
    ? ALL_NOTIFICATIONS 
    : ALL_NOTIFICATIONS.filter(item => item.category === selectedFilter);

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

        {/* Content Area */}
        <ScrollView 
          contentContainerStyle={styles.contentBody}
          showsVerticalScrollIndicator={false}
        >
          {isLoading ? (
            <View style={styles.centerContainer}>
              <ActivityIndicator size="large" color={ThemeColors.headerBg} />
            </View>
          ) : filteredNotifications.length > 0 ? (
            <View style={styles.listContainer}>
              {filteredNotifications.map((item) => (
                <View key={item.id} style={styles.notificationCard}>
                  <View style={[styles.notifIconBox, { backgroundColor: item.iconBg }]}>
                    <Ionicons name={item.icon} size={22} color={item.iconColor} />
                  </View>
                  <View style={styles.notifContent}>
                    <Text style={styles.notifTitle}>{item.title}</Text>
                    <Text style={styles.notifDesc}>{item.description}</Text>
                    <Text style={styles.notifTime}>{item.time}</Text>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.centerContainer}>
              <View style={styles.emptyIconContainer}>
                <Ionicons name="time-outline" size={54} color="#A0AEC0" />
              </View>
              <Text style={styles.emptyText}>No notifications in this filter</Text>
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
    paddingBottom: 70,
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
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 22,
    marginRight: 10,
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
    fontSize: 13,
    fontWeight: '600',
  },
  activeChipText: {
    color: ThemeColors.white,
  },
  inactiveChipText: {
    color: ThemeColors.chipInactiveText,
  },
  contentBody: {
    padding: 16,
    flexGrow: 1,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 650, // Tablets aur bade screens par content centered aur readable rahega
  },
  listContainer: {
    width: '100%',
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: ThemeColors.cardBg,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: ThemeColors.cardBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  notifIconBox: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notifContent: {
    flex: 1,
  },
  notifTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: ThemeColors.textDark,
    marginBottom: 3,
  },
  notifDesc: {
    fontSize: 12.5,
    color: ThemeColors.textMuted,
    lineHeight: 18,
    marginBottom: 6,
  },
  notifTime: {
    fontSize: 11,
    color: '#A0AEC0',
    fontWeight: '500',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
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