import React, { useState } from 'react';
import { FlatList, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function index() {
  const [selectedDate, setSelectedDate] = useState('');
  const [text, setText] = useState('');
  const [days, setDays] = useState<{ id: string; date: string; text: string }[]>([]);

  // 일정 추가
  const addDay = () => {
    if (!selectedDate || text.trim() === '') return; // 날짜 선택 안함 또는 공백일 경우 건뛰

    setDays([
      ...days, // 지금까지 저장된 배열 + 새로운 일정 추가
      { id: Date.now().toString(), date: selectedDate, text }, 
    ]);
    setText(''); // 일정 등록 후 입력칸 공백
  };

  // 일정 삭제
  const deleteDay = (id: string) => {
    setDays(days.filter((item) => item.id !== id));
  };

  // 현재 선택된 날짜의 일정만 필터링
  const select_day = days.filter((item) => item.date === selectedDate);

  return (
    <ImageBackground 
      source={require("../assets/images/background.jpg")}
      style={styles.background}
      resizeMode="cover"
      blurRadius={20}
    >
      <View style={styles.container}>
        <Text style={styles.title}>☁️ Day Store ☁️</Text>
        <View style={styles.calender}>
            <Calendar
              onDayPress={(day) => setSelectedDate(day.dateString)} // 선택 day 관련 정보
              markedDates={{
                [selectedDate]: { selected: true, selectedColor: '#48CAE1' },
                ...days.reduce((acc, curr) => {
                  acc[curr.date] = { marked: true, dotColor: '#48CAE1' };
                  return acc;
                }, {} as any),
              }}
              theme={{
                todayTextColor: '#4948FF',
                arrowColor: '#48CAE1',
              }}
            />
        </View>

        {selectedDate ? (
          <Text style={styles.selectedText}>
            🗓️ {selectedDate}
          </Text>
        ) : (
          <Text style={styles.selectedText}>날짜를 선택해주세요</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="오늘의 하루를 적어보세요 ☀️"
          value={text}
          onChangeText={setText}
        />

        <TouchableOpacity style={styles.button} onPress={addDay}>
          <Text style={styles.buttonText}>저장</Text>
        </TouchableOpacity>

        <FlatList
          data={select_day}
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex:1,
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 60,
  },
  calender:{
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 5,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Monggle',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  selectedText: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Monggle2',
    marginVertical: 10,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    fontFamily: 'Monggle2',
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 12,
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#48CAE1',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
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
    fontFamily: 'Monggle2',
    flexShrink: 1,
  },
  delete: {
    color: '#4948FF',
    fontFamily: 'Monggle2',
  },
  empty: {
    textAlign: 'center',
    fontFamily: 'Monggle2',
    color: '#aaa',
    marginTop: 40,
  },
});