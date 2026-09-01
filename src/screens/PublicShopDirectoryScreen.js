import React, { useState, useCallback } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  StatusBar, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Platform,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useResponsiveLayout } from '../utils/responsive';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const ThemeColors = {
  primaryDark: '#054A29',
  screenBg: '#F4F7F5',
  cardBg: '#FFFFFF',
  textDark: '#1A202C',
  textMuted: '#4A5568',
  textSubDark: '#718096',
  white: '#FFFFFF',
  borderLight: '#E2E8F0',
};

const initialShopsData = [
  {
    id: '1',
    name: 'Ayesha General Store',
    owner: 'Ayesha Khalid',
    phone: '03001234567',
    location: 'Multan, Punjab',
    description: 'General grocery and daily use items',
    date: '31 Jul 2026',
  },
  {
    id: '2',
    name: 'Mahar',
    owner: 'Jahanzaib',
    phone: '03076341312',
    location: 'bahawalpur',
    description: 'Come on my shop',
    date: '03 Aug 2026',
  },
  {
    id: '3',
    name: 'New pehnawah shoping sinter',
    owner: 'Muhammad kashif mushtaq',
    phone: '03017924152',
    location: 'resham bazar hasilpur',
    description: 'resham bazar hasilpur',
    date: '05 Aug 2026',
  },
];

const PublicShopDirectoryScreen = ({ navigation }) => {
  const { width, containerMaxWidth } = useResponsiveLayout();
  const [searchQuery, setSearchQuery] = useState('');
  const [shopsList, setShopsList] = useState(initialShopsData);

  // Screen focus par saved shops load karein
  useFocusEffect(
    useCallback(() => {
      const loadShops = async () => {
        try {
          const storedShops = await AsyncStorage.getItem('allRegisteredShops');
          if (storedShops) {
            const parsedShops = JSON.parse(storedShops);
            // Initial shops aur AsyncStorage wali shops ko combine kar ke set kardein
            // Duplicate IDs se bachne ke liye merge logic
            const allShopsMap = new Map();
            
            // Pehle stored shops dalein taake naye register hone wale oopar rahein
            parsedShops.forEach(shop => allShopsMap.set(shop.id, shop));
            initialShopsData.forEach(shop => {
              if (!allShopsMap.has(shop.id)) {
                allShopsMap.set(shop.id, shop);
              }
            });

            setShopsList(Array.from(allShopsMap.values()));
          }
        } catch (error) {
          console.log('Error loading saved shops:', error);
        }
      };

      loadShops();
    }, [])
  );

  const filteredShops = shopsList.filter((shop) => 
    shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shop.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shop.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={ThemeColors.primaryDark} />

      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={22} color={ThemeColors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Public Shop Directory</Text>
      </View>

      <View style={[styles.responsiveWrapper, { maxWidth: containerMaxWidth === '100%' ? '100%' : containerMaxWidth }]}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search shops by name, location or type"
              placeholderTextColor="#A0AEC0"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <Ionicons name="search" size={20} color={ThemeColors.primaryDark} style={styles.searchIcon} />
          </View>

          {/* Shop Cards List */}
          {filteredShops.map((shop) => (
            <View key={shop.id} style={styles.shopCard}>
              
              {/* Card Top Row */}
              <View style={styles.shopCardTop}>
                <View style={styles.shopIconContainer}>
                  <MaterialCommunityIcons name="storefront" size={28} color={ThemeColors.primaryDark} />
                </View>
                <View style={styles.shopTitleContainer}>
                  <Text style={styles.shopName}>{shop.name}</Text>
                  <Text style={styles.shopOwner}>Owned by {shop.owner}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              {/* Details Rows */}
              <View style={styles.detailRow}>
                <View style={styles.detailIconWrapper}>
                  <Ionicons name="call-outline" size={16} color={ThemeColors.primaryDark} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.detailLabel}>Phone</Text>
                  <Text style={styles.detailValue}>{shop.phone}</Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailIconWrapper}>
                  <Ionicons name="location-outline" size={16} color={ThemeColors.primaryDark} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.detailLabel}>Location</Text>
                  <Text style={styles.detailValue}>{shop.location}</Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailIconWrapper}>
                  <Ionicons name="document-text-outline" size={16} color={ThemeColors.primaryDark} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.detailLabel}>Description</Text>
                  <Text style={styles.detailValue}>{shop.description}</Text>
                </View>
              </View>

              {/* Registered Date Footer */}
              <Text style={styles.registeredDate}>Registered on {shop.date}</Text>

            </View>
          ))}

        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.primaryDark,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: ThemeColors.primaryDark,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: ThemeColors.white,
  },
  responsiveWrapper: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: ThemeColors.screenBg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ThemeColors.white,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 50,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: ThemeColors.borderLight,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: ThemeColors.textDark,
    fontWeight: '500',
    ...(Platform.OS === 'web' ? { outlineStyle: 'none' } : {}),
  },
  searchIcon: {
    marginLeft: 8,
  },
  shopCard: {
    backgroundColor: ThemeColors.cardBg,
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: ThemeColors.borderLight,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  shopCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  shopIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  shopTitleContainer: {
    flex: 1,
  },
  shopName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: ThemeColors.textDark,
  },
  shopOwner: {
    fontSize: 12,
    color: ThemeColors.textSubDark,
    fontWeight: '500',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: ThemeColors.borderLight,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  detailIconWrapper: {
    width: 24,
    alignItems: 'center',
    marginRight: 8,
    marginTop: 1,
  },
  detailLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: ThemeColors.textSubDark,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: ThemeColors.textDark,
    marginTop: 1,
  },
  registeredDate: {
    fontSize: 10,
    color: '#A0AEC0',
    fontWeight: '500',
    marginTop: 6,
    textAlign: 'right',
  },
});

export default PublicShopDirectoryScreen;