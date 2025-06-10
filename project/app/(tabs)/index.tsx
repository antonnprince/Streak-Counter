import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { Flame, Calendar, Target, Award, TrendingUp, Zap } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const [streaks, setStreaks] = useState(0);
  const [todayCompleted, setTodayCompleted] = useState(false);
  const [weeklyGoal, setWeeklyGoal] = useState(7);
  const [monthlyStreak, setMonthlyStreak] = useState(0);

  useEffect(() => {
    loadStreakData();
  }, []);

  const loadStreakData = async () => {
    try {
      const streakCount = await AsyncStorage.getItem('streaks');
      const completed = await AsyncStorage.getItem('todayCompleted');
      const monthly = await AsyncStorage.getItem('monthlyStreak');
      
      if (streakCount) setStreaks(parseInt(streakCount));
      if (completed) setTodayCompleted(JSON.parse(completed));
      if (monthly) setMonthlyStreak(parseInt(monthly));
    } catch (error) {
      console.error('Error loading streak data:', error);
    }
  };

  const markTodayComplete = async () => {
    if (!todayCompleted) {
      setTodayCompleted(true);
      setStreaks(prev => prev + 1);
      await AsyncStorage.setItem('todayCompleted', JSON.stringify(true));
      await AsyncStorage.setItem('streaks', (streaks + 1).toString());
    }
  };

  const StatCard = ({ icon: Icon, title, value, color, subtitle }: any) => (
    <Animated.View entering={FadeInUp.delay(200)} style={[styles.statCard]}>
      <LinearGradient
        colors={[Colors.background.card, Colors.background.secondary]}
        style={styles.statGradient}
      >
        <View style={styles.statIcon}>
          <Icon size={24} color={color} />
        </View>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statTitle}>{title}</Text>
        {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
      </LinearGradient>
    </Animated.View>
  );

  const QuickAction = ({ icon: Icon, title, description, onPress, color }: any) => (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Animated.View entering={FadeInDown.delay(300)} style={styles.actionCard}>
        <LinearGradient
          colors={[Colors.background.card, Colors.background.secondary]}
          style={styles.actionGradient}
        >
          <View style={[styles.actionIcon, { backgroundColor: color + '20' }]}>
            <Icon size={20} color={color} />
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>{title}</Text>
            <Text style={styles.actionDescription}>{description}</Text>
          </View>
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={Colors.gradient.secondary}
        style={styles.backgroundGradient}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <Animated.View entering={FadeInUp} style={styles.header}>
            <Text style={styles.greeting}>Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}!</Text>
            <Text style={styles.subtitle}>Ready to maintain your streak?</Text>
          </Animated.View>

          {/* Main Streak Display */}
          <Animated.View entering={FadeInUp.delay(100)} style={styles.mainStreakCard}>
            <LinearGradient
              colors={Colors.gradient.primary}
              style={styles.streakGradient}
            >
              <View style={styles.streakContent}>
                <Flame size={48} color="#FFFFFF" />
                <Text style={styles.streakNumber}>{streaks}</Text>
                <Text style={styles.streakLabel}>Day Streak</Text>
                <Text style={styles.streakMotivation}>
                  {streaks === 0 ? "Start your journey today!" : 
                   streaks < 7 ? "You're building momentum!" :
                   streaks < 30 ? "Amazing progress!" : "You're unstoppable!"}
                </Text>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Today's Action */}
          {!todayCompleted && (
            <Animated.View entering={FadeInUp.delay(150)} style={styles.todayAction}>
              <TouchableOpacity onPress={markTodayComplete} activeOpacity={0.8}>
                <LinearGradient
                  colors={Colors.gradient.accent}
                  style={styles.actionButton}
                >
                  <Zap size={24} color="#FFFFFF" />
                  <Text style={styles.actionButtonText}>Mark Today Complete</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          )}

          {todayCompleted && (
            <Animated.View entering={FadeInUp.delay(150)} style={styles.completedAction}>
              <View style={styles.completedBadge}>
                <Award size={20} color={Colors.accent.success} />
                <Text style={styles.completedText}>Today's goal completed! 🎉</Text>
              </View>
            </Animated.View>
          )}

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            <StatCard
              icon={Calendar}
              title="This Week"
              value={`${Math.min(streaks % 7, 7)}/7`}
              color={Colors.blue[400]}
              subtitle="Days completed"
            />
            <StatCard
              icon={Target}
              title="Monthly"
              value={monthlyStreak}
              color={Colors.pink[400]}
              subtitle="Best streak"
            />
            <StatCard
              icon={TrendingUp}
              title="Progress"
              value={`${Math.round((streaks / 30) * 100)}%`}
              color={Colors.purple[400]}
              subtitle="To 30 days"
            />
            <StatCard
              icon={Award}
              title="Level"
              value={Math.floor(streaks / 7) + 1}
              color={Colors.accent.warning}
              subtitle="Streak master"
            />
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActions}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <QuickAction
              icon={Target}
              title="Set Daily Goal"
              description="Customize your daily targets"
              color={Colors.purple[400]}
              onPress={() => {}}
            />
            <QuickAction
              icon={Calendar}
              title="View Calendar"
              description="Track your progress over time"
              color={Colors.blue[400]}
              onPress={() => {}}
            />
            <QuickAction
              icon={Award}
              title="Achievements"
              description="Unlock badges and rewards"
              color={Colors.pink[400]}
              onPress={() => {}}
            />
          </View>

          {/* Motivational Quotes */}
          <Animated.View entering={FadeInDown.delay(400)} style={styles.motivationCard}>
            <LinearGradient
              colors={[Colors.background.card, Colors.background.secondary]}
              style={styles.motivationGradient}
            >
              <Text style={styles.quoteText}>
                "Success is the sum of small efforts repeated day in and day out."
              </Text>
              <Text style={styles.quoteAuthor}>- Robert Collier</Text>
            </LinearGradient>
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
    marginBottom: 30,
  },
  greeting: {
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
  mainStreakCard: {
    marginBottom: 30,
    borderRadius: 24,
    overflow: 'hidden',
  },
  streakGradient: {
    padding: 32,
    alignItems: 'center',
  },
  streakContent: {
    alignItems: 'center',
  },
  streakNumber: {
    fontSize: 72,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 8,
  },
  streakLabel: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 8,
  },
  streakMotivation: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    opacity: 0.8,
    textAlign: 'center',
  },
  todayAction: {
    marginBottom: 30,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 16,
    gap: 12,
  },
  actionButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  completedAction: {
    marginBottom: 30,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: Colors.accent.success + '20',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.accent.success + '40',
    gap: 8,
  },
  completedText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.accent.success,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 30,
  },
  statCard: {
    width: (width - 60) / 2,
    borderRadius: 16,
    overflow: 'hidden',
  },
  statGradient: {
    padding: 20,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
  },
  statIcon: {
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.secondary,
    marginBottom: 2,
  },
  statSubtitle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.text.muted,
  },
  quickActions: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: Colors.text.primary,
    marginBottom: 16,
  },
  actionCard: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  actionGradient: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text.muted,
  },
  motivationCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
  },
  motivationGradient: {
    padding: 24,
  },
  quoteText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.text.primary,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 24,
  },
  quoteAuthor: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.secondary,
    textAlign: 'center',
  },
});