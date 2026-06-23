import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, FlatList } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Ionicons from '@expo/vector-icons/Ionicons';

interface LogItem {
  id: string;
  amount: number;
  time: string;
}

const DAILY_TARGET = 1500;

export default function WaterTracker() {
  const [currentWater, setCurrentWater] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedVolume, setSelectedVolume] = useState<number>(300);
  const [logs, setLogs] = useState<LogItem[]>([]);

  const handleAddWater = () => {
    const newTotal = currentWater + selectedVolume;
    setCurrentWater(newTotal);

    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timeString = `${hours}:${minutes}`;

    const newLog: LogItem = {
      id: Date.now().toString(),
      amount: selectedVolume,
      time: timeString
    };

    setLogs([newLog, ...logs]);
    setModalVisible(false);
  };

  const fillPercentage = (currentWater / DAILY_TARGET) * 100;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WaterTracker</Text>

      <AnimatedCircularProgress
        size={220}
        width={15}
        fill={fillPercentage > 100 ? 100 : fillPercentage}
        tintColor="#00a8ff"
        backgroundColor="#e1b12c"
        rotation={0}
        lineCap="round"
      >
        {() => (
          <View style={styles.progressTextContainer}>
            <Text style={styles.progressText}>{currentWater}/{DAILY_TARGET} ml</Text>
            <Text style={styles.subText}>Daily Drink Target</Text>
          </View>
        )}
      </AnimatedCircularProgress>

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>ДОДАТИ</Text>
      </TouchableOpacity>

      <FlatList
        data={logs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.logText}>+{item.amount} ml o {item.time}</Text>
        )}
        style={styles.logList}
        contentContainerStyle={{ alignItems: 'center' }}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Виберіть кількість:</Text>

            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={[styles.volumeOption, selectedVolume === 100 && styles.activeOption]}
                onPress={() => setSelectedVolume(100)}
              >
                <Ionicons name="water-outline" size={32} color={selectedVolume === 100 ? "#00a8ff" : "#555"} />
                <Text style={[styles.optionText, selectedVolume === 100 && styles.activeOptionText]}>100 ml</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.volumeOption, selectedVolume === 300 && styles.activeOption]}
                onPress={() => setSelectedVolume(300)}
              >
                <Ionicons name="wine-outline" size={32} color={selectedVolume === 300 ? "#00a8ff" : "#555"} />
                <Text style={[styles.optionText, selectedVolume === 300 && styles.activeOptionText]}>300 ml</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.volumeOption, selectedVolume === 500 && styles.activeOption]}
                onPress={() => setSelectedVolume(500)}
              >
                <Ionicons name="beer-outline" size={32} color={selectedVolume === 500 ? "#00a8ff" : "#555"} />
                <Text style={[styles.optionText, selectedVolume === 500 && styles.activeOptionText]}>500 ml</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.btn, styles.btnOk]} onPress={handleAddWater}>
                <Text style={styles.btnText}>ОК</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.btn, styles.btnCancel]} onPress={() => setModalVisible(false)}>
                <Text style={styles.btnText}>Скасувати</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  progressTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  subText: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 4,
  },
  addButton: {
    backgroundColor: '#00a8ff',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 30,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logList: {
    marginTop: 20,
    width: '100%',
  },
  logText: {
    fontSize: 14,
    color: '#555',
    marginVertical: 4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalView: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: '600',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 25,
  },
  volumeOption: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    width: 75,
  },
  activeOption: {
    borderColor: '#00a8ff',
    backgroundColor: '#e6f7ff',
  },
  optionText: {
    marginTop: 5,
    fontSize: 12,
    color: '#555',
  },
  activeOptionText: {
    color: '#00a8ff',
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  btn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  btnOk: {
    backgroundColor: '#00a8ff',
  },
  btnCancel: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  btnText: {
    fontWeight: 'bold',
    color: '#333',
  },
});