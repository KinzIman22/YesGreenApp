# 🌿 YesGreenApp (YesTime Plus)

**YesGreenApp** is a full-stack cross-platform mobile and web application built with React Native and Expo. The application delivers an engaging, dual-theme user interface designed for seamless wallet management, interactive daily draws, authentication flows, and level commitment tracking.

---

The core idea of **YesGreenApp** (also known as *YesTime Plus*) is to serve as a comprehensive, full-stack cross-platform mobile and web application built with React Native and Expo.

It is designed to provide users with an engaging, dual-theme user interface that seamlessly integrates several key functions:

* **Wallet Management**: Dedicated modules that allow users to monitor their financial standing, total balances, daily shopping, and winnings.


* **Interactive Daily Draws**: A real-time system featuring live draw interfaces equipped with auto-scroll and pause-on-interaction capabilities.


* **User Progression & Commitments**: Structured navigation and interactive pathways that track user level commitments and statistics.


* **Secure Access**: A streamlined authentication workflow supporting login, signup, and OTP verification flows.


* **Cross-Platform Compatibility**: Optimized layout constraints powered by custom utility hooks to ensure smooth performance across both mobile devices and web browsers.

## 🚀 Key Features

* **Secure Authentication**: Integrated login, signup, and OTP verification workflows.
* **Interactive Live Draws**: Real-time draw mechanism featuring an auto-scroll capability with pause-on-interaction controls.
* **Wallet & Financial Tracking**: Dedicated modules to monitor total balances, daily shopping, and winnings.
* **Level Commitments**: Interactive commitment pathways and structured navigation for user progression.
* **Responsive Layouts**: Optimized layout constraints via custom utility hooks (`useResponsiveLayout`) ensuring seamless compatibility across mobile devices and web browsers.
* **Internationalization Ready**: Structured support for multi-language components.

---

## 🛠️ Tech Stack

* **Framework**: React Native, Expo
* **Navigation**: React Navigation (Bottom Tabs & Stack Navigators)[cite: 1]
* **Icons**: `@expo/vector-icons` (Ionicons)[cite: 1]
* **Styling**: React Native StyleSheet with custom responsive wrapper constraints[cite: 1]
* **Version Control**: Git & GitHub (`KinzIman22`)[cite: 1]

---

## 📂 Complete Project Structure

```text
YesGreenApp/
│
├── assets/                  # Application logos, graphics, and static images
├── src/
│   ├── components/          # Reusable UI widgets (Headers, Modals, Cards)
│   ├── navigation/          # Navigation setup (TabNavigator, Stack navigators)
│   ├── screens/             # Main application views & screens
│   │   ├── HomeScreen.js    # Dashboard view with video player and stats
│   │   ├── WalletScreen.js  # Financial tracking and balances
│   │   ├── LiveDrawScreen.js# Auto-scrolling draw interface
│   │   ├── ProfileScreen.js # User profile settings
│   │   └── MySavingsScreen.js # Savings statistics and level commitments
│   ├── utils/               # Responsive layout helpers and utility functions
│   └── styles/              # Global theme configurations and color palettes
│
├── App.js                   # Main application entry point
├── app.json                 # Expo configuration metadata


🎨 Color Palette & Theming
The application utilizes a professional, high-contrast color scheme[cite: 1]:

Primary Purple (#5B21B6): Used for headers, primary badges, and key interactive accents[cite: 1].

Forest Green (#054A29): Core brand identity color for primary actions and active states[cite: 1].

Screen Background (#F3F4F6): Clean layout surface separation[cite: 1].

Card Surface (#FFFFFF): Elevated card containers and content backgrounds[cite: 1].

⚙️ Getting Started & Installation
To run this project locally, execute the following commands in your terminal[cite: 1]:

Bash
# 1. Clone the repository
git clone [https://github.com/KinzIman22/YesGreenApp.git](https://github.com/KinzIman22/YesGreenApp.git)

# 2. Navigate to the project directory
cd YesGreenApp

# 3. Install dependencies
npm install

# 4. Run the application
npx expo start
📄 License
This project is developed as part of my company project  and application deployments[cite: 1].

#Developed by Kinz Ul Iman
[cite: 1]
