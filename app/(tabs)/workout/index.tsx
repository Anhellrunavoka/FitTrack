import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useWorkoutStore } from '@/src/store/workoutStore';
import { useUIStore } from '@/src/store/uiStore';
import { Workout } from '@/src/types/workout';
import WorkoutCard from '@/src/components/WorkoutCard';
import AddWorkoutModal from '@/src/components/addWorkoutModal';

const HomeScreen = () => {
  const router = useRouter();
  const { workouts, activeFilter, setFilter, deleteWorkout, completeWorkout } = useWorkoutStore();
  const isModalOpen = useUIStore((state) => state.isAddWorkoutModalOpen);
  const openModal = useUIStore((state) => state.openAddWorkoutModal);
  const closeModal = useUIStore((state) => state.closeAddWorkoutModal);

  const activeWorkouts = workouts.filter(
    (w) => !w.completedAt && (activeFilter === 'all' || w.category === activeFilter)
  );
  const completedWorkouts = workouts.filter(
    (w) => !!w.completedAt && (activeFilter === 'all' || w.category === activeFilter)
  );

  const totalDuration = workouts.reduce((acc, w) => acc + (w.duration || 0), 0);
  const completedCount = workouts.filter((w) => !!w.completedAt).length;

  const categories = [
    { label: 'Всі', value: 'all' },
    { label: 'Сила', value: 'Сила' },
    { label: 'Кардіо', value: 'Кардіо' },
    { label: 'Гнучкість', value: 'Гнучкість' },
  ] as const;

  const handleWorkoutPress = (workout: Workout) => {
    router.push(`/workout/${workout.id}`);
  };

  return (
    <View style={styles.mainWrapper}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>


        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Доброго ранку 👋</Text>
          <Text style={styles.subGreetingText}>Готові до тренування?</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={[styles.iconWrapper, { backgroundColor: '#F0F2FF' }]}>
              <Ionicons name="barbell-outline" size={18} color="#5B67F1" />
            </View>
            <Text style={styles.statValue}>{workouts.length}</Text>
            <Text style={styles.statLabel}>Тренувань</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.iconWrapper, { backgroundColor: '#FFF5F5' }]}>
              <Ionicons name="time-outline" size={18} color="#FF5A5A" />
            </View>
            <Text style={styles.statValue}>{totalDuration}хв</Text>
            <Text style={styles.statLabel}>Загалом</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.iconWrapper, { backgroundColor: '#EBF9F1' }]}>
              <Ionicons name="checkmark-circle-outline" size={18} color="#00C566" />
            </View>
            <Text style={styles.statValue}>{completedCount}</Text>
            <Text style={styles.statLabel}>Виконано</Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer} contentContainerStyle={styles.filterContent}>
          {categories.map((cat) => {
            const isActive = activeFilter === cat.value;
            return (
              <TouchableOpacity
                key={cat.value}
                style={[styles.filterButton, isActive && styles.activeFilterButton]}
                onPress={() => setFilter(cat.value)}
              >
                <Text style={[styles.filterButtonText, isActive && styles.activeFilterButtonText]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Text style={styles.sectionTitle}>Активні ({activeWorkouts.length})</Text>
        <View style={styles.listContainer}>
          {activeWorkouts.map((item) => (
            <WorkoutCard
              key={item.id}
              workout={item}
              onPress={handleWorkoutPress}
              onDelete={deleteWorkout}
              onComplete={completeWorkout}
            />
          ))}
        </View>

        <Text style={styles.sectionTitle}>Виконані ({completedWorkouts.length})</Text>
        <View style={styles.listContainer}>
          {completedWorkouts.map((item) => (
            <WorkoutCard
              key={item.id}
              workout={item}
              onPress={handleWorkoutPress}
              onDelete={deleteWorkout}
              onComplete={completeWorkout}
            />
          ))}
        </View>
      </ScrollView>

      <AddWorkoutModal visible={isModalOpen} onClose={closeModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 10,
    color: '#1A1A1A',
  },
  greetingContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  subGreetingText: {
    fontSize: 14,
    color: '#888888',
    marginTop: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '31%',
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  statLabel: {
    fontSize: 11,
    color: '#888888',
    marginTop: 2,
  },
  filterContainer: {
    marginTop: 20,
    maxHeight: 38,
  },
  filterContent: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  activeFilterButton: {
    backgroundColor: '#5B67F1',
    borderColor: '#5B67F1',
  },
  filterButtonText: {
    fontSize: 13,
    color: '#666666',
    fontWeight: '500',
  },
  activeFilterButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
});

export default HomeScreen;