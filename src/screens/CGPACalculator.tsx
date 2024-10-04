import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

interface Semester {
  credit: number;
  gpa: number;
}

interface Props {
  data: Semester[];
  saveData: (semesters: Semester[]) => void;
}

const CGPACalculator: React.FC<Props> = ({ data, saveData }) => {
  const [credit, setCredit] = useState<string>('');
  const [gpa, setGPA] = useState<string>('');
  const [cgpa, setCGPA] = useState<number>(0);
  const [semesters, setSemesters] = useState<Semester[]>(data || []);

  useEffect(() => {
    calculateCGPA();
  }, [semesters]);

  const addSemester = () => {
    if (credit && gpa) {
      const newSemesters = [...semesters, { credit: parseFloat(credit), gpa: parseFloat(gpa) }];
      setSemesters(newSemesters);
      saveData(newSemesters);
      setCredit('');
      setGPA('');
    }
  };

  const calculateCGPA = () => {
    if (semesters.length === 0) {
      setCGPA(0);
      return;
    }

    const totalPoints = semesters.reduce((sum, semester) => sum + semester.credit * semester.gpa, 0);
    const totalCredits = semesters.reduce((sum, semester) => sum + semester.credit, 0);
    setCGPA(parseFloat((totalPoints / totalCredits).toFixed(2)));
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setCredit}
          value={credit}
          placeholder="Credit"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={setGPA}
          value={gpa}
          placeholder="GPA"
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.addButton} onPress={addSemester}>
          <Text style={styles.buttonText}>ADD</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.cgpaText}>CGPA: {cgpa}</Text>
      <FlatList
        data={semesters}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.semesterItem}>
            <Text>Credit: {item.credit}, GPA: {item.gpa}</Text>
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
  cgpaText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  semesterItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default CGPACalculator;