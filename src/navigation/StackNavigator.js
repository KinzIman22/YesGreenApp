import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

// Import screens
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import OTPVerificationScreen from '../screens/OTPVerificationScreen';
import ForgotPasswordScreen from '../screens/ForgetPasswordScreen';

import DepositScreen from '../screens/DepositScreen';
import WithdrawScreen from '../screens/WithdrawScreen';
import CarQuraAndaziScreen from '../screens/CarQuraAndaziScreen';
import PublicShopDirectoryScreen from '../screens/PublicShopDirectoryScreen';
import LiveQuraAndaziDashboardScreen from '../screens/LiveQuraAndaziDashboardScreen';
import MembershipQurAndaziScreen from '../screens/MembershipQurAndaziScreen';
import GameQurAndaziScreen from '../screens/GameQurAndaziScreen';
import ShoppingQurAndaziScreen from '../screens/ShoppingQurAndaziScreen';
import CarPlansScreen from '../screens/CarPlansScreen';

import TabNavigator from './TabNavigator';

import CarPlanDetailScreen from '../screens/CarPLanDetailScreen';
import ShoppingQurAndaziDashboardScreen from '../screens/ShoppingQurAndaziDashboardScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import TransactionsScreen from '../screens/TransactionsScreen';
import WalletScreen from '../screens/WalletScreen';
import ProfileScreen from '../screens/ProfileScreen';
import UpdateProfileScreen from '../screens/UpdateProfileScreen';
import TermsConditionsScreen from '../screens/TermsConditionsScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import HelpCenterScreen from '../screens/HelpCenterScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import DeleteAccountScreen from '../screens/DeleteAccountScreen';
import RegisterShopScreen from '../screens/RegisterShopScreen';
import MyShopScreen from '../screens/MyShopScreen';
import MySavingsScreen from '../screens/MySavingsScreen';
import MyPrizesScreen from '../screens/MyPrizesScreen';
import PermanentCouponeScreen from '../screens/PermanentCouponeScreen';
import RecentDrawsScreen from '../screens/RecentDrawsScreen';
import LevelCommitmentScreen from '../screens/LevelCommitmentScreen';
import LiveDrawScreen from '../screens/LiveDrawScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{ headerShown: false }}
        >

          {/* Splash */}
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
          />

          {/* Authentication */}
          <Stack.Screen
            name="Login"
            component={LoginScreen}
          />

          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
          />

          <Stack.Screen
            name="OTPVerification"
            component={OTPVerificationScreen}
          />

          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />

          {/* Main Tab Navigator */}
          <Stack.Screen
            name="TabNavigator"
            component={TabNavigator}
          />

          {/* Deposit */}
          <Stack.Screen
            name="DepositScreen"
            component={DepositScreen}
          />

          {/* Withdraw */}
          <Stack.Screen
            name="WithdrawScreen"
            component={WithdrawScreen}
          />

          {/* Car Qura Andazi */}
          <Stack.Screen
            name="CarQuraAndaziScreen"
            component={CarQuraAndaziScreen}
          />

          {/* Public Shop Directory */}
          <Stack.Screen
            name="PublicShopDirectoryScreen"
            component={PublicShopDirectoryScreen}
          />

          {/* Live Qura Andazi Dashboard */}
          <Stack.Screen
            name="LiveQuraAndaziDashboardScreen"
            component={LiveQuraAndaziDashboardScreen}
          />

          {/* Membership Qura Andazi */}
          <Stack.Screen
            name="MembershipQurAndazi"
            component={MembershipQurAndaziScreen}
            options={{ headerShown: false }}
          />

          {/* Game Qura Andazi */}
          <Stack.Screen
            name="GameQurAndaziScreen"
            component={GameQurAndaziScreen}
          />

          {/* Shopping Qura Andazi */}
          <Stack.Screen
            name="ShoppingQurAndaziScreen"
            component={ShoppingQurAndaziScreen}
          />

          {/* Car Plans */}
          <Stack.Screen
            name="CarPlansScreen"
            component={CarPlansScreen}
            options={{ headerShown: false }}
          />

          {/* Car Plan Detail */}
          <Stack.Screen
            name="CarPlanDetailScreen"
            component={CarPlanDetailScreen}
            options={{ headerShown: false }}
          />

          {/* Shopping Qura Andazi Dashboard */}
          <Stack.Screen
            name="ShoppingQurAndaziDashboardScreen"
            component={ShoppingQurAndaziDashboardScreen}
          />

          {/* Notifications */}
          <Stack.Screen
            name="NotificationsScreen"
            component={NotificationsScreen}
          />

          {/* Transactions */}
          <Stack.Screen
            name="Transactions"
            component={TransactionsScreen}
            options={{ headerShown: false }}
          />

          {/* Wallet */}
          <Stack.Screen
            name="WalletScreen"
            component={WalletScreen}
            options={{ headerShown: false }}
          />

          {/* Profile */}
          <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />

          {/* Update Profile */}
          <Stack.Screen
            name="UpdateProfile"
            component={UpdateProfileScreen}
            options={{ headerShown: false }}
          />

          {/* Terms & Conditions */}
          <Stack.Screen
            name="TermsConditions"
            component={TermsConditionsScreen}
            options={{ headerShown: false }}
          />

          {/* Privacy Policy */}
          <Stack.Screen
            name="PrivacyPolicyScreen"
            component={PrivacyPolicyScreen}
            options={{ headerShown: false }}
          />

          {/* Help Center */}
          <Stack.Screen
            name="HelpCenterScreen"
            component={HelpCenterScreen}
            options={{ headerShown: false }}
          />

          {/* Change Password */}
          <Stack.Screen
            name="ChangePasswordScreen"
            component={ChangePasswordScreen}
            options={{ headerShown: false }}
          />

          {/* Delete Account */}
          <Stack.Screen
            name="DeleteAccountScreen"
            component={DeleteAccountScreen}
            options={{ headerShown: false }}
          />

          {/* Register Shop */}
          <Stack.Screen
            name="RegisterShopScreen"
            component={RegisterShopScreen}
          />

          {/* My Shop */}
          <Stack.Screen
            name="MyShopScreen"
            component={MyShopScreen}
          />

          {/* My Savings */}
          <Stack.Screen
            name="MySavingsScreen"
            component={MySavingsScreen}
          />

          {/* My Prizes */}
          <Stack.Screen
            name="MyPrizesScreen"
            component={MyPrizesScreen}
          />

          {/* Permanent Coupon */}
          <Stack.Screen
            name="PermanentCouponeScreen"
            component={PermanentCouponeScreen}
          />

          {/* Recent Draws */}
          <Stack.Screen
            name="RecentDrawsScreen"
            component={RecentDrawsScreen}
          />

          {/* Level Commitment */}
          <Stack.Screen
            name="LevelCommitmentScreen"
            component={LevelCommitmentScreen}
          />

          {/* Live Draw */}
          <Stack.Screen
            name="LiveDrawScreen"
            component={LiveDrawScreen}
          />

        </Stack.Navigator>
      </NavigationContainer>

      {/* Toast - NavigationContainer ke bahar */}
      <Toast />
    </>
  );
}