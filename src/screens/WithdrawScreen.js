import React, { useState } from 'react';
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
import { Ionicons } from '@expo/vector-icons';

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
  noticeBg: '#FFFBEB',
  noticeBorder: '#FDE68A',
  noticeText: '#D97706',
  white: '#FFFFFF',
};

const quickAmounts = ['500', '1000', '2500', '5000', '10000', '25000'];

const WithdrawScreen = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('jazzcash');
  const [accountTitle, setAccountTitle] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [note, setNote] = useState('');

  const resetForm = () => {
    setAmount('');
    setSelectedMethod('jazzcash');
    setAccountTitle('');
    setAccountNumber('');
    setBankName('');
    setNote('');
  };

  const handleSubmit = () => {
    if (!amount) {
      Alert.alert('Error', 'Please enter withdrawal amount.');
      return;
    }
    if (!accountTitle) {
      Alert.alert('Error', 'Please enter account holder name.');
      return;
    }
    if (!accountNumber) {
      Alert.alert('Error', 'Please enter account/mobile number.');
      return;
    }

    Alert.alert(
      'Success',
      'Withdrawal request submitted successfully!',
      [
        {
          text: 'OK',
          onPress: () => resetForm(),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={ThemeColors.primaryDark} />

      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation?.goBack()}>
          <Ionicons name="chevron-back" size={24} color={ThemeColors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Withdraw</Text>
      </View>

      {/* Main Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.mainCard}>
          {/* Sub Header */}
          <View style={styles.subHeaderRow}>
            <View style={styles.walletIconBg}>
              <Ionicons name="wallet-outline" size={22} color={ThemeColors.primaryDark} />
            </View>
            <View style={styles.subHeaderTexts}>
              <Text style={styles.subTitle}>Withdrawal Request</Text>
              <Text style={styles.subDesc}>Amount is debited immediately</Text>
            </View>
          </View>

          {/* Amount Input */}
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

          {/* Quick Amounts Grid */}
          <Text style={styles.label}>Quick Amount</Text>
          <View style={styles.quickAmountGrid}>
            {quickAmounts.map((item) => (
              <View key={item} style={styles.chipWrapper}>
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

          {/* Withdrawal Method */}
          <Text style={styles.label}>Withdrawal Method</Text>

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
            <Text style={styles.methodTitle}>Jazz Cash</Text>
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
            <Text style={styles.methodTitle}>Easy Paisa</Text>
          </TouchableOpacity>

          {/* Bank Transfer */}
          <TouchableOpacity
            style={[
              styles.methodCard,
              selectedMethod === 'bank' && styles.methodCardSelected,
            ]}
            onPress={() => setSelectedMethod('bank')}
          >
            <View style={styles.radioCircle}>
              {selectedMethod === 'bank' && <View style={styles.radioInner} />}
            </View>
            <Image source={require('../assets/UBL.png')} style={styles.methodLogo} resizeMode="contain" />
            <Text style={styles.methodTitle}>Bank Transfer</Text>
          </TouchableOpacity>

          {/* Inputs */}
          <Text style={styles.label}>Account Title</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter account holder name"
              placeholderTextColor={ThemeColors.textMuted}
              value={accountTitle}
              onChangeText={setAccountTitle}
            />
          </View>

          <Text style={styles.label}>Account Number</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter account / mobile number"
              placeholderTextColor={ThemeColors.textMuted}
              keyboardType="numeric"
              value={accountNumber}
              onChangeText={setAccountNumber}
            />
          </View>

          <Text style={styles.label}>Bank Name (optional)</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="e.g. HBL, UBL, Meezan"
              placeholderTextColor={ThemeColors.textMuted}
              value={bankName}
              onChangeText={setBankName}
            />
          </View>

          <Text style={styles.label}>Note (optional)</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Any additional note"
              placeholderTextColor={ThemeColors.textMuted}
              value={note}
              onChangeText={setNote}
            />
          </View>

          {/* Notice Box */}
          <View style={styles.noticeContainer}>
            <Ionicons name="information-circle-outline" size={20} color={ThemeColors.noticeText} style={{ marginRight: 8 }} />
            <Text style={styles.noticeText}>
              Amount is debited immediately. If rejected by admin it will be refunded automatically.
            </Text>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitBtnText}>Submit Withdrawal Request</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.primaryDark,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 12 : 6,
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
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
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
  methodTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: ThemeColors.textDark,
  },
  noticeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ThemeColors.noticeBg,
    borderWidth: 1,
    borderColor: ThemeColors.noticeBorder,
    borderRadius: 12,
    padding: 12,
    marginTop: 18,
    marginBottom: 10,
  },
  noticeText: {
    flex: 1,
    fontSize: 12,
    color: ThemeColors.noticeText,
    fontWeight: '500',
    lineHeight: 16,
  },
  submitBtn: {
    backgroundColor: ThemeColors.primaryDark,
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

export default WithdrawScreen;