import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { Trophy, Medal, Crown, Flame, TrendingUp, Users } from 'lucide-react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface LeaderboardUser {
  id: string;
  name: string;
  username: string;
  avatar: string;
  currentStreak: number;
  longestStreak: number;
  totalDays: number;
  level: number;
  points: number;
}

export default function LeaderboardScreen() {
  const [activeTab, setActiveTab] = useState<'current' | 'longest' | 'total'>('current');
  const [users] = useState<LeaderboardUser[]>([
    {
      id: '1',
      name: 'Alex Johnson',
      username: '@alexj_92',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
      currentStreak: 89,
      longestStreak: 156,
      totalDays: 342,
      level: 15,
      points: 1250,
    },
    {
      id: '2',
      name: 'Sarah Chen',
      username: '@sarahc_dev',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200',
      currentStreak: 73,
      longestStreak: 145,
      totalDays: 298,
      level: 13,
      points: 1180,
    },
    {
      id: '3',
      name: 'John Doe',
      username: '@johndoe32',
      avatar: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=200',
      currentStreak: 45,
      longestStreak: 78,
      totalDays: 156,
      level: 8,
      points: 750,
    },
    {
      id: '4',
      name: 'Emma Wilson',
      username: '@emma_w',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
      currentStreak: 67,
      longestStreak: 132,
      totalDays: 245,
      level: 12,
      points: 980,
    },
    {
      id: '5',
      name: 'Mike Rodriguez',
      username: '@mike_r_fit',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200',
      currentStreak: 34,
      longestStreak: 67,
      totalDays: 134,
      level: 7,
      points: 620,
    },
    {
      id: '6',
      name: 'Lisa Park',
      username: '@lisa_park',
      avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=200',
      currentStreak: 28,
      longestStreak: 95,
      totalDays: 189,
      level: 9,
      points: 710,
    },
  ]);

  const getSortedUsers = () => {
    switch (activeTab) {
      case 'current':
        return [...users].sort((a, b) => b.currentStreak - a.currentStreak);
      case 'longest':
        return [...users].sort((a, b) => b.longestStreak - a.longestStreak);
      case 'total':
        return [...users].sort((a, b) => b.totalDays - a.totalDays);
      default:
        return users;
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown size={20} color="#FFD700" />;
      case 2: return <Medal size={20} color="#C0C0C0" />;
      case 3: return <Medal size={20} color="#CD7F32" />;
      default: return null;
    }
  };

  const getRankColors = (rank: number) => {
    switch (rank) {
      case 1: return Colors.gradient.primary;
      case 2: return ['#E5E7EB', '#9CA3AF'];
      case 3: return ['#F59E0B', '#D97706'];
      default: return [Colors.background.card, Colors.background.secondary];
    }
  };

  const getValueByTab = (user: LeaderboardUser) => {
    switch (activeTab) {
      case 'current': return user.currentStreak;
      case 'longest': return user.longestStreak;
      case 'total': return user.totalDays;
      default: return user.currentStreak;
    }
  };

  const TabButton = ({ title, key: tabKey, isActive, onPress }: any) => (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.tabButton, isActive && styles.tabButtonActive]}>
        <Text style={[styles.tabButtonText, isActive && styles.tabButtonTextActive]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const TopThreeCard = ({ users }: { users: LeaderboardUser[] }) => (
    <Animated.View entering={FadeInUp.delay(200)} style={styles.topThreeContainer}>
      <View style={styles.topThreeRow}>
        {/* Second Place */}
        {users[1] && (
          <View style={[styles.topThreeCard, styles.secondPlace]}>
            <LinearGradient
              colors={getRankColors(2)}
              style={styles.topThreeGradient}
            >
              <View style={styles.topThreeRank}>
                {getRankIcon(2)}
              </View>
              <Image source={{ uri: users[1].avatar }} style={styles.topThreeAvatar} />
              <Text style={styles.topThreeName}>{users[1].name.split(' ')[0]}</Text>
              <Text style={styles.topThreeValue}>{getValueByTab(users[1])}</Text>
            </LinearGradient>
          </View>
        )}

        {/* First Place */}
        {users[0] && (
          <View style={[styles.topThreeCard, styles.firstPlace]}>
            <LinearGradient
              colors={getRankColors(1)}
              style={styles.topThreeGradient}
            >
              <View style={styles.topThreeRank}>
                {getRankIcon(1)}
              </View>
              <Image source={{ uri: users[0].avatar }} style={styles.topThreeAvatar} />
              <Text style={styles.topThreeName}>{users[0].name.split(' ')[0]}</Text>
              <Text style={styles.topThreeValue}>{getValueByTab(users[0])}</Text>
            </LinearGradient>
          </View>
        )}

        {/* Third Place */}
        {users[2] && (
          <View style={[styles.topThreeCard, styles.thirdPlace]}>
            <LinearGradient
              colors={getRankColors(3)}
              style={styles.topThreeGradient}
            >
              <View style={styles.topThreeRank}>
                {getRankIcon(3)}
              </View>
              <Image source={{ uri: users[2].avatar }} style={styles.topThreeAvatar} />
              <Text style={styles.topThreeName}>{users[2].name.split(' ')[0]}</Text>
              <Text style={styles.topThreeValue}>{getValueByTab(users[2])}</Text>
            </LinearGradient>
          </View>
        )}
      </View>
    </Animated.View>
  );

  const LeaderboardItem = ({ user, rank, index }: { user: LeaderboardUser; rank: number; index: number }) => (
    <Animated.View entering={FadeInDown.delay(index * 50)} style={styles.leaderboardItem}>
      <LinearGradient
        colors={[Colors.background.card, Colors.background.secondary]}
        style={styles.itemGradient}
      >
        <View style={styles.itemLeft}>
          <View style={styles.rankContainer}>
            <Text style={styles.rankNumber}>#{rank}</Text>
          </View>
          <Image source={{ uri: user.avatar }} style={styles.itemAvatar} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userUsername}>{user.username}</Text>
          </View>
        </View>
        <View style={styles.itemRight}>
          <View style={styles.valueContainer}>
            <Text style={styles.itemValue}>{getValueByTab(user)}</Text>
            <Text style={styles.itemLabel}>
              {activeTab === 'current' ? 'Current' : 
               activeTab === 'longest' ? 'Longest' : 'Total'} 
              {activeTab !== 'total' ? ' Streak' : ' Days'}
            </Text>
          </View>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>Lv.{user.level}</Text>
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );

  const sortedUsers = getSortedUsers();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={Colors.gradient.secondary}
        style={styles.backgroundGradient}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <Animated.View entering={FadeInUp} style={styles.header}>
            <Text style={styles.title}>Leaderboard</Text>
            <Text style={styles.subtitle}>See how you stack up against others</Text>
          </Animated.View>

          {/* Stats */}
          <Animated.View entering={FadeInUp.delay(100)} style={styles.statsCard}>
            <LinearGradient
              colors={Colors.gradient.accent}
              style={styles.statsGradient}
            >
              <View style={styles.statItem}>
                <Users size={20} color="#FFFFFF" />
                <Text style={styles.statValue}>{users.length}</Text>
                <Text style={styles.statLabel}>Active Users</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <TrendingUp size={20} color="#FFFFFF" />
                <Text style={styles.statValue}>{Math.max(...users.map(u => u.currentStreak))}</Text>
                <Text style={styles.statLabel}>Top Streak</Text>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Filter Tabs */}
          <Animated.View entering={FadeInUp.delay(150)} style={styles.tabsContainer}>
            <TabButton
              title="Current Streak"
              key="current"
              isActive={activeTab === 'current'}
              onPress={() => setActiveTab('current')}
            />
            <TabButton
              title="Longest Streak"
              key="longest"
              isActive={activeTab === 'longest'}
              onPress={() => setActiveTab('longest')}
            />
            <TabButton
              title="Total Days"
              key="total"
              isActive={activeTab === 'total'}
              onPress={() => setActiveTab('total')}
            />
          </Animated.View>

          {/* Top 3 Podium */}
          <TopThreeCard users={sortedUsers.slice(0, 3)} />

          {/* Rest of Leaderboard */}
          <View style={styles.leaderboardList}>
            {sortedUsers.slice(3).map((user, index) => (
              <LeaderboardItem
                key={user.id}
                user={user}
                rank={index + 4}
                index={index}
              />
            ))}
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  backgroundGradient: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
    opacity: 0.8,
  },
  statsCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 30,
  },
  statsGradient: {
    flexDirection: 'row',
    padding: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    opacity: 0.8,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#FFFFFF',
    opacity: 0.2,
    marginHorizontal: 20,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    gap: 8,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: Colors.background.card,
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: Colors.purple[600],
  },
  tabButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.muted,
    textAlign: 'center',
  },
  tabButtonTextActive: {
    color: '#FFFFFF',
  },
  topThreeContainer: {
    marginBottom: 30,
  },
  topThreeRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 12,
  },
  topThreeCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  firstPlace: {
    width: (width - 80) / 3 + 20,
  },
  secondPlace: {
    width: (width - 80) / 3,
  },
  thirdPlace: {
    width: (width - 80) / 3,
  },
  topThreeGradient: {
    padding: 16,
    alignItems: 'center',
    minHeight: 140,
  },
  topThreeRank: {
    marginBottom: 8,
  },
  topThreeAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  topThreeName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  topThreeValue: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  leaderboardList: {
    gap: 12,
  },
  leaderboardItem: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  itemGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    justifyContent: 'space-between',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rankContainer: {
    width: 32,
    alignItems: 'center',
    marginRight: 12,
  },
  rankNumber: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: Colors.text.muted,
  },
  itemAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.primary,
    marginBottom: 2,
  },
  userUsername: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.text.muted,
  },
  itemRight: {
    alignItems: 'flex-end',
  },
  valueContainer: {
    alignItems: 'flex-end',
    marginBottom: 4,
  },
  itemValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: Colors.text.primary,
  },
  itemLabel: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: Colors.text.muted,
  },
  levelBadge: {
    backgroundColor: Colors.purple[600] + '40',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  levelText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: Colors.purple[400],
  },
});