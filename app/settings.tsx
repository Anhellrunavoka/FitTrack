import React, { useState } from 'react';
import { StyleSheet, View, Text, Switch, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from '@/src/constants/theme';



const SettingsScreen = () => {
  const router = useRouter();

  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  return (
    <View style={styles.container}>
      {/* Заголовок екрану */}
      <View style={styles.header}>
        <Ionicons name="menu" size={24} color={COLORS.textPrimary} style={styles.menuIcon} />
        <Text style={styles.headerTitle}>Налаштування</Text>
      </View>

      {/* Секція ЗАГАЛЬНІ */}
      <Text style={styles.sectionTitle}>ЗАГАЛЬНІ</Text>
      <View style={styles.card}>
        {/* Нагадування тренувань */}
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Ionicons name="notifications-outline" size={20} color={COLORS.textSecondary} />
            <Text style={styles.rowLabel}>Нагадування тренувань</Text>
          </View>
          <Switch
            value={remindersEnabled}
            onValueChange={setRemindersEnabled}
            trackColor={{ false: COLORS.primary, true: COLORS.success }}
            thumbColor="#FFF"
          />
        </View>

        <View style={styles.divider} />

        {/* Темна тема */}
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Ionicons name="moon-outline" size={20} color={COLORS.textSecondary} />
            <Text style={styles.rowLabel}>Темна тема</Text>
          </View>
          <Switch
            value={darkModeEnabled}
            onValueChange={setDarkModeEnabled}
            trackColor={{ false: COLORS.primary, true: COLORS.success }}
            thumbColor="#FFF"
          />
        </View>
      </View>

      {/* Секція АКАУНТ */}
      <Text style={styles.sectionTitle}>АКАУНТ</Text>
      <View style={styles.card}>
        {/* Профіль */}
        <Pressable style={styles.row} onPress={() => router.push('/profile')}>
          <View style={styles.rowLeft}>
            <Ionicons name="person-outline" size={20} color={COLORS.textSecondary} />
            <Text style={styles.rowLabel}>
              Профіль 
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={COLORS.textSecondary} />
        </Pressable>

        <View style={styles.divider} />

        {/* Конфіденційність */}
        <Pressable style={styles.row} onPress={() => router.push('/conf')}>
          <View style={styles.rowLeft}>
            <Ionicons name="shield-outline" size={20} color={COLORS.textSecondary} />
            <Text style={styles.rowLabel}>Конфіденційність</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={COLORS.textSecondary} />
        </Pressable>
      </View>

      {/* Футер: Версія */}
      <Text style={styles.versionText}>FitTrack v1.0.0 · Тиждень 3</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  menuIcon: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 8,
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 4,
    paddingHorizontal: 16,
    marginBottom: 25,
    // Легка тінь для красивого виділення картки
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  rowLabel: {
    fontSize: 16,
    color: COLORS.textPrimary,
    fontWeight: '400',
  },
 
  divider: {
    height: 0.5,
    backgroundColor: COLORS.border,
    marginLeft: 32,
  },
  footerText: {
    textAlign: 'center',
    color: COLORS.primary,
    fontSize: 14,
    marginTop: 5,
  },
  versionText: {
    textAlign: 'center',
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 8,
  },
});

export default SettingsScreen;