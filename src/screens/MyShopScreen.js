import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  StatusBar, 
  TouchableOpacity 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ThemeColors = {
  headerBg: '#5B21B6', // Purple theme as shown in image
  screenBg: '#F3F4F6',
  cardBg: '#FFFFFF',
  textDark: '#1F2937',
  textMuted: '#6B7280',
  white: '#FFFFFF',
};

export default function MyShopScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={ThemeColors.headerBg} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={22} color={ThemeColors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Purchase History</Text>
      </View>

      {/* Body Content */}
      <View style={styles.body}>
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <Ionicons name="receipt-outline" size={32} color="#9CA3AF" />
          </View>
          <Text style={styles.noPurchaseTitle}>No purchases yet</Text>
          <Text style={styles.noPurchaseSubtitle}>
            Show your coupon at a partner store to earn cashback.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.headerBg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: ThemeColors.headerBg,
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
  body: {
    flex: 1,
    backgroundColor: ThemeColors.screenBg,
    paddingHorizontal: 16,
    paddingTop: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  card: {
    backgroundColor: ThemeColors.cardBg,
    borderRadius: 20,
    paddingVertical: 35,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    marginBottom: 14,
  },
  noPurchaseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: ThemeColors.textDark,
    marginBottom: 6,
  },
  noPurchaseSubtitle: {
    fontSize: 12,
    color: ThemeColors.textMuted,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});