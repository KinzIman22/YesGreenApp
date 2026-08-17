import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  StatusBar, 
  TouchableOpacity, 
  ScrollView,
  Switch,
  Modal,
  Dimensions
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather, FontAwesome } from '@expo/vector-icons';
import { useResponsiveLayout } from '../utils/responsive';

const { width } = Dimensions.get('window');

const ThemeColors = {
  primaryDark: '#0B4734',
  screenBg: '#F8FAFC',
  cardBg: '#FFFFFF',
  textDark: '#1A202C',
  textMuted: '#718096',
  white: '#FFFFFF',
  borderColor: '#E2E8F0',
};

export default function ProfileScreen({ navigation, route }) {
  const { containerMaxWidth } = useResponsiveLayout();
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isPhoneModalVisible, setIsPhoneModalVisible] = useState(false);

  const userData = route?.params?.userData || {
    name: 'Kinz Ul Iman',
    identifier: '+92 300 1234567',
  };

  const contentWidthStyle = {
    width: '100%',
    maxWidth: containerMaxWidth || 600,
    alignSelf: 'center',
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={ThemeColors.primaryDark} />

      <ScrollView 
        contentContainerStyle={[styles.scrollContent, contentWidthStyle]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <FontAwesome name="star" size={14} color="#EAB308" style={[styles.starIcon, { top: 15, left: width * 0.15 }]} />
          <FontAwesome name="star" size={10} color="#EAB308" style={[styles.starIcon, { top: 25, left: width * 0.3 }]} />
          <FontAwesome name="star" size={16} color="#EAB308" style={[styles.starIcon, { top: 40, right: width * 0.25 }]} />
          <FontAwesome name="star" size={14} color="#6EE7B7" style={[styles.starIcon, { bottom: 60, left: width * 0.1 }]} />
          
          <View style={[styles.decoCircle, { top: 12, right: width * 0.18, width: 36, height: 36, borderColor: '#EAB308' }]}>
            <Text style={{color: '#EAB308', fontSize: 11, fontWeight: 'bold'}}>2</Text>
          </View>
          <View style={[styles.decoCircle, { top: 38, right: width * 0.06, width: 44, height: 44, borderColor: '#EAB308' }]}>
            <Text style={{color: '#EAB308', fontSize: 14, fontWeight: 'bold'}}>7</Text>
          </View>
          <View style={[styles.decoCircle, { bottom: 45, right: width * 0.22, width: 30, height: 30, borderColor: '#6EE7B7' }]}>
            <Text style={{color: '#6EE7B7', fontSize: 10, fontWeight: 'bold'}}>4</Text>
          </View>

          <View style={styles.headerContent}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarOutline}>
                <View style={styles.avatarInner}>
                  <Ionicons name="person" size={38} color={ThemeColors.white} />
                </View>
              </View>
            </View>

            <View style={styles.userInfoContainer}>
              <Text style={styles.userName}>{userData.name}</Text>
              <Text style={styles.userIdentifier}>{userData.identifier}</Text>
            </View>
          </View>
        </View>

        {/* Main Content Card Container */}
        <View style={styles.mainContentWrapper}>
          
          {/* Account & Security Card */}
          <View style={styles.card}>
            <View style={styles.sectionHeaderRow}>
              <View style={styles.sectionIconBoxLightRed}>
                <Ionicons name="shield-outline" size={18} color="#E53E3E" />
              </View>
              <Text style={styles.sectionHeaderTitle}>Account & Security</Text>
            </View>

            <TouchableOpacity 
              style={styles.menuRow} 
              activeOpacity={0.8} 
              onPress={() => setIsPhoneModalVisible(true)}
            >
              <View style={styles.menuIconBoxOrange}>
                <Ionicons name="shield-checkmark-outline" size={18} color="#DD6B20" />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>Phone Verified</Text>
                <Text style={styles.menuSubtitle}>Complete phone verification</Text>
              </View>
              <Switch
                trackColor={{ false: '#E2E8F0', true: '#48BB78' }}
                thumbColor={'#FFFFFF'}
                ios_backgroundColor="#E2E8F0"
                onValueChange={() => setIsPhoneVerified(!isPhoneVerified)}
                value={isPhoneVerified}
              />
            </TouchableOpacity>

            <View style={styles.divider} />

          <TouchableOpacity 
  style={styles.menuRow} 
  activeOpacity={0.7}
  onPress={() => navigation.navigate('UpdateProfile')}
>
  <View style={styles.menuIconBoxGreen}>
    <Feather name="edit-2" size={16} color="#2F855A" />
  </View>
  <View style={styles.menuTextContainer}>
    <Text style={styles.menuTitle}>Update Profile</Text>
    <Text style={styles.menuSubtitle}>Change your name, email or photo</Text>
  </View>
  <Ionicons name="chevron-forward" size={18} color="#A0AEC0" />
</TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.menuRow} activeOpacity={0.7}>
              <View style={styles.menuIconBoxBlue}>
                <Ionicons name="lock-closed-outline" size={16} color="#3182CE" />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>Change Password / PIN</Text>
                <Text style={styles.menuSubtitle}>Keep account safe</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#A0AEC0" />
            </TouchableOpacity>
          </View>

          {/* Language Selection Card */}
          <View style={styles.card}>
            <View style={styles.sectionHeaderRow}>
              <View style={styles.sectionIconBoxLightBlue}>
                <Ionicons name="globe-outline" size={18} color="#2B6CB0" />
              </View>
              <Text style={styles.sectionHeaderTitle}>Language</Text>
            </View>

            <View style={styles.languageButtonsRow}>
              <TouchableOpacity 
                style={[styles.langBtn, selectedLanguage === 'English' && styles.activeLangBtn]}
                onPress={() => setSelectedLanguage('English')}
                activeOpacity={0.8}
              >
                <Text style={[styles.langBtnText, selectedLanguage === 'English' && styles.activeLangBtnText]}>
                  English
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.langBtn, selectedLanguage === 'Urdu' && styles.activeLangBtn]}
                onPress={() => setSelectedLanguage('Urdu')}
                activeOpacity={0.8}
              >
                <Text style={[styles.langBtnText, selectedLanguage === 'Urdu' && styles.activeLangBtnText]}>
                  اردو
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Support & Legal Card */}
          <View style={styles.card}>
            <View style={styles.sectionHeaderRow}>
              <View style={styles.sectionIconBoxLightPurple}>
                <Ionicons name="help-circle-outline" size={18} color="#805AD5" />
              </View>
              <Text style={styles.sectionHeaderTitle}>Support & Legal</Text>
            </View>

            <TouchableOpacity style={styles.menuRow} activeOpacity={0.7}>
              <View style={styles.menuIconBoxLightPurple}>
                <Ionicons name="help-circle-outline" size={18} color="#805AD5" />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>Help Center</Text>
                <Text style={styles.menuSubtitle}>FAQ and support</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#A0AEC0" />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.menuRow} activeOpacity={0.7}>
              <View style={styles.menuIconBoxLightBlue}>
                <Ionicons name="shield-outline" size={18} color="#3182CE" />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>Privacy Policy</Text>
                <Text style={styles.menuSubtitle}>Data and permissions</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#A0AEC0" />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.menuRow} activeOpacity={0.7}>
              <View style={styles.menuIconBoxNavy}>
                <MaterialCommunityIcons name="file-document-outline" size={18} color="#2C5282" />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>Terms & Conditions</Text>
                <Text style={styles.menuSubtitle}>Platform terms</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#A0AEC0" />
            </TouchableOpacity>
          </View>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.8}>
            <Ionicons name="log-out-outline" size={20} color="#2C5282" style={{ marginRight: 8 }} />
            <Text style={styles.logoutBtnText}>Logout</Text>
          </TouchableOpacity>

          {/* Delete Account Button */}
          <TouchableOpacity style={styles.deleteAccountBtn} activeOpacity={0.8}>
            <Ionicons name="trash-outline" size={20} color="#E53E3E" style={{ marginRight: 8 }} />
            <Text style={styles.deleteAccountText}>Delete Account</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>

      {/* Phone Verification Modal Popup */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isPhoneModalVisible}
        onRequestClose={() => setIsPhoneModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            
            {/* Top Shield Icon */}
            <View style={styles.modalIconBox}>
              <Ionicons name="shield-checkmark" size={28} color="#DD6B20" />
            </View>

            {/* Title */}
            <Text style={styles.modalTitle}>Phone Verified</Text>

            {/* Description */}
            <Text style={styles.modalDescription}>
              Your phone number is not verified yet. Please complete phone verification to secure your account and enable all features.
            </Text>

            {/* OK Button */}
            <TouchableOpacity 
              style={styles.modalOkBtn} 
              activeOpacity={0.85}
              onPress={() => setIsPhoneModalVisible(false)}
            >
              <Text style={styles.modalOkBtnText}>OK</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.primaryDark,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 110,
  },
  header: {
    width: '100%',
    backgroundColor: ThemeColors.primaryDark,
    paddingTop: 15,
    paddingBottom: 45,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  starIcon: {
    position: 'absolute',
    opacity: 0.85,
  },
  decoCircle: {
    position: 'absolute',
    borderRadius: 50,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.65,
  },
  headerContent: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  avatarContainer: {
    marginBottom: 10,
  },
  avatarOutline: {
    width: 78,
    height: 78,
    borderRadius: 39,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfoContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 12,
  },
  userName: {
    fontSize: 15.5,
    fontWeight: 'bold',
    color: ThemeColors.white,
    marginBottom: 2,
    textAlign: 'center',
  },
  userIdentifier: {
    fontSize: 12,
    color: '#E2E8F0',
    fontWeight: '500',
    textAlign: 'center',
  },
  mainContentWrapper: {
    flex: 1,
    backgroundColor: ThemeColors.screenBg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: ThemeColors.cardBg,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: ThemeColors.borderColor,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionHeaderTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2D3748',
  },
  sectionIconBoxLightRed: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#FFF5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  sectionIconBoxLightBlue: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#EBF8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  sectionIconBoxLightPurple: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#FAF5FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  menuIconBoxOrange: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#FFFAF0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  menuIconBoxGreen: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F0FFF4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  menuIconBoxBlue: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#EBF8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  menuIconBoxLightPurple: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#FAF5FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  menuIconBoxLightBlue: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#EBF8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  menuIconBoxNavy: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#EBF4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2D3748',
  },
  menuSubtitle: {
    fontSize: 11.5,
    color: ThemeColors.textMuted,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: ThemeColors.borderColor,
    marginVertical: 4,
    marginLeft: 54,
  },
  languageButtonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  langBtn: {
    flex: 1,
    height: 46,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeLangBtn: {
    backgroundColor: '#F0FFF4',
    borderColor: '#2F855A',
  },
  langBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#718096',
  },
  activeLangBtnText: {
    color: '#2F855A',
    fontWeight: '700',
  },
  logoutBtn: {
    flexDirection: 'row',
    height: 52,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#CBD5E0',
    backgroundColor: '#F7FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  logoutBtnText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2C5282',
  },
  deleteAccountBtn: {
    flexDirection: 'row',
    height: 52,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#FEB2B2',
    backgroundColor: '#FFF5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  deleteAccountText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#E53E3E',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  modalIconBox: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: '#FFFAF0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A202C',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 13.5,
    color: '#4A5568',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  modalOkBtn: {
    width: '100%',
    height: 50,
    borderRadius: 14,
    backgroundColor: '#DD6B20',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#DD6B20',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  modalOkBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});