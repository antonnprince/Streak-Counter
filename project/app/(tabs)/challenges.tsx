import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { Target, Zap, Calendar, CircleCheck as CheckCircle, Circle, Clock, Flame } from 'lucide-react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: 'daily' | 'weekly' | 'monthly';
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  completed: boolean;
  daysLeft?: number;
}

export default function ChallengesScreen() {
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: '1',
      title: 'Morning Momentum',
      description: 'Complete your streak before 10 AM',
      category: 'daily',
      difficulty: 'easy',
      points: 10,
      completed: false,
    },
    {
      id: '2',
      title: 'Consistency King',
      description: 'Maintain your streak for 7 days straight',
      category: 'weekly',
      difficulty: 'medium',
      points: 50,
      completed: false,
      daysLeft: 5,
    },
    {
      id: '3',
      title: 'Century Challenge',
      description: 'Reach a 100-day streak milestone',
      category: 'monthly',
      difficulty: 'hard',
      points: 500,
      completed: false,
      daysLeft: 23,
    },
    {
      id: '4',
      title: 'Weekend Warrior',
      description: 'Complete tasks on both weekend days',
      category: 'weekly',
      difficulty: 'medium',
      points: 30,
      completed: true,
    },
    {
      id: '5',
      title: 'Early Bird',
      description: 'Complete 5 consecutive morning sessions',
      category: 'weekly',
      difficulty: 'easy',
      points: 25,
      completed: false,
      daysLeft: 2,
    },
  ]);

  const [activeTab, setActiveTab] = useState<'all' | 'daily' | 'weekly' | 'monthly'>('all');

  const toggleChallenge = (id: string) => {
    setChallenges(prev => prev.map(challenge => 
      challenge.id === id 
        ? { ...challenge, completed: !challenge.completed }
        : challenge
    ));
  };

  const filteredChallenges = challenges.filter(challenge => 
    activeTab === 'all' || challenge.category === activeTab
  );

  const completedCount = challenges.filter(c => c.completed).length;
  const totalPoints = challenges.filter(c => c.completed).reduce((sum, c) => sum + c.points, 0);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return Colors.accent.success;
      case 'medium': return Colors.accent.warning;
      case 'hard': return Colors.accent.error;
      default: return Colors.text.muted;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'daily': return <Zap size={16} color={Colors.blue[400]} />;
      case 'weekly': return <Calendar size={16} color={Colors.purple[400]} />;
      case 'monthly': return <Target size={16} color={Colors.pink[400]} />;
      default: return <Target size={16} color={Colors.text.muted} />;
    }
  };

  const TabButton = ({ title, isActive, onPress }: any) => (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.tabButton, isActive && styles.tabButtonActive]}>
        <Text style={[styles.tabButtonText, isActive && styles.tabButtonTextActive]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const ChallengeCard = ({ challenge, index }: any) => (
    <Animated.View entering={FadeInUp.delay(index * 100)} style={styles.challengeCard}>
      <TouchableOpacity onPress={() => toggleChallenge(challenge.id)} activeOpacity={0.8}>
        <LinearGradient
          colors={challenge.completed 
            ? [Colors.accent.success + '20', Colors.accent.success + '10']
            : [Colors.background.card, Colors.background.secondary]
          }
          style={styles.challengeGradient}
        >
          <View style={styles.challengeHeader}>
            <View style={styles.challengeIconContainer}>
              {challenge.completed ? (
                <CheckCircle size={24} color={Colors.accent.success} />
              ) : (
                <Circle size={24} color={Colors.text.muted} />
              )}
            </View>
            <View style={styles.challengeMeta}>
              <View style={styles.categoryBadge}>
                {getCategoryIcon(challenge.category)}
                <Text style={styles.categoryText}>
                  {challenge.category.charAt(0).toUpperCase() + challenge.category.slice(1)}
                </Text>
              </View>
              <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(challenge.difficulty) + '20' }]}>
                <Text style={[styles.difficultyText, { color: getDifficultyColor(challenge.difficulty) }]}>
                  {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.challengeContent}>
            <Text style={[styles.challengeTitle, challenge.completed && styles.challengeTitleCompleted]}>
              {challenge.title}
            </Text>
            <Text style={styles.challengeDescription}>{challenge.description}</Text>
            
            <View style={styles.challengeFooter}>
              <View style={styles.pointsBadge}>
                <Flame size={14} color={Colors.accent.warning} />
                <Text style={styles.pointsText}>{challenge.points} pts</Text>
              </View>
              {challenge.daysLeft && !challenge.completed && (
                <View style={styles.timeLeftBadge}>
                  <Clock size={14} color={Colors.text.muted} />
                  <Text style={styles.timeLeftText}>{challenge.daysLeft} days left</Text>
                </View>
              )}
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
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
            <Text style={styles.title}>Challenges</Text>
            <Text style={styles.subtitle}>Push your limits and earn rewards</Text>
          </Animated.View>

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            <Animated.View entering={FadeInUp.delay(100)} style={styles.statCard}>
              <LinearGradient
                colors={Colors.gradient.primary}
                style={styles.statGradient}
              >
                <Text style={styles.statNumber}>{completedCount}</Text>
                <Text style={styles.statLabel}>Completed</Text>
              </LinearGradient>
            </Animated.View>

            <Animated.View entering={FadeInUp.delay(150)} style={styles.statCard}>
              <LinearGradient
                colors={Colors.gradient.accent}
                style={styles.statGradient}
              >
                <Text style={styles.statNumber}>{totalPoints}</Text>
                <Text style={styles.statLabel}>Points Earned</Text>
              </LinearGradient>
            </Animated.View>
          </View>

          {/* Filter Tabs */}
          <Animated.View entering={FadeInUp.delay(200)} style={styles.tabsContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
              <TabButton
                title="All"
                isActive={activeTab === 'all'}
                onPress={() => setActiveTab('all')}
              />
              <TabButton
                title="Daily"
                isActive={activeTab === 'daily'}
                onPress={() => setActiveTab('daily')}
              />
              <TabButton
                title="Weekly"
                isActive={activeTab === 'weekly'}
                onPress={() => setActiveTab('weekly')}
              />
              <TabButton
                title="Monthly"
                isActive={activeTab === 'monthly'}
                onPress={() => setActiveTab('monthly')}
              />
            </ScrollView>
          </Animated.View>

          {/* Challenges List */}
          <View style={styles.challengesList}>
            {filteredChallenges.map((challenge, index) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
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
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  statGradient: {
    padding: 20,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    opacity: 0.9,
  },
  tabsContainer: {
    marginBottom: 24,
  },
  tabsScroll: {
    paddingHorizontal: 4,
    gap: 12,
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Colors.background.card,
  },
  tabButtonActive: {
    backgroundColor: Colors.purple[600],
  },
  tabButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.muted,
  },
  tabButtonTextActive: {
    color: '#FFFFFF',
  },
  challengesList: {
    gap: 16,
  },
  challengeCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  challengeGradient: {
    padding: 20,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  challengeIconContainer: {
    marginRight: 16,
    marginTop: 2,
  },
  challengeMeta: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.primary + '40',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  categoryText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.secondary,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  challengeContent: {
    marginLeft: 40,
  },
  challengeTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  challengeTitleCompleted: {
    textDecorationLine: 'line-through',
    opacity: 0.7,
  },
  challengeDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  challengeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pointsText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: Colors.accent.warning,
  },
  timeLeftBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeLeftText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.text.muted,
  },
});