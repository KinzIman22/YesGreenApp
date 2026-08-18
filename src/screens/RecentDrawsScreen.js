import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useResponsiveLayout } from '../utils/responsive';

const ThemeColors = {
  headerBg: '#5B21B6',
  screenBg: '#F3F4F6',
  cardBg: '#FFFFFF',
  textDark: '#1F2937',
  textMuted: '#6B7280',
  white: '#FFFFFF',
  purplePrimary: '#5B21B6',
};

export default function RecentDrawsScreen({ navigation }) {
  const { width, containerMaxWidth } = useResponsiveLayout();

  const isConstrained = containerMaxWidth !== '100%';
  const maxContentWidth = isConstrained ? containerMaxWidth : width;
  const CONTAINER_WIDTH = maxContentWidth - 32;

  // 30 Recent Draws list
  const recentDrawsList = Array.from({ length: 30 }, (_, index) => {
    const drawNumber = 76372 - index;
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    const minute = 47 - (index * 2);
    const formattedMinute = minute < 10 ? `0${Math.max(minute, 0)}` : Math.max(minute, 0);

    return {
      id: (index + 1).toString(),
      title: `Qur'a Andazi #${drawNumber}`,
      date: `18/8/2026 09:${formattedMinute}`,
      number: randomCode.toString(),
      players: "0 players",
    };
  });

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
          <Text style={styles.headerTitle}>Recent draws</Text>
        </View>

        {/* Scrollable Content */}
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.scrollInnerWrapper}>
            {recentDrawsList.map((item) => (
              <View 
                key={item.id} 
                style={[styles.drawCard, { width: CONTAINER_WIDTH }]}
              >
                {/* Left side: Icon + Details */}
                <View style={styles.cardLeftSection}>
                  <View style={styles.iconBox}>
                    <MaterialCommunityIcons name="dice-multiple-outline" size={20} color={ThemeColors.purplePrimary} />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.drawTitle} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.drawDate} numberOfLines={1}>{item.date}</Text>
                  </View>
                </View>

                {/* Right side: Winning Number + Players */}
                <View style={styles.cardRightSection}>
                  <Text style={styles.drawNumber} numberOfLines={1}>{item.number}</Text>
                  <Text style={styles.drawPlayers} numberOfLines={1}>{item.players}</Text>
                </View>
              </View>
            ))}
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
    width: 38,
    height: 38,
    borderRadius: 12,
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
    backgroundColor: ThemeColors.screenBg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    minHeight: '100%',
  },
  scrollInnerWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  drawCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: ThemeColors.cardBg,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardLeftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    flexShrink: 0,
  },
  textContainer: {
    flex: 1,
  },
  drawTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: ThemeColors.textDark,
  },
  drawDate: {
    fontSize: 11,
    color: ThemeColors.textMuted,
    marginTop: 2,
  },
  cardRightSection: {
    alignItems: 'flex-end',
    flexShrink: 0,
  },
  drawNumber: {
    fontSize: 15,
    fontWeight: 'bold',
    color: ThemeColors.purplePrimary,
  },
  drawPlayers: {
    fontSize: 11,
    color: ThemeColors.textMuted,
    marginTop: 2,
  },
});