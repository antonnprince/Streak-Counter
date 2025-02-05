# Streaks App

Streaks is a React Native application built using **Expo**, designed to help users track their activity streaks. The app keeps track of consecutive days a user logs in and provides milestone notifications.

## Features
- Tracks daily streaks and milestones
- Displays notifications when streaks are updated
- Uses **AsyncStorage** to persist streak data
- Implements a **custom splash screen** using `expo-splash-screen`
- Uses `react-native-toast-message` for in-app notifications
- Supports light and dark mode

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/antonnprince/Streak-Counter.git
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
   or
   ```sh
   yarn install
   ```
3. Start the application:
   ```sh
   expo start
   ```

## Dependencies
- **React Native** (Expo framework)
- **react-native-toast-message** (for notifications)
- **expo-font** (for custom fonts)
- **expo-splash-screen** (for splash screen handling)
- **@react-navigation/native** (for navigation)

## Configuration
### **Splash Screen Setup**
Ensure that your `app.json` includes the correct splash screen settings:
```json
"expo": {
  "splash": {
    "image": "./assets/images/snackr.jpg",
    "resizeMode": "contain",
    "backgroundColor": "#ffffff"
  }
}
```

### **Notifications Setup**
To schedule notifications, ensure `expo-notifications` is installed:
```sh
expo install expo-notifications
```

Example trigger:
```js
trigger: {
  hour: 5,
  minute: 40,
  repeats: true,
},
```

## How It Works
### **Tracking Streaks**
- The app saves the last opened date and streak count in `AsyncStorage`.
- If the user logs in daily, their streak increases.
- If they miss a day, the streak resets to `1`.
- Notifications alert users about their streak progress.

### **Displaying Toast Messages**
```js
Toast.show({
  type: 'info',
  text1: 'Welcome Back!',
  text2: `You're on a ${streaks}-day streak!`,
});
```

## Troubleshooting
### **Splash Screen Not Showing?**
- Ensure `expo-splash-screen` is installed.
- Call `SplashScreen.preventAutoHideAsync();` before the app loads.
- Call `SplashScreen.hideAsync();` after fonts and assets load.

### **Notifications Not Triggering?**
- Ensure **Expo Go** has notification permissions.
- Check the `expo-notifications` installation and setup.
- Restart the app and re-test scheduled notifications.

## License
This project is open-source and available under the [MIT License](LICENSE).

