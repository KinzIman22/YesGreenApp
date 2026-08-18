import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        
        {/* TabNavigator */}
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen name="DepositScreen" component={DepositScreen} />
        <Stack.Screen name="WithdrawScreen" component={WithdrawScreen} />
        
        {/* Qura Andazi & Shops */}
        <Stack.Screen name="CarQuraAndaziScreen" component={CarQuraAndaziScreen} />
        <Stack.Screen name="PublicShopDirectoryScreen" component={PublicShopDirectoryScreen} />
        <Stack.Screen name="LiveQuraAndaziDashboardScreen" component={LiveQuraAndaziDashboardScreen} />
        
        <Stack.Screen 
          name="MembershipQurAndazi" 
          component={MembershipQurAndaziScreen} 
          options={{ headerShown: false }} 
        />

        <Stack.Screen name="GameQurAndaziScreen" component={GameQurAndaziScreen} />
        <Stack.Screen name="ShoppingQurAndaziScreen" component={ShoppingQurAndaziScreen} />
        
        <Stack.Screen 
          name="CarPlansScreen" 
          component={CarPlansScreen} 
          options={{ headerShown: false }} 
        />
        
        <Stack.Screen 
          name="WalletScreen" 
          component={WalletScreen} 
          options={{ headerShown: false }} 
        />

        <Stack.Screen 
          name="CarPlanDetailScreen" 
          component={CarPlanDetailScreen} 
          options={{ headerShown: false }} 
        />

        <Stack.Screen name="ShoppingQurAndaziDashboardScreen" component={ShoppingQurAndaziDashboardScreen} />

        <Stack.Screen 
          name="Transactions" 
          component={TransactionsScreen} 
          options={{ headerShown: false }} 
        />
        
        <Stack.Screen 
          name="ProfileScreen"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen 
          name="UpdateProfile" 
          component={UpdateProfileScreen} 
          options={{ headerShown: false }} 
        />

        <Stack.Screen 
          name="TermsConditions" 
          component={TermsConditionsScreen} 
          options={{ headerShown: false }} 
        />

        <Stack.Screen 
          name="PrivacyPolicyScreen" 
          component={PrivacyPolicyScreen} 
          options={{ headerShown: false }} 
        />

        <Stack.Screen 
          name="HelpCenterScreen" 
          component={HelpCenterScreen} 
          options={{ headerShown: false }} 
        />
        
        <Stack.Screen 
          name="ChangePasswordScreen" 
          component={ChangePasswordScreen} 
          options={{ headerShown: false }} 
        />
        
        <Stack.Screen 
          name="DeleteAccountScreen" 
          component={DeleteAccountScreen} 
          options={{ headerShown: false }} 
        />

        <Stack.Screen name="RegisterShopScreen" component={RegisterShopScreen} />
        <Stack.Screen name="MyShopScreen" component={MyShopScreen} />

        {/* Fixed typo from MySavingScreen to MySavingsScreen */}
        <Stack.Screen name="MySavingsScreen" component={MySavingsScreen} />
        
       
       <Stack.Screen name="MyPrizesScreen" component={MyPrizesScreen} />

        <Stack.Screen name="PermanentCouponeScreen" component={PermanentCouponeScreen} />
        <Stack.Screen name="RecentDrawsScreen" component={RecentDrawsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}