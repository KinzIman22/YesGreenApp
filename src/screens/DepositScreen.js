import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useResponsiveLayout } from '../utils/responsive'; // Import responsive helper

const ThemeColors = {
  primaryDark: '#054A29',
  cardBg: '#FFFFFF',
  textDark: '#1A202C',
  textMuted: '#718096',
  inputBg: '#FFFFFF',
  inputBorder: '#E2E8F0',
  chipBg: '#F0FDF4',
  chipBorder: '#C6F6D5',
  cardBorder: '#D1E7DD',
  selectedCardBg: '#F2F9F5',
  uploadBg: '#F2F9F5',
  buttonGreen: '#054A29',
  white: '#FFFFFF',
};

const quickAmounts = ['100', '500', '1000', '2500', '5000', '10000'];

const DepositScreen = ({ navigation, route }) => {
  const { isMobile } = useResponsiveLayout();

  const [amount, setAmount] = useState(
    route?.params?.amount ? String(route.params.amount) : ''
  );
  const [selectedMethod, setSelectedMethod] = useState('jazzcash');
  const [senderName, setSenderName] = useState('');
  const [bankName, setBankName] = useState('');
  const [transactionRef, setTransactionRef] = useState('');
  const [note, setNote] = useState('');
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    if (route?.params?.amount) {
      setAmount(String(route.params.amount));
    }
  }, [route?.params?.amount]);

  const resetForm = () => {
    setAmount('');
    setSelectedMethod('jazzcash');
    setSenderName('');
    setBankName('');
    setTransactionRef('');
    setNote('');
    setImageUri(null);
  };

  const showAlert = (title, message, onOk) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}: ${message}`);
      if (onOk) onOk();
    } else {
      Alert.alert(
        title,
        message,
        onOk ? [{ text: 'OK', onPress: onOk }] : [{ text: 'OK' }],
        { cancelable: false }
      );
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setImageUri(null);
  };

  const handleSubmit = () => {
    if (!amount) {
      showAlert('Error', 'Please enter an amount.');
      return;
    }
    if (!senderName) {
      showAlert('Error', 'Please enter sender name.');
      return;
    }
    if (!transactionRef) {
      showAlert('Error', 'Please enter transaction reference.');
      return;
    }

    showAlert(
      'Success',
      'Payment request submitted successfully!',
      () => resetForm()
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={ThemeColors.primaryDark} />

      <View style={styles.responsiveWrapper}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation?.goBack()}>
            <Ionicons name="chevron-back" size={24} color={ThemeColors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Money</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={[styles.mainCard, !isMobile && styles.desktopCardBorder]}>
            <View style={styles.subHeaderRow}>
              <View style={styles.walletIconBg}>
                <Ionicons name="wallet-outline" size={22} color={ThemeColors.primaryDark} />
              </View>
              <View style={styles.subHeaderTexts}>
                <Text style={styles.subTitle}>Manual Payment Request</Text>
                <Text style={styles.subDesc}>Upload screenshot after payment</Text>
              </View>
            </View>

            <Text style={styles.label}>Amount</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Enter amount"
                placeholderTextColor={ThemeColors.textMuted}
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
              />
            </View>

            <Text style={styles.label}>Quick Amount</Text>
            <View style={styles.quickAmountGrid}>
              {quickAmounts.map((item) => (
                <View key={item} style={[styles.chipWrapper, !isMobile && { width: '16.66%' }]}>
                  <TouchableOpacity
                    style={[
                      styles.quickAmountChip,
                      amount === item && styles.quickAmountChipSelected,
                    ]}
                    onPress={() => setAmount(item)}
                  >
                    <Text
                      style={[
                        styles.quickAmountText,
                        amount === item && styles.quickAmountTextSelected,
                      ]}
                      numberOfLines={1}
                    >
                      Rs. {item}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <Text style={styles.label}>Payment Method</Text>

            {/* JazzCash */}
            <TouchableOpacity
              style={[
                styles.methodCard,
                selectedMethod === 'jazzcash' && styles.methodCardSelected,
              ]}
              onPress={() => setSelectedMethod('jazzcash')}
            >
              <View style={styles.radioCircle}>
                {selectedMethod === 'jazzcash' && <View style={styles.radioInner} />}
              </View>
              <Image source={require('../assets/Jazzcash.png')} style={styles.methodLogo} resizeMode="contain" />
              <View style={styles.methodInfo}>
                <Text style={styles.methodTitle}>JazzCash</Text>
                <Text style={styles.methodNumber}>03017926802</Text>
                <Text style={styles.methodCompany}>YesTime pvt LTD</Text>
              </View>
            </TouchableOpacity>

            {/* EasyPaisa */}
            <TouchableOpacity
              style={[
                styles.methodCard,
                selectedMethod === 'easypaisa' && styles.methodCardSelected,
              ]}
              onPress={() => setSelectedMethod('easypaisa')}
            >
              <View style={styles.radioCircle}>
                {selectedMethod === 'easypaisa' && <View style={styles.radioInner} />}
              </View>
              <Image source={require('../assets/easypaisa.png')} style={styles.methodLogo} resizeMode="contain" />
              <View style={styles.methodInfo}>
                <Text style={styles.methodTitle}>Easypaisa</Text>
                <Text style={styles.methodNumber}>03017926802</Text>
                <Text style={styles.methodCompany}>YesTime pvt LTD</Text>
              </View>
            </TouchableOpacity>

            {/* UBL Bank */}
            <TouchableOpacity
              style={[
                styles.methodCard,
                selectedMethod === 'ubl' && styles.methodCardSelected,
              ]}
              onPress={() => setSelectedMethod('ubl')}
            >
              <View style={styles.radioCircle}>
                {selectedMethod === 'ubl' && <View style={styles.radioInner} />}
              </View>
              <Image source={require('../assets/UBL.png')} style={styles.methodLogo} resizeMode="contain" />
              <View style={styles.methodInfo}>
                <Text style={styles.methodTitle}>UBL Bank Transfer</Text>
                <Text style={styles.methodNumber}>03017926802</Text>
                <Text style={styles.methodCompany}>YesTime pvt LTD</Text>
              </View>
            </TouchableOpacity>

            <View style={!isMobile ? styles.rowGrid : null}>
              <View style={!isMobile ? styles.colHalf : null}>
                <Text style={styles.label}>Sender Name</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter sender name"
                    placeholderTextColor={ThemeColors.textMuted}
                    value={senderName}
                    onChangeText={setSenderName}
                  />
                </View>
              </View>

              <View style={!isMobile ? styles.colHalf : null}>
                <Text style={styles.label}>Bank Name</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter bank name"
                    placeholderTextColor={ThemeColors.textMuted}
                    value={bankName}
                    onChangeText={setBankName}
                  />
                </View>
              </View>
            </View>

            <Text style={styles.label}>Transaction Reference (TILL ID)</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Enter transaction reference"
                placeholderTextColor={ThemeColors.textMuted}
                value={transactionRef}
                onChangeText={setTransactionRef}
              />
            </View>

            <Text style={styles.label}>Note (optional)</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Add any note"
                placeholderTextColor={ThemeColors.textMuted}
                value={note}
                onChangeText={setNote}
              />
            </View>

            <Text style={styles.label}>Payment Screenshot</Text>
            <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
              {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.uploadedImage} resizeMode="cover" />
              ) : (
                <>
                  <View style={styles.cloudIconBg}>
                    <Ionicons name="cloud-upload-outline" size={26} color={ThemeColors.primaryDark} />
                  </View>
                  <Text style={styles.uploadTextTitle}>Tap to upload payment screenshot</Text>
                  <Text style={styles.uploadTextSub}>Gallery or Camera</Text>
                </>
              )}
            </TouchableOpacity>

            <View style={styles.imageActionRow}>
              <TouchableOpacity style={styles.actionBtn} onPress={removeImage}>
                <Feather name="trash-2" size={16} color={ThemeColors.textMuted} />
                <Text style={styles.actionBtnText}>Remove</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionBtn} onPress={pickImage}>
                <Ionicons name="folder-outline" size={16} color={ThemeColors.primaryDark} />
                <Text style={[styles.actionBtnText, { color: ThemeColors.primaryDark }]}>Choose file</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.submitBtnText}>Submit Payment Request</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.primaryDark,
  },
  responsiveWrapper: {
    flex: 1,
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    backgroundColor: ThemeColors.primaryDark,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 12 : 16,
    paddingBottom: 16,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: ThemeColors.white,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 60,
  },
  mainCard: {
    flex: 1,
    backgroundColor: ThemeColors.cardBg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
  },
  desktopCardBorder: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 20,
  },
  subHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  walletIconBg: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  subHeaderTexts: {
    flex: 1,
  },
  subTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: ThemeColors.textDark,
  },
  subDesc: {
    fontSize: 12,
    color: ThemeColors.textMuted,
    marginTop: 2,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: ThemeColors.textDark,
    marginBottom: 6,
    marginTop: 10,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: ThemeColors.inputBorder,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 46,
    justifyContent: 'center',
    backgroundColor: ThemeColors.inputBg,
  },
  textInput: {
    fontSize: 14,
    color: ThemeColors.textDark,
  },
  rowGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colHalf: {
    width: '48.5%',
  },
  quickAmountGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  chipWrapper: {
    width: '33.33%',
    paddingHorizontal: 4,
    marginBottom: 8,
  },
  quickAmountChip: {
    borderWidth: 1,
    borderColor: ThemeColors.cardBorder,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ThemeColors.chipBg,
  },
  quickAmountChipSelected: {
    backgroundColor: ThemeColors.primaryDark,
    borderColor: ThemeColors.primaryDark,
  },
  quickAmountText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: ThemeColors.primaryDark,
  },
  quickAmountTextSelected: {
    color: ThemeColors.white,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: ThemeColors.cardBorder,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    backgroundColor: ThemeColors.cardBg,
  },
  methodCardSelected: {
    backgroundColor: ThemeColors.selectedCardBg,
    borderColor: ThemeColors.primaryDark,
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: ThemeColors.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: ThemeColors.primaryDark,
  },
  methodLogo: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  methodInfo: {
    flex: 1,
  },
  methodTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: ThemeColors.textDark,
  },
  methodNumber: {
    fontSize: 12,
    fontWeight: '600',
    color: ThemeColors.primaryDark,
  },
  methodCompany: {
    fontSize: 11,
    color: ThemeColors.textMuted,
  },
  uploadBox: {
    height: 120,
    borderWidth: 1,
    borderColor: ThemeColors.cardBorder,
    borderRadius: 14,
    backgroundColor: ThemeColors.uploadBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    overflow: 'hidden',
  },
  cloudIconBg: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  uploadTextTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: ThemeColors.textDark,
  },
  uploadTextSub: {
    fontSize: 10,
    color: ThemeColors.textMuted,
    marginTop: 2,
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
  },
  imageActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  actionBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: ThemeColors.textMuted,
    marginLeft: 6,
  },
  submitBtn: {
    backgroundColor: ThemeColors.buttonGreen,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  submitBtnText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: ThemeColors.white,
  },
});

export default DepositScreen;