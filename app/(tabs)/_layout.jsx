import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
// import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
  // const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // tabBarBackground: Colors.main.background,
        tabBarStyle: 
        Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            backgroundColor: Colors.main.background,
          },
          default: {
            backgroundColor: Colors.main.background,
            borderTopWidth: 0, // Optional: Removes border
            elevation: 5
          },
        }),
      }}>

      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <MaterialIcons name="perm-identity" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <MaterialIcons name="perm-identity" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
