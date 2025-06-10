import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { User, Settings, Award, Calendar, Flame, Trophy, Target, Star, Crown, Shield } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import Animated, { FadeInUp, FadeInDown, BounceIn } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const [streaks, setStreaks] = useState(0);
  const [weeks, setWeeks] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [level, setLevel] = useState(1);
  const [badges, setBadges] = useState<string[]>([]);

  const today = new Date().toISOString().split('T')[0];

  const calculateStreaks = async () => {
    const lastOpened = await AsyncStorage.getItem('lastOpened');
    const streakCount = await AsyncStorage.getItem('streaks');
    const totalDaysCount = await AsyncStorage.getItem('totalDays');
    const longestStreakCount = await AsyncStorage.getItem('longestStreak');

    const formattedLastOpened = lastOpened ? JSON.parse(lastOpened) : null;
    const formattedStreaks = streakCount ? parseInt(streakCount) : 0;
    const formattedTotalDays = totalDaysCount ? parseInt(totalDaysCount) : 0;
    const formattedLongestStreak = longestStreakCount ? parseInt(longestStreakCount) : 0;

    setStreaks(formattedStreaks);
    setTotalDays(formattedTotalDays);
    setLongestStreak(Math.max(formattedLongestStreak, formattedStreaks));

    if (!formattedLastOpened) {
      setStreaks(1);
      setTotalDays(1);
      await AsyncStorage.setItem('streaks', '1');
      await AsyncStorage.setItem('totalDays', '1');
      await AsyncStorage.setItem('longestStreak', '1');
      await AsyncStorage.setItem('lastOpened', JSON.stringify(today));
      return;
    }

    const todayDate = new Date(today);
    const lastOpenedDate = new Date(formattedLastOpened);
    const difference = (todayDate.getTime() - lastOpenedDate.getTime()) / (1000 * 60 * 60 * 24);

    if (difference === 1) {
      const newStreaks = formattedStreaks + 1;
      const newTotalDays = formattedTotalDays + 1;
      const newLongestStreak = Math.max(formattedLongestStreak, newStreaks);
      
      setStreaks(newStreaks);
      setTotalDays(newTotalDays);
      setLongestStreak(newLongestStreak);
      
      await AsyncStorage.setItem('streaks', newStreaks.toString());
      await AsyncStorage.setItem('totalDays', newTotalDays.toString());
      await AsyncStorage.setItem('longestStreak', newLongestStreak.toString());
    } else if (difference > 1) {
      setStreaks(1);
      const newTotalDays = formattedTotalDays + 1;
      setTotalDays(newTotalDays);
      await AsyncStorage.setItem('streaks', '1');
      await AsyncStorage.setItem('totalDays', newTotalDays.toString());
    }

    await AsyncStorage.setItem('lastOpened', JSON.stringify(today));
  };

  const showToast = () => {
    Toast.show({
      type: 'info',
      text1: 'Welcome John Doe',
      text2: `You're on a ${streaks}-day streak!`,
    });
  };

  const showMilestoneMessage = () => {
    if (weeks > 0) {
      Toast.show({
        type: 'success',
        text1: 'Congrats John Doe',
        text2: `You've reached a new milestone streak of ${weeks} week${weeks > 1 ? 's' : ''}!`,
      });
    }
  };

  const calculateLevel = () => {
    const newLevel = Math.floor(totalDays / 7) + 1;
    setLevel(newLevel);
    return newLevel;
  };

  const updateBadges = () => {
    const newBadges: string[] = [];
    if (streaks >= 7) newBadges.push('week_warrior');
    if (streaks >= 30) newBadges.push('month_master');
    if (streaks >= 100) newBadges.push('century_champion');
    if (longestStreak >= 50) newBadges.push('consistency_king');
    if (totalDays >= 365) newBadges.push('year_veteran');
    setBadges(newBadges);
  };

  useEffect(() => {
    calculateStreaks();
  }, []);

  useEffect(() => {
    if (streaks > 0) {
      showToast();
    }
  }, [streaks]);

  useEffect(() => {
    if (streaks % 7 === 0 && streaks !== 0) {
      setWeeks(streaks / 7);
    }
  }, [streaks]);

  useEffect(() => {
    showMilestoneMessage();
  }, [weeks]);

  useEffect(() => {
    calculateLevel();
    updateBadges();
  }, [totalDays, streaks, longestStreak]);

  const StatItem = ({ icon: Icon, label, value, color }: any) => (
    <Animated.View entering={FadeInUp.delay(200)} style={styles.statItem}>
      <View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
        <Icon size={20} color={color} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </Animated.View>
  );

  const BadgeItem = ({ type, title, description }: any) => {
    const getBadgeIcon = () => {
      switch (type) {
        case 'week_warrior': return <Trophy size={20} color={Colors.accent.warning} />;
        case 'month_master': return <Crown size={20} color={Colors.purple[400]} />;
        case 'century_champion': return <Star size={20} color={Colors.pink[400]} />;
        case 'consistency_king': return <Shield size={20} color={Colors.blue[400]} />;
        case 'year_veteran': return <Award size={20} color={Colors.accent.success} />;
        default: return <Award size={20} color={Colors.text.secondary} />;
      }
    };

    return (
      <Animated.View entering={BounceIn.delay(300)} style={styles.badgeItem}>
        <LinearGradient
          colors={[Colors.background.card, Colors.background.secondary]}
          style={styles.badgeGradient}
        >
          <View style={styles.badgeIcon}>
            {getBadgeIcon()}
          </View>
          <Text style={styles.badgeTitle}>{title}</Text>
          <Text style={styles.badgeDescription}>{description}</Text>
        </LinearGradient>
      </Animated.View>
    );
  };

  const activeBadges = [
    { type: 'week_warrior', title: 'Week Warrior', description: '7 day streak', unlocked: streaks >= 7 },
    { type: 'month_master', title: 'Month Master', description: '30 day streak', unlocked: streaks >= 30 },
    { type: 'century_champion', title: 'Century Champion', description: '100 day streak', unlocked: streaks >= 100 },
    { type: 'consistency_king', title: 'Consistency King', description: '50+ longest streak', unlocked: longestStreak >= 50 },
    { type: 'year_veteran', title: 'Year Veteran', description: '365 total days', unlocked: totalDays >= 365 },
  ].filter(badge => badge.unlocked);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={Colors.gradient.secondary}
        style={styles.backgroundGradient}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <Animated.View entering={FadeInUp} style={styles.header}>
            <TouchableOpacity style={styles.settingsButton}>
              <Settings size={24} color={Colors.text.secondary} />
            </TouchableOpacity>
          </Animated.View>

          {/* Profile Card */}
          <Animated.View entering={FadeInUp.delay(100)} style={styles.profileCard}>
            <LinearGradient
              colors={Colors.gradient.primary}
              style={styles.profileGradient}
            >
              <Image
                source={{ uri: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200' }}
                style={styles.profileImage}
              />
              <Text style={styles.username}>@johndoe32</Text>
              <Text style={styles.playerName}>John Doe</Text>
              <View style={styles.levelBadge}>
                <Crown size={16} color="#FFFFFF" />
                <Text style={styles.levelText}>Level {level}</Text>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Main Stats */}
          <Animated.View entering={FadeInUp.delay(150)} style={styles.mainStats}>
            <View style={styles.currentStreakCard}>
              <LinearGradient
                colors={Colors.gradient.accent}
                style={styles.streakCardGradient}
              >
                <Flame size={32} color="#FFFFFF" />
                <Text style={styles.currentStreakNumber}>{streaks}</Text>
                <Text style={styles.currentStreakLabel}>Current Streak</Text>
              </LinearGradient>
            </View>
          </Animated.View>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            <StatItem
              icon={Trophy}
              label="Longest Streak"
              value={longestStreak}
              color={Colors.accent.warning}
            />
            <StatItem
              icon={Calendar}
              label="Total Days"
              value={totalDays}
              color={Colors.blue[400]}
            />
            <StatItem
              icon={Target}
              label="This Week"
              value={`${Math.min(streaks % 7, 7)}/7`}
              color={Colors.pink[400]}
            />
            <StatItem
              icon={Star}
              label="Achievements"
              value={activeBadges.length}
              color={Colors.purple[400]}
            />
          </View>

          {/* Achievements Section */}
          <View style={styles.achievementsSection}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            {activeBadges.length > 0 ? (
              <View style={styles.badgesGrid}>
                {activeBadges.map((badge, index) => (
                  <BadgeItem
                    key={badge.type}
                    type={badge.type}
                    title={badge.title}
                    description={badge.description}
                  />
                ))}
              </View>
            ) : (
              <Animated.View entering={FadeInDown} style={styles.noBadges}>
                <Award size={48} color={Colors.text.muted} />
                <Text style={styles.noBadgesText}>Start your streak to unlock badges!</Text>
              </Animated.View>
            )}
          </View>

          {/* Progress Section */}
          <Animated.View entering={FadeInDown.delay(400)} style={styles.progressSection}>
            <Text style={styles.sectionTitle}>Next Milestone</Text>
            <View style={styles.progressCard}>
              <LinearGradient
                colors={[Colors.background.card, Colors.background.secondary]}
                style={styles.progressGradient}
              >
                <View style={styles.progressHeader}>
                  <Text style={styles.progressTitle}>
                    {streaks < 7 ? 'Week Warrior' : 
                     streaks < 30 ? 'Month Master' : 
                     streaks < 100 ? 'Century Champion' : 'Streak Legend'}
                  </Text>
                  <Text style={styles.progressSubtitle}>
                    {streaks < 7 ? `${7 - streaks} days to go` : 
                     streaks < 30 ? `${30 - streaks} days to go` : 
                     streaks < 100 ? `${100 - streaks} days to go` : 'Maximum level reached!'}
                  </Text>
                </View>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { 
                        width: `${Math.min(
                          streaks < 7 ? (streaks / 7) * 100 : 
                          streaks < 30 ? (streaks / 30) * 100 : 
                          streaks < 100 ? (streaks / 100) * 100 : 100, 
                          100
                        )}%` 
                      }
                    ]} 
                  />
                </View>
              </LinearGradient>
            </View>
          </Animated.View>
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
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  settingsButton: {
    padding: 8,
  },
  profileCard: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 30,
  },
  profileGradient: {
    padding: 32,
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  username: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 4,
  },
  playerName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  levelText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  mainStats: {
    marginBottom: 30,
  },
  currentStreakCard: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  streakCardGradient: {
    padding: 24,
    alignItems: 'center',
  },
  currentStreakNumber: {
    fontSize: 48,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginTop: 8,
    marginBottom: 4,
  },
  currentStreakLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    opacity: 0.9,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 30,
  },
  statItem: {
    width: (width - 60) / 2,
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.text.muted,
    textAlign: 'center',
  },
  achievementsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: Colors.text.primary,
    marginBottom: 16,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  badgeItem: {
    width: (width - 64) / 2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  badgeGradient: {
    padding: 16,
    alignItems: 'center',
    minHeight: 100,
  },
  badgeIcon: {
    marginBottom: 8,
  },
  badgeTitle: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: 4,
  },
  badgeDescription: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: Colors.text.muted,
    textAlign: 'center',
  },
  noBadges: {
    alignItems: 'center',
    padding: 40,
  },
  noBadgesText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.text.muted,
    textAlign: 'center',
    marginTop: 16,
  },
  progressSection: {
    marginBottom: 20,
  },
  progressCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  progressGradient: {
    padding: 20,
  },
  progressHeader: {
    marginBottom: 16,
  },
  progressTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  progressSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.primary[800],
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.purple[400],
    borderRadius: 4,
  },
});