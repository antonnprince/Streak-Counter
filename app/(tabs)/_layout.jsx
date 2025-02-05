import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export default function TabLayout() {
  // const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#7A1CAC', // Color when tab is active
        tabBarInactiveTintColor: '#EBD3F8',
        tabBarStyle: 
        Platform.select({
          ios: {
            backgroundColor: Colors.main.tabBackground,
          },
          default: {
            backgroundColor: Colors.main.tabBackground,
          },
        }),
      }}>

      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <MaterialIcons name="home-filled" size={24} color={color} />,
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
