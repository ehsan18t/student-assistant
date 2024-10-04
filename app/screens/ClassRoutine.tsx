import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { notificationService } from '../core/function/NotificationService';


// Define a type for a class item
type ClassItem = {
  id: string;
  className: string;
  classDate: string;
};

export default function ClassRoutine() {
  const [className, setClassName] = useState<string>('');
  const [classDate, setClassDate] = useState<string>('');
  const [classList, setClassList] = useState<ClassItem[]>([]);
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

  const saveClassRoutine = () => {
    const classDateTime = new Date(classDate);
    const notificationTime = new Date(classDateTime.getTime() - 30 * 60 * 1000); // 30 min before

    if (!className || !classDate) {
      alert('Please fill all fields');
      return;
    }

    if (editMode) {
      const updatedClasses = classList.map((item) =>
        item.id === editClassId ? { ...item, className, classDate } : item
      );
      setClassList(updatedClasses);
      saveClasses(updatedClasses);
      setEditMode(false);
      setEditClassId(null);
    } else {
      const newClass: ClassItem = {
        id: Date.now().toString(),
        className,
        classDate,
      };

      const updatedClasses = [...classList, newClass];
      setClassList(updatedClasses);
      saveClasses(updatedClasses);

      notificationService.scheduleNotification(
        'Upcoming Class',
        `Your class ${className} is in 30 minutes!`,
        notificationTime
      );
    }

    setClassName('');
    setClassDate('');
    alert('Class saved and notification scheduled!');
  };

  const editClass = (id: string) => {
    const classToEdit = classList.find((item) => item.id === id);
    if (classToEdit) {
      setClassName(classToEdit.className);
      setClassDate(classToEdit.classDate);
      setEditMode(true);
      setEditClassId(id);
    }
  };

  const deleteClass = (id: string) => {
    const updatedClasses = classList.filter((item) => item.id !== id);
    setClassList(updatedClasses);
    saveClasses(updatedClasses);
    alert('Class deleted');
  };

  const renderClassItem = ({ item }: { item: ClassItem }) => (
    <View style={styles.classItem}>
      <Text style={styles.className}>{item.className}</Text>
      <Text style={styles.classDate}>{item.classDate}</Text>
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
      <TextInput
        placeholder="Class Date (YYYY-MM-DD HH:mm)"
        value={classDate}
        onChangeText={setClassDate}
        style={styles.input}
      />
      <Button title={editMode ? "Update Class" : "Add Class"} onPress={saveClassRoutine} />

      <FlatList
        data={classList}
        keyExtractor={(item) => item.id}
        renderItem={renderClassItem}
        style={styles.classList}
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
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 5,
  },
  classItem: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  className: {
    fontSize: 18,
  },
  classDate: {
    color: '#888',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    color: 'blue',
  },
  deleteButton: {
    color: 'red',
  },
  classList: {
    marginTop: 20,
  },
});
