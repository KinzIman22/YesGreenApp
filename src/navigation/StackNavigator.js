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
import CarPlansScreen from '../screens/CarPlansScreen'; // Apne folder path ke mutabiq adjust kar lein
// Import Tab Navigator (jo HomeScreen, Wallet, etc. ko hold karta hai)
import TabNavigator from './TabNavigator';
import CarPlanDetailScreen from '../screens/CarPLanDetailScreen';
import ShoppingQurAndaziDashboardScreen from '../screens/ShoppingQurAndaziDashboardScreen';
import NotificationsScreen from '../screens/NotificationsScreen'; 
import TransactionsScreen from '../screens/TransactionsScreen';
import WalletScreen from '../screens/WalletScreen';
import ProfileScreen from '../screens/ProfileScreen';
import UpdateProfileScreen from '../screens/UpdateProfileScreen'; // Path apne project structure ke mutabiq adjust kar lein

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
        
        {/* TabNavigator ko yahan register kiya gaya hai */}
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen name="DepositScreen" component={DepositScreen} />
        <Stack.Screen name="WithdrawScreen" component={WithdrawScreen} />
        
        {/* Car Qura Andazi Screen */}
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
 <Stack.Screen name="ProfileScreen"
 component={ProfileScreen}
 options={{headerShown:false}}

 />

 <Stack.Screen 
  name="UpdateProfile" 
  component={UpdateProfileScreen} 
  options={{ headerShown: false }} 
/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}