import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState('');
  const [text, setText] = useState('');
  const [days, setDays] = useState<{ id: string; date: string; text: string }[]>([]);

  // ✅ 일정 추가
  const addDay = () => {
    if (!selectedDate || text.trim() === '') return;

    setDays([
      ...days,
      { id: Date.now().toString(), date: selectedDate, text },
    ]);
    setText('');
  };

  // ✅ 일정 삭제
  const deleteDay = (id: string) => {
    setDays(days.filter((item) => item.id !== id));
  };

  // ✅ 현재 선택된 날짜의 일정만 필터링
  const filteredDays = days.filter((item) => item.date === selectedDate);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>☁️ Day Store ☁️</Text>

      {/* 🗓 달력 */}
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: '#ffb84d' },
          ...days.reduce((acc, curr) => {
            acc[curr.date] = { marked: true, dotColor: '#ffb84d' };
            return acc;
          }, {} as any),
        }}
        theme={{
          todayTextColor: '#ff6b6b',
          arrowColor: '#ffb84d',
        }}
      />

      {selectedDate ? (
        <Text style={styles.selectedText}>
          🗓️ {selectedDate}
        </Text>
      ) : (
        <Text style={styles.selectedText}>날짜를 선택해주세요</Text>
      )}

      {/* ✏️ 일정 입력 */}
      <TextInput
        style={styles.input}
        placeholder="오늘의 하루를 적어보세요 ☀️"
        value={text}
        onChangeText={setText}
      />

      <TouchableOpacity style={styles.button} onPress={addDay}>
        <Text style={styles.buttonText}>저장</Text>
      </TouchableOpacity>

      {/* 📋 일정 목록 (선택된 날짜 기준) */}
      <FlatList
        data={filteredDays}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>🗒 {item.text}</Text>
            <TouchableOpacity onPress={() => deleteDay(item.id)}>
              <Text style={styles.delete}>삭제</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          selectedDate ? (
            <Text style={styles.empty}>이 날에는 기록이 없어요 🥲</Text>
          ) : (
            <Text style={styles.empty}>날짜를 선택해주세요</Text>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffaf0',
    padding: 16,
    paddingTop: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  selectedText: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 10,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 12,
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#ffb84d',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    flexShrink: 1,
  },
  delete: {
    color: '#ff6b6b',
    fontWeight: 'bold',
  },
  empty: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 40,
  },
});
