import { Tabs } from 'expo-router';
import { Chrome as Home, User, Trophy, Target } from 'lucide-react-native';
import { View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1A0B2E',
          borderTopWidth: 0,
          height: 90,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#D946EF',
        tabBarInactiveTintColor: '#64748B',
        tabBarLabelStyle: {
          fontFamily: 'Inter-SemiBold',
          fontSize: 12,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <View style={{ padding: 8 }}>
              <Home size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="challenges"
        options={{
          title: 'Challenges',
          tabBarIcon: ({ size, color }) => (
            <View style={{ padding: 8 }}>
              <Target size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Leaderboard',
          tabBarIcon: ({ size, color }) => (
            <View style={{ padding: 8 }}>
              <Trophy size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <View style={{ padding: 8 }}>
              <User size={size} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}