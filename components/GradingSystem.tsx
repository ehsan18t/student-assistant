import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const gradingSystem = [
  { letter: 'A', interval: '90 - 100', point: '4.00' },
  { letter: 'A-', interval: '86 - 89', point: '3.67' },
  { letter: 'B+', interval: '82 - 85', point: '3.33' },
  { letter: 'B', interval: '78 - 81', point: '3.00' },
  { letter: 'B-', interval: '74 - 77', point: '2.67' },
  { letter: 'C+', interval: '70 - 73', point: '2.33' },
  { letter: 'C', interval: '66 - 69', point: '2.00' },
  { letter: 'C-', interval: '62 - 65', point: '1.67' },
  { letter: 'D+', interval: '58 - 61', point: '1.33' },
  { letter: 'D', interval: '55 - 57', point: '1.00' },
  { letter: 'F', interval: '00 - 54', point: '0.00' },
];

const GradingSystem = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Letter grade</Text>
        <Text style={styles.headerText}>Class interval</Text>
        <Text style={styles.headerText}>Grade point</Text>
      </View>
      {gradingSystem.map((grade, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.cell}>{grade.letter}</Text>
          <Text style={styles.cell}>{grade.interval}</Text>
          <Text style={styles.cell}>{grade.point}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
  },
  headerText: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
});

export default GradingSystem;