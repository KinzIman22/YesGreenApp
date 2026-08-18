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
import { useResponsiveLayout } from '../utils/responsive';

const ThemeColors = {
  headerBg: '#5B21B6', // Purple theme matching the screenshot
  screenBg: '#F3F4F6',
  textDark: '#4B5563', // Muted dark for the empty message text
  white: '#FFFFFF',
};

export default function MyPrizesScreen({ navigation }) {
  const { width, containerMaxWidth } = useResponsiveLayout();

  const isConstrained = containerMaxWidth !== '100%';
  const maxContentWidth = isConstrained ? containerMaxWidth : width;
  const CONTAINER_WIDTH = maxContentWidth - 32;

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
          <Text style={styles.headerTitle}>My prizes</Text>
        </View>

        {/* Body Content */}
        <View style={styles.bodyContent}>
          <View style={[styles.messageContainer, { width: CONTAINER_WIDTH }]}>
            <Text style={styles.emptyText}>No wins yet — keep spinning!</Text>
          </View>
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
  bodyContent: {
    flex: 1,
    backgroundColor: ThemeColors.screenBg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
    alignItems: 'center',
  },
  messageContainer: {
    alignSelf: 'center',
    paddingTop: 10,
  },
  emptyText: {
    fontSize: 14,
    color: ThemeColors.textDark,
    fontWeight: '500',
  },
});