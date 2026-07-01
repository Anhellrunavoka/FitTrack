import React, { useRef } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Workout } from '../types/workout';

import { Swipeable } from 'react-native-gesture-handler';

type Props = {
  workout: Workout;
  onPress: (workout: Workout) => void;
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
};

const WorkoutCard = ({ workout, onPress, onDelete, onComplete }: Props) => {
  const swipeableRef = useRef<any>(null);
  const isWorkoutCompleted = !!workout.completedAt;

  const renderLeftActions = () => (
    <View style={styles.swipeLeftBackground}>
      <Ionicons name="checkmark-sharp" size={22} color="#FFFFFF" />
      <Text style={styles.swipeLeftText}>Готово</Text>
    </View>
  );

  const renderRightActions = () => (
    <Pressable style={styles.swipeRightBackground} onPress={() => {
      swipeableRef.current?.close();
      onDelete(workout.id);
    }}>
      <Ionicons name="trash-outline" size={24} color="#FFFFFF" />
    </Pressable>
  );

  const handleLeftOpen = () => {
    swipeableRef.current?.close();
    onComplete(workout.id);
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Гнучкість': return '#E6FFFA';
      case 'Кардіо': return '#FFF5F5';
      case 'Сила': return '#F0F5FF';
      default: return '#F7FAFC';
    }
  };

  const getCategoryTextColor = (cat: string) => {
    switch (cat) {
      case 'Гнучкість': return '#00C566';
      case 'Кардіо': return '#FF5A5A';
      case 'Сила': return '#5B67F1';
      default: return '#4A5568';
    }
  };

  return (
    <Swipeable
      ref={swipeableRef}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
      onSwipeableLeftOpen={handleLeftOpen}
      leftThreshold={80}
      rightThreshold={40}
    >
      <Pressable onPress={() => onPress(workout)} style={[styles.card, isWorkoutCompleted && styles.completedCardSide]}>
        <View style={styles.mainContent}>
          <View style={styles.headerRow}>
            <View style={styles.titleContainer}>
              {isWorkoutCompleted && (
                <Ionicons name="swap-horizontal" size={16} color="#00C566" style={styles.syncIcon} />
              )}
              <Text style={[styles.title, isWorkoutCompleted && styles.completedText]}>
                {workout.title}
              </Text>
            </View>
            <View style={[styles.badge, { backgroundColor: isWorkoutCompleted ? '#EBF9F1' : getCategoryColor(workout.category) }]}>
              <Text style={[styles.badgeText, { color: isWorkoutCompleted ? '#00C566' : getCategoryTextColor(workout.category) }]}>
                {isWorkoutCompleted ? '✓ Виконано' : workout.category}
              </Text>
            </View>
          </View>

          <View style={styles.footerRow}>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={14} color="#888888" />
              <Text style={styles.metaText}>{workout.duration} хв</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="list-outline" size={14} color="#888888" />
              <Text style={styles.metaText}>{workout.exercises?.length || 0} вправ</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="calendar-outline" size={14} color={isWorkoutCompleted ? '#00C566' : '#888888'} />
              <Text style={[styles.metaText, isWorkoutCompleted && styles.completedDateText]}>
                {isWorkoutCompleted ? '29 черв.' : 'ср, 22 січ.'}
              </Text>
            </View>
          </View>
        </View>

        {!isWorkoutCompleted && (
          <Ionicons name="chevron-forward" size={18} color="#CCCCCC" style={styles.arrowIcon} />
        )}

        {isWorkoutCompleted && (
          <Ionicons name="checkmark-circle" size={20} color="#00C566" style={styles.checkmarkIcon} />
        )}
      </Pressable>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  completedCardSide: {
    borderLeftWidth: 4,
    borderLeftColor: '#00C566',
  },
  mainContent: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 8,
  },
  syncIcon: {
    marginRight: 6,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  completedText: {
    color: '#666666',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    fontSize: 12,
    color: '#888888',
    marginLeft: 4,
  },
  completedDateText: {
    color: '#00C566',
  },
  arrowIcon: {
    marginLeft: 4,
  },
  checkmarkIcon: {
    marginLeft: 8,
  },
  swipeLeftBackground: {
    backgroundColor: '#00C566',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 24,
    borderRadius: 16,
    marginBottom: 12,
    flex: 1,
  },
  swipeLeftText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 4,
  },
  swipeRightBackground: {
    backgroundColor: '#FF5A5A',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    borderRadius: 16,
    marginBottom: 12,
    marginLeft: 8,
  },
});

export default WorkoutCard;