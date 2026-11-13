import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [n, setN] = useState(0);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expo + Docker + Render</Text>
      <Text>แก้ไฟล์ App.js แล้วบันทึก ดูผลทันที</Text>
      <Text style={styles.count}>{n}</Text>
      <Button title="กดเพิ่ม" onPress={() => setN(n + 1)} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', gap: 12 },
  title: { fontSize: 24, fontWeight: 'bold' },
  count: { fontSize: 48 },
});
