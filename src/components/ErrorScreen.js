import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useResponsiveLayout } from '../utils/responsive';

export default function ErrorScreen({ onRetry, themeColor = '#4A148C' }) {
  const { containerMaxWidth } = useResponsiveLayout();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#F8F9FA' }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      
      <View style={[styles.responsiveWrapper, { maxWidth: containerMaxWidth === '100%' ? '100%' : containerMaxWidth }]}>
        <View style={styles.contentContainer}>
          
          {/* Icon Box with Dynamic Theme Background */}
          <View style={[styles.iconBox, { backgroundColor: `${themeColor}15` }]}>
            <Ionicons name="cloud-offline-outline" size={32} color={themeColor} />
          </View>

          {/* Title */}
          <Text style={styles.title}>Something went wrong</Text>
          
          {/* Subtitle */}
          <Text style={styles.subtitle}>Something went wrong. Please try again.</Text>

          {/* Try Again Button with Dynamic Theme Color */}
          <TouchableOpacity 
            style={[styles.retryButton, { backgroundColor: themeColor }]} 
            onPress={onRetry} 
            activeOpacity={0.8}
          >
            <Ionicons name="reload-outline" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text style={styles.retryText}>Try Again</Text>
          </TouchableOpacity>

        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  responsiveWrapper: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  contentContainer: {
    alignItems: 'center',
    width: '100%',
    paddingBottom: 40,
  },
  iconBox: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: '#4A5568',
    textAlign: 'center',
    marginBottom: 28,
  },
  retryButton: {
    flexDirection: 'row',
    width: '100%',
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  retryText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});