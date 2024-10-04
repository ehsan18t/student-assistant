import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface Course {
  grade: string;
  credit: number;
}

interface Props {
  data: Course[];
  saveData: (courses: Course[]) => void;
}

const gradePoints: { [key: string]: number } = {
  'A': 4.00, 'A-': 3.67, 'B+': 3.33, 'B': 3.00, 'B-': 2.67,
  'C+': 2.33, 'C': 2.00, 'C-': 1.67, 'D+': 1.33, 'D': 1.00, 'F': 0.00
};

const GPACalculator: React.FC<Props> = ({ data, saveData }) => {
  const [grade, setGrade] = useState<string>('A');
  const [credit, setCredit] = useState<string>('');
  const [gpa, setGPA] = useState<number>(0);
  const [courses, setCourses] = useState<Course[]>(data || []);

  useEffect(() => {
    calculateGPA();
  }, [courses]);

  const addCourse = () => {
    if (credit) {
      const newCourses = [...courses, { grade, credit: parseFloat(credit) }];
      setCourses(newCourses);
      saveData(newCourses);
      setCredit('');
    }
  };

  const calculateGPA = () => {
    if (courses.length === 0) {
      setGPA(0);
      return;
    }

    const totalPoints = courses.reduce((sum, course) => sum + gradePoints[course.grade] * course.credit, 0);
    const totalCredits = courses.reduce((sum, course) => sum + course.credit, 0);
    setGPA(parseFloat((totalPoints / totalCredits).toFixed(2)));
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Picker
          selectedValue={grade}
          onValueChange={(itemValue) => setGrade(itemValue)}
          style={styles.picker}
        >
          {Object.keys(gradePoints).map((g) => (
            <Picker.Item key={g} label={g} value={g} />
          ))}
        </Picker>
        <TextInput
          style={styles.input}
          onChangeText={setCredit}
          value={credit}
          placeholder="Credit"
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.addButton} onPress={addCourse}>
          <Text style={styles.buttonText}>ADD</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.gpaText}>GPA: {gpa}</Text>
      <FlatList
        data={courses}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.courseItem}>
            <Text>{item.grade} - {item.credit} credits</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  picker: {
    flex: 1,
    marginRight: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 4,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  gpaText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  courseItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default GPACalculator;