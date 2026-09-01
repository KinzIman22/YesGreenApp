import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  StatusBar, 
  TouchableOpacity, 
  ScrollView,
  TextInput,
  Modal,
  Image,
  Animated,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeColors = {
  primaryDark: '#054A29',
  screenBg: '#EEF2F0',
  buttonGreen: '#044223',
  accentYellow: '#F3C649',
  accentGold: '#E6B800',
  starGrey: 'rgba(255, 255, 255, 0.75)',
  coinBase: '#E5B132',
  coinText: '#5C4300',
  white: '#FFFFFF',
  black: '#000000',
  cardBg: '#FFFFFF',
  inputBg: '#F8F9FA',
  inputBorder: '#E2E8F0',
  iconGrey: '#718096',
  placeholderText: '#A0AEC0',
  textDark: '#1A202C',
  textMuted: '#718096',
  forgotText: '#0B663B',
};

const SHOP_TYPES = [
  "Cosmetics",
  "General Store / Grocery",
  "Clothing & Apparel",
  "Pharmacy & Medical",
  "Mobile & Electronics",
  "Bakery & Sweets",
  "Footwear Store",
  "Stationery & Bookstore",
  "Hardware & Sanitary",
  "Perfumes & Fragrances"
];

export default function RegisterShopScreen({ navigation }) {
  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);

  React.useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setWindowWidth(window.width);
    });
    return () => subscription?.remove();
  }, []);

  const isLargeScreen = windowWidth > 768;
  const contentMaxWidth = isLargeScreen ? 600 : '100%';
  const horizontalPadding = isLargeScreen ? 24 : 16;

  const [shopName, setShopName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [shopType, setShopType] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const [isShopTypeModalVisible, setIsShopTypeModalVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [toastAnim] = useState(new Animated.Value(0));

  const showToast = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
    Animated.timing(toastAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(toastAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setToastVisible(false);
      });
    }, 2500);
  };

  const handleRegister = async () => {
    if (!shopName.trim() || !ownerName.trim() || !phoneNumber.trim() || !shopType.trim() || !address.trim() || !description.trim()) {
      showToast('Please fill in all fields!', 'error');
      return;
    }

    try {
      setLoading(true);

      // Local storage ke liye shop data object
      const newShopData = {
        id: Date.now().toString(),
        name: shopName.trim(),
        owner: ownerName.trim(),
        phone: phoneNumber.trim(),
        location: address.trim(),
        description: description.trim(),
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      };

      // AsyncStorage mein save karein taake PublicShopDirectoryScreen par nazar aaye
      const existingShops = await AsyncStorage.getItem('allRegisteredShops');
      const shopsArray = existingShops ? JSON.parse(existingShops) : [];
      shopsArray.unshift(newShopData);
      await AsyncStorage.setItem('allRegisteredShops', JSON.stringify(shopsArray));

      showToast('Shop Registered Successfully!', 'success');
      
      // Clear form inputs
      setShopName('');
      setOwnerName('');
      setPhoneNumber('');
      setShopType('');
      setAddress('');
      setDescription('');

      // Navigate back after a short delay
      setTimeout(() => {
        navigation.goBack();
      }, 1500);

    } catch (error) {
      console.log('Register shop error:', error);
      showToast('Failed to register shop. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={ThemeColors.primaryDark} />

      {/* Top Section */}
      <View style={styles.topSection}>
        <TouchableOpacity 
          style={styles.backButton} 
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={ThemeColors.white} />
        </TouchableOpacity>

        {/* Background Stars & Dots */}
        <Text style={[styles.starGold, { top: 12, left: 18, fontSize: 18 }]}>★</Text>
        <Text style={[styles.starGrey, { top: 15, left: 110, fontSize: 13 }]}>★</Text>
        <Text style={[styles.starGold, { bottom: 18, left: 22, fontSize: 16 }]}>★</Text>
        <Text style={[styles.starGold, { top: 18, right: 150, fontSize: 12 }]}>★</Text>
        <Text style={[styles.starGrey, { top: 75, right: 25, fontSize: 15 }]}>★</Text>
        <Text style={[styles.starGold, { bottom: 20, right: 18, fontSize: 14 }]}>★</Text>

        <View style={[styles.dotGold, { top: 38, left: 65 }]} />
        <View style={[styles.dotGrey, { top: 70, left: 20 }]} />
        <View style={[styles.dotGold, { top: 110, left: 75 }]} />
        <View style={[styles.dotGrey, { top: 32, right: 100 }]} />
        <View style={[styles.dotGold, { top: 115, right: 55 }]} />

        <View style={[styles.numberBadgeSmall, styles.badge2]}>
          <Text style={styles.badgeTextSmall}>2</Text>
        </View>
        <View style={[styles.numberBadge, styles.badge7]}>
          <Text style={styles.badgeText}>7</Text>
        </View>
        <View style={[styles.numberBadgeSmall, styles.badge4]}>
          <Text style={styles.badgeTextSmall}>4</Text>
        </View>

        <View style={styles.coinStack}>
          <View style={[styles.coin, styles.topCoin]}>
            <Text style={styles.coinText}>PKR</Text>
          </View>
          <View style={styles.coin} />
          <View style={styles.coin} />
          <View style={styles.coin} />
        </View>

        <View style={styles.headerContent}>
          <Image
            source={require('../assets/LoginLogo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.brandTitle}>
            YesTime <Text style={styles.brandTitleGold}>Plus</Text>
          </Text>
          <Text style={styles.brandSubtitle}>Register Your Shop</Text>
        </View>
      </View>

      {/* Main Content Scrollable Card */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer, 
          { paddingHorizontal: horizontalPadding }
        ]}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={[styles.floatingCard, { width: '100%', maxWidth: contentMaxWidth, alignSelf: 'center' }]}>
          <Text style={styles.welcomeTitle}>Shop Details</Text>
          <Text style={styles.welcomeSubtitle}>
            Rs. 1500 minimum wallet balance is required to register
          </Text>

          {/* Shop Name */}
          <Text style={styles.inputLabel}>Shop Name</Text>
          <View style={styles.inputWrapper}>
            <MaterialCommunityIcons name="storefront-outline" size={18} color={ThemeColors.iconGrey} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter Shop Name"
              placeholderTextColor={ThemeColors.placeholderText}
              value={shopName}
              onChangeText={setShopName}
            />
          </View>

          {/* Owner Name */}
          <Text style={styles.inputLabel}>Owner Name</Text>
          <View style={styles.inputWrapper}>
            <Feather name="user" size={18} color={ThemeColors.iconGrey} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter Owner Name"
              placeholderTextColor={ThemeColors.placeholderText}
              value={ownerName}
              onChangeText={setOwnerName}
            />
          </View>

          {/* Phone Number */}
          <Text style={styles.inputLabel}>Phone Number</Text>
          <View style={styles.inputWrapper}>
            <Feather name="phone" size={18} color={ThemeColors.iconGrey} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter Phone Number"
              placeholderTextColor={ThemeColors.placeholderText}
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>

          {/* Shop Type Dropdown */}
          <Text style={styles.inputLabel}>Shop Type</Text>
          <TouchableOpacity 
            style={styles.dropdownContainer}
            activeOpacity={0.8}
            onPress={() => setIsShopTypeModalVisible(true)}
          >
            <Ionicons name="grid-outline" size={18} color={ThemeColors.iconGrey} style={styles.inputIcon} />
            <Text style={[styles.textInput, { lineHeight: 22 }, !shopType && { color: ThemeColors.placeholderText }]}>
              {shopType || "Select Shop Type"}
            </Text>
            <Ionicons name="chevron-down" size={18} color={ThemeColors.iconGrey} />
          </TouchableOpacity>

          {/* Address */}
          <Text style={styles.inputLabel}>Address</Text>
          <View style={styles.inputWrapper}>
            <Feather name="map-pin" size={18} color={ThemeColors.iconGrey} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter shop address"
              placeholderTextColor={ThemeColors.placeholderText}
              value={address}
              onChangeText={setAddress}
            />
          </View>

          {/* Description */}
          <Text style={styles.inputLabel}>Description</Text>
          <View style={[styles.inputWrapper, styles.textAreaWrapper]}>
            <MaterialCommunityIcons name="file-document-outline" size={18} color={ThemeColors.iconGrey} style={[styles.inputIcon, { alignSelf: 'flex-start', marginTop: 12 }]} />
            <TextInput
              style={[styles.textInput, styles.textAreaInput]}
              placeholder="Enter shop description"
              placeholderTextColor={ThemeColors.placeholderText}
              multiline={true}
              numberOfLines={4}
              value={description}
              onChangeText={setDescription}
            />
          </View>

          {/* Register Button */}
          <TouchableOpacity 
            style={styles.loginBtn} 
            activeOpacity={0.8}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color={ThemeColors.white} />
            ) : (
              <Text style={styles.loginBtnText}>Register Shop</Text>
            )}
          </TouchableOpacity>

          {/* Go Back Link */}
          <TouchableOpacity 
            style={styles.footerRow} 
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={16} color={ThemeColors.forgotText} style={{ marginRight: 6 }} />
            <Text style={styles.signUpText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Toast Notification */}
      {toastVisible && (
        <Animated.View 
          style={[
            styles.toastContainer, 
            toastType === 'error' ? styles.toastErrorContainer : styles.toastSuccessContainer,
            { 
              opacity: toastAnim,
              transform: [{
                translateY: toastAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-20, 0]
                })
              }]
            }
          ]}
        >
          <View style={styles.toastIconBox}>
            <Ionicons 
              name={toastType === 'error' ? "alert-circle" : "checkmark-circle"} 
              size={22} 
              color={toastType === 'error' ? "#C53030" : "#2F855A"} 
            />
          </View>
          <Text style={[styles.toastText, toastType === 'error' ? styles.toastErrorText : styles.toastSuccessText]}>
            {toastMessage}
          </Text>
        </Animated.View>
      )}

      {/* Shop Type Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isShopTypeModalVisible}
        onRequestClose={() => setIsShopTypeModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalHeaderTitle}>Select Shop Type</Text>
              <TouchableOpacity onPress={() => setIsShopTypeModalVisible(false)}>
                <Ionicons name="close" size={22} color={ThemeColors.textDark} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {SHOP_TYPES.map((item, index) => {
                const isSelected = shopType === item;
                return (
                  <TouchableOpacity 
                    key={index}
                    style={styles.modalItemRow}
                    activeOpacity={0.7}
                    onPress={() => {
                      setIsShopTypeModalVisible(false);
                      setTimeout(() => {
                        setShopType(item);
                      }, 100);
                    }}
                  >
                    <Text style={[styles.modalItemText, isSelected && styles.selectedModalItemText]}>
                      {item}
                    </Text>
                    {isSelected && (
                      <Ionicons name="checkmark" size={18} color={ThemeColors.primaryDark} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.screenBg,
  },
  topSection: {
    height: 220,
    backgroundColor: ThemeColors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 15,
    left: 16,
    zIndex: 20,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  starGold: { position: 'absolute', color: ThemeColors.accentYellow, opacity: 0.95 },
  starGrey: { position: 'absolute', color: ThemeColors.starGrey, opacity: 0.85 },
  dotGold: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: ThemeColors.accentYellow,
    opacity: 0.9,
  },
  dotGrey: {
    position: 'absolute',
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: ThemeColors.starGrey,
    opacity: 0.8,
  },
  headerContent: { alignItems: 'center', marginTop: 10 },
  logoImage: { width: 60, height: 60, marginBottom: 6 },
  brandTitle: { fontSize: 22, fontWeight: 'bold', color: ThemeColors.white },
  brandTitleGold: { color: ThemeColors.accentYellow },
  brandSubtitle: { fontSize: 12, color: ThemeColors.white, opacity: 0.8, marginTop: 2 },
  numberBadge: {
    position: 'absolute',
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: ThemeColors.white,
    borderWidth: 2,
    borderColor: ThemeColors.accentGold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberBadgeSmall: {
    position: 'absolute',
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: ThemeColors.white,
    borderWidth: 1.5,
    borderColor: ThemeColors.accentGold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { fontWeight: 'bold', fontSize: 16, color: ThemeColors.black },
  badgeTextSmall: { fontWeight: 'bold', fontSize: 11, color: ThemeColors.black },
  badge2: { top: '12%', right: '28%' },
  badge7: { top: '18%', right: '12%' },
  badge4: { top: '42%', right: '5%' },
  coinStack: { position: 'absolute', left: '5%', top: '25%', alignItems: 'center' },
  coin: {
    width: 44,
    height: 10,
    backgroundColor: ThemeColors.coinBase,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: ThemeColors.accentGold,
    marginTop: -3,
  },
  topCoin: {
    height: 12,
    backgroundColor: ThemeColors.accentYellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coinText: { fontSize: 7, fontWeight: 'bold', color: ThemeColors.coinText },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 16,
    paddingBottom: 24,
    alignItems: 'center',
  },
  floatingCard: {
    backgroundColor: ThemeColors.cardBg,
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 32,
    elevation: 4,
    shadowColor: ThemeColors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  welcomeTitle: { fontSize: 24, fontWeight: 'bold', color: ThemeColors.textDark, marginBottom: 6 },
  welcomeSubtitle: { fontSize: 13, color: ThemeColors.textMuted, marginBottom: 20 },
  inputLabel: { fontSize: 13, fontWeight: 'bold', color: ThemeColors.textDark, marginBottom: 6, marginTop: 10 },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ThemeColors.inputBg,
    borderWidth: 1,
    borderColor: ThemeColors.inputBorder,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 50,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ThemeColors.inputBg,
    borderWidth: 1,
    borderColor: ThemeColors.inputBorder,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 50,
    justifyContent: 'space-between',
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: { flex: 1, fontSize: 14, color: ThemeColors.textDark },
  textAreaWrapper: {
    height: 100,
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  textAreaInput: {
    height: '100%',
    textAlignVertical: 'top',
  },
  loginBtn: {
    backgroundColor: ThemeColors.buttonGreen,
    borderRadius: 12,
    height: 48,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: ThemeColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginTop: 24,
  },
  loginBtnText: { color: ThemeColors.white, fontSize: 15, fontWeight: 'bold' },
  footerRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 },
  signUpText: { fontSize: 13, fontWeight: 'bold', color: ThemeColors.forgotText },
  toastContainer: {
    position: 'absolute',
    top: 40,
    alignSelf: 'center',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
    zIndex: 9999,
  },
  toastSuccessContainer: {
    backgroundColor: '#F0FFF4',
    borderColor: '#C6F6D5',
  },
  toastErrorContainer: {
    backgroundColor: '#FFF5F5',
    borderColor: '#FED7D7',
  },
  toastIconBox: {
    marginRight: 8,
  },
  toastText: {
    fontSize: 14,
    fontWeight: '700',
  },
  toastSuccessText: {
    color: '#22543D',
  },
  toastErrorText: {
    color: '#9B2C2C',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 360,
    maxHeight: '70%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  modalHeaderTitle: {
    fontSize: 16.5,
    fontWeight: '800',
    color: ThemeColors.textDark,
  },
  modalItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F7FAFC',
  },
  modalItemText: {
    fontSize: 14,
    color: ThemeColors.textMuted,
    fontWeight: '500',
    flex: 1,
  },
  selectedModalItemText: {
    color: ThemeColors.primaryDark,
    fontWeight: '700',
  },
});