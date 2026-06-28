import React, { useState } from 'react';
import { Modal, StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useWorkoutStore } from '../store/workoutStore';
import { COLORS } from '../constants/theme';

type Props = {
  visible: boolean;
  onClose: () => void;
};



const AddWorkoutModal = ({ visible, onClose }: Props) => {
  const addWorkout = useWorkoutStore((state) => state.addWorkout);


  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('60');
  const [category, setCategory] = useState<'Сила' | 'Кардіо' | 'Гнучкість'>('Сила');


  const handleAdd = () => {
    if (!title.trim()) return alert('Введіть назву тренування');


    const newWorkout = {
      id: Date.now().toString(),
      title: title,
      duration: parseInt(duration) || 0,
      category: category as any,
      exercises: [],
      scheduledAt: new Date().toISOString(),
    };

    addWorkout(newWorkout);


    setTitle('');
    setDuration('60');
    setCategory('Сила');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        
        {/* Хедер модалки */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Нове тренування</Text>
          <Pressable onPress={onClose} hitSlop={10}>
            <Ionicons name="close" size={26} color="black" />
          </Pressable>
        </View>

        {/* Поле: Назва */}
        <Text style={styles.label}>Назва</Text>
        <TextInput
          style={styles.input}
          placeholder="Наприклад: Силове тренування А"
          value={title}
          onChangeText={setTitle}
        />

        {/* Поле: Тривалість */}
        <Text style={styles.label}>Тривалість (хвилини)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="60"
          value={duration}
          onChangeText={setDuration}
        />

        {/* Поле: Категорія */}
        <Text style={styles.label}>Категорія</Text>
        <View style={styles.categoryContainer}>
          {(['Сила', 'Кардіо', 'Гнучкість'] as const).map((cat) => {
            const isActive = category === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryButton, isActive && styles.categoryButtonActive]}
                onPress={() => setCategory(cat)}
              >
                <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Кнопка підтвердження */}
        <TouchableOpacity style={styles.submitButton} onPress={handleAdd}>
          <Text style={styles.submitButtonText}>Додати тренування</Text>
        </TouchableOpacity>

      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 30,
  },
  categoryButton: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  categoryButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  categoryTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddWorkoutModal;