import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { notificationService } from '../core/function/NotificationService';
import { Picker } from '@react-native-picker/picker';

type ClassItem = {
  id: string;
  className: string;
  classTime: string;
  dayOfWeek: string;
};

const daysOfWeek = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday'];

export default function ClassRoutine() {
  const [className, setClassName] = useState<string>('');
  const [classTime, setClassTime] = useState<Date | null>(null);
  const [dayOfWeek, setDayOfWeek] = useState<string>(daysOfWeek[0]);
  const [classList, setClassList] = useState<ClassItem[]>([]);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editClassId, setEditClassId] = useState<string | null>(null);

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    try {
      const savedClasses = await AsyncStorage.getItem('classList');
      if (savedClasses) {
        setClassList(JSON.parse(savedClasses));
      }
    } catch (error) {
      console.error('Failed to load classes', error);
    }
  };

  const saveClasses = async (classes: ClassItem[]) => {
    try {
      await AsyncStorage.setItem('classList', JSON.stringify(classes));
    } catch (error) {
      console.error('Failed to save classes', error);
    }
  };

  const saveClassRoutine = async () => {
    if (!className || !classTime) {
      Alert.alert('Please fill all fields');
      return;
    }

    const formattedTime = classTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const newClass: ClassItem = {
      id: Date.now().toString(),
      className,
      classTime: formattedTime,
      dayOfWeek,
    };
    if (editMode) {
      const updatedClasses = classList.map((item) =>
        item.id === editClassId
          ? { ...item, className, classTime: formattedTime, dayOfWeek }
          : item
      );
      setClassList(updatedClasses);
      await saveClasses(updatedClasses);
        setEditMode(false);
    } else {
      const updatedClasses = [...classList, newClass];
      setClassList(updatedClasses);
      await saveClasses(updatedClasses);
      scheduleRecurringNotification(newClass);
      Alert.alert('Class saved and notification scheduled!');
    }

    // Clear input fields after saving
    setClassName('');
    setClassTime(null);

    // Fetch and update the list after adding a new class
    await loadClasses();
  };

  const scheduleRecurringNotification = (newClass: ClassItem) => {
    const [hour, minute] = newClass.classTime.split(':').map(Number);
    const now = new Date();
    const nextDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute);

    while (nextDate.getDay() !== daysOfWeek.indexOf(newClass.dayOfWeek)) {
      nextDate.setDate(nextDate.getDate() + 1);
    }

    notificationService.scheduleNotification(
      'Upcoming Class',
      `Your class ${newClass.className} is starting now!`,
      nextDate
    );
  };

  const editClass = (id: string) => {
    const classToEdit = classList.find((item) => item.id === id);
    if (classToEdit) {
      setClassName(classToEdit.className);
      setDayOfWeek(classToEdit.dayOfWeek);
      setClassTime(new Date(`1970-01-01T${classToEdit.classTime}:00`));
      setEditMode(true);
      setEditClassId(id);
    }
  };

  const deleteClass = async (id: string) => {
    const updatedClasses = classList.filter((item) => item.id !== id);
    setClassList(updatedClasses);
    await saveClasses(updatedClasses);
    Alert.alert('Class deleted');
  };

  const renderClassItem = ({ item }: { item: ClassItem }) => (
    <View style={styles.classItem}>
      <Text style={styles.className}>{item.className}</Text>
      <Text style={styles.classDate}>
        {item.classTime} on {item.dayOfWeek}
      </Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={() => editClass(item.id)}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteClass(item.id)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Class Routine</Text>
      <TextInput
        placeholder="Class Name"
        value={className}
        onChangeText={setClassName}
        style={styles.input}
      />
      <TouchableOpacity onPress={() => setShowTimePicker(true)}>
        <TextInput
          placeholder="Class Time (HH:mm)"
          value={classTime ? classTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
          editable={false}
          style={styles.input}
        />
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={classTime || new Date()}
          mode="time"
          is24Hour={true}
          onChange={(event, selectedTime) => {
            const currentTime = selectedTime || classTime;
            setShowTimePicker(false);
            setClassTime(currentTime);
          }}
        />
      )}
      <Picker
        selectedValue={dayOfWeek}
        onValueChange={(itemValue) => setDayOfWeek(itemValue)}
        style={styles.picker}
      >
        {daysOfWeek.map((day) => (
          <Picker.Item key={day} label={day} value={day} />
        ))}
      </Picker>
      <Button title={editMode ? 'Update Class' : 'Add Class'} onPress={saveClassRoutine} />
      <FlatList
        data={classList}
        renderItem={renderClassItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  classItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 5,
  },
  className: {
    fontSize: 18,
  },
  classDate: {
    fontSize: 14,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    color: 'blue',
  },
  deleteButton: {
    color: 'red',
  },
  picker: {
    marginBottom: 20,
  },
});
