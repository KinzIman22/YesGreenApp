import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  StatusBar, 
  TouchableOpacity, 
  ScrollView, 
  Dimensions,
  ActivityIndicator,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useResponsiveLayout } from '../utils/responsive';
import { getWalletBalance, getTransactions } from '../api/apiService';

const ThemeColors = {
  primaryDark: '#0B7A58',
  screenBg: '#F4F7F5',
  cardBg: '#FFFFFF',
  textDark: '#1A202C',
  textMuted: '#718096',
  white: '#FFFFFF',
};

export default function WalletScreen({ navigation }) {
  const { width, containerMaxWidth } = useResponsiveLayout();
  const screenWidth = Dimensions.get('window').width;
  
  const isConstrained = containerMaxWidth !== '100%';
  const maxContentWidth = isConstrained ? containerMaxWidth : screenWidth;
  const horizontalPadding = screenWidth > 768 ? 24 : 16;

  const [selectedFilter, setSelectedFilter] = useState('History');
  const filters = ['History', 'Deposits', 'Withdrawals'];

  const quickAmounts = ['100', '500', '1000', '2500', '5000', '10000'];

  const [loading, setLoading] = useState(true);
  const [walletData, setWalletData] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchWalletData();
  }, []);

  const fetchWalletData = async () => {
    try {
      setLoading(true);
      const [balanceRes, txRes] = await Promise.all([
        getWalletBalance().catch(() => null),
        getTransactions().catch(() => null),
      ]);
      
      setWalletData(balanceRes?.data || balanceRes);
      setTransactions(txRes?.data || txRes || []);
    } catch (error) {
      console.log('Error fetching wallet data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter transactions based on selected tab
  const filteredTransactions = transactions.filter(tx => {
    if (selectedFilter === 'Deposits') return tx.type?.toLowerCase() === 'deposit';
    if (selectedFilter === 'Withdrawals') return tx.type?.toLowerCase() === 'withdrawal';
    return true; // 'History' shows all
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={ThemeColors.primaryDark} />

      <View style={[styles.responsiveWrapper, { maxWidth: containerMaxWidth }]}>
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={[styles.scrollContent, { paddingHorizontal: horizontalPadding }]}
        >
          <View style={styles.scrollInnerWrapper}>
            
            {/* Top Balance Card */}
            <View style={[styles.balanceCard, { width: '100%' }]}>
              <View style={styles.balanceCardTopRow}>
                <View>
                  <Text style={styles.balanceLabel}>Total Balance</Text>
                  <Text style={styles.balanceAmount}>
                    PKR {walletData?.balance ?? walletData?.totalBalance ?? '0.00'}
                  </Text>
                </View>
                <View style={styles.cardIconBox}>
                  <Ionicons name="card-outline" size={24} color={ThemeColors.primaryDark} />
                </View>
              </View>

              {/* Inflows / Outflows Row */}
              <View style={styles.miniStatsRow}>
                <View style={styles.miniStatBox}>
                  <Ionicons name="arrow-up" size={14} color="#68D391" style={{ marginRight: 4 }} />
                  <Text style={styles.miniStatText}>
                    PKR {walletData?.totalInflow ?? walletData?.inflow ?? '0'}
                  </Text>
                </View>
                <View style={styles.miniStatBox}>
                  <Ionicons name="arrow-down" size={14} color="#FC8181" style={{ marginRight: 4 }} />
                  <Text style={styles.miniStatText}>
                    PKR {walletData?.totalOutflow ?? walletData?.outflow ?? '0'}
                  </Text>
                </View>
              </View>

              {/* Deposit / Withdraw Action Buttons */}
              <View style={styles.actionButtonsRow}>
                <TouchableOpacity style={styles.actionBtnWhite} activeOpacity={0.8}
                  onPress={() => {
                    const rootNav = navigation.getParent() || navigation;
                    rootNav.navigate('DepositScreen');
                  }}
                >
                  <View style={styles.actionIconCircle}>
                    <Ionicons name="add" size={16} color={ThemeColors.primaryDark} />
                  </View>
                  <Text style={styles.actionBtnTextDark}>Deposit</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionBtnWhite} activeOpacity={0.8}
                   onPress={() => {
                     const rootNav = navigation.getParent() || navigation;
                     rootNav.navigate('WithdrawScreen');
                   }}>
                  <View style={[styles.actionIconCircle, { backgroundColor: '#FFF5F5' }]}>
                    <Ionicons name="remove" size={16} color="#E53E3E" />
                  </View>
                  <Text style={styles.actionBtnTextDark}>Withdraw</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Quick Top-Up Section */}
            <View style={[styles.sectionCard, { width: '100%' }]}>
              <Text style={styles.sectionHeaderTitle}>Quick Top-Up</Text>
              <View style={styles.quickGrid}>
                {quickAmounts.map((amt, idx) => (
                  <TouchableOpacity 
                    key={idx} 
                    style={styles.quickAmountBtn} 
                    activeOpacity={0.7}
                    onPress={() => {
                      const rootNav = navigation.getParent() || navigation;
                      rootNav.navigate('DepositScreen', { amount: amt });
                    }}
                  >
                    <Text style={styles.quickAmountText} numberOfLines={1}>PKR {amt}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Recent Transactions Section */}
            <View style={[styles.sectionCard, { width: '100%', marginBottom: 30 }]}>
              <View style={styles.transactionsHeaderRow}>
                <Text style={styles.sectionHeaderTitle}>Recent Transactions</Text>
               <TouchableOpacity 
                  style={styles.viewAllBtn} 
                  onPress={() => navigation.navigate('Transactions')}
                  activeOpacity={0.7}
                >
                  <Text style={styles.viewAllText}>View All</Text>
                  <Ionicons name="chevron-forward" size={12} color={ThemeColors.primaryDark} />
                </TouchableOpacity>
              </View>

              {/* Filter Chips */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterChipsScroll}>
                {filters.map((filter) => {
                  const isActive = selectedFilter === filter;
                  return (
                    <TouchableOpacity
                      key={filter}
                      style={[styles.filterChip, isActive ? styles.activeChip : styles.inactiveChip]}
                      onPress={() => setSelectedFilter(filter)}
                      activeOpacity={0.8}
                    >
                      <Text style={[styles.filterChipText, isActive ? styles.activeChipText : styles.inactiveChipText]}>
                        {filter}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              {/* Transaction Content / Loader */}
              {loading ? (
                <View style={styles.loaderContainer}>
                  <ActivityIndicator size="small" color={ThemeColors.primaryDark} />
                </View>
              ) : filteredTransactions.length === 0 ? (
                <View style={styles.emptyTransactionContainer}>
                  <Ionicons name="time-outline" size={42} color="#CBD5E0" />
                  <Text style={styles.emptyTransactionText}>No recent transactions found</Text>
                </View>
              ) : (
                <View style={{ marginTop: 12 }}>
                  {filteredTransactions.map((item, index) => (
                    <View key={item.id || index} style={styles.txRow}>
                      <View style={styles.txLeft}>
                        <View style={[styles.txIconBox, { backgroundColor: item.type?.toLowerCase() === 'deposit' ? '#F0FDF4' : '#FEF2F2' }]}>
                          <Ionicons 
                            name={item.type?.toLowerCase() === 'deposit' ? 'arrow-down' : 'arrow-up'} 
                            size={16} 
                            color={item.type?.toLowerCase() === 'deposit' ? '#16A34A' : '#DC2626'} 
                          />
                        </View>
                        <View>
                          <Text style={styles.txTitle}>{item.title || item.type || 'Transaction'}</Text>
                          <Text style={styles.txDate}>{item.date || item.createdAt || 'Recent'}</Text>
                        </View>
                      </View>
                      <Text style={[styles.txAmount, { color: item.type?.toLowerCase() === 'deposit' ? '#16A34A' : '#DC2626' }]}>
                        {item.type?.toLowerCase() === 'deposit' ? '+' : '-'} PKR {item.amount}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>

          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.primaryDark,
    alignItems: 'center',
  },
  responsiveWrapper: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: ThemeColors.primaryDark,
  },
  scrollContent: {
    backgroundColor: ThemeColors.screenBg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 18,
    paddingBottom: 85,
    minHeight: '100%',
  },
  scrollInnerWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  balanceCard: {
    backgroundColor: ThemeColors.primaryDark,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  balanceCardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  balanceLabel: {
    fontSize: 12,
    color: '#E2E8F0',
    fontWeight: '500',
  },
  balanceAmount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: ThemeColors.white,
    marginTop: 2,
  },
  cardIconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: ThemeColors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  miniStatBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 6,
  },
  miniStatText: {
    fontSize: 12,
    fontWeight: '600',
    color: ThemeColors.white,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionBtnWhite: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ThemeColors.white,
    paddingVertical: 10,
    borderRadius: 12,
    marginHorizontal: 3,
  },
  actionIconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EDF2F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  actionBtnTextDark: {
    fontSize: 13,
    fontWeight: 'bold',
    color: ThemeColors.textDark,
  },
  sectionCard: {
    backgroundColor: ThemeColors.cardBg,
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#EDF2F7',
  },
  sectionHeaderTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: ThemeColors.textDark,
    marginBottom: 12,
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAmountBtn: {
    width: '31.5%',
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 4,
    alignItems: 'center',
    marginBottom: 10,
  },
  quickAmountText: {
    fontSize: 11.5,
    fontWeight: 'bold',
    color: ThemeColors.textDark,
  },
  transactionsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  viewAllText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: ThemeColors.primaryDark,
    marginRight: 2,
  },
  filterChipsScroll: {
    paddingBottom: 4,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  activeChip: {
    backgroundColor: ThemeColors.primaryDark,
    borderColor: ThemeColors.primaryDark,
  },
  inactiveChip: {
    backgroundColor: ThemeColors.white,
    borderColor: '#CBD5E0',
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  activeChipText: {
    color: ThemeColors.white,
  },
  inactiveChipText: {
    color: ThemeColors.textDark,
  },
  loaderContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTransactionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 25,
  },
  emptyTransactionText: {
    fontSize: 13,
    color: ThemeColors.textMuted,
    marginTop: 8,
    fontWeight: '500',
  },
  txRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  txLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txIconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  txTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: ThemeColors.textDark,
  },
  txDate: {
    fontSize: 11,
    color: ThemeColors.textMuted,
    marginTop: 2,
  },
  txAmount: {
    fontSize: 13,
    fontWeight: 'bold',
  },
});