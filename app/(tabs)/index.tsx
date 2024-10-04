import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';

import GPACalculator from '../../src/screens/GPACalculator';
import CGPACalculator from '../../src/screens/CGPACalculator';
import GradingSystem from '../../src/screens/GradingSystem';

const Tab = createMaterialTopTabNavigator();

interface AppData {
  gpa: Array<{ grade: string; credit: number }>;
  cgpa: Array<{ credit: number; gpa: number }>;
}

export default function App() {
  const [data, setData] = useState<AppData>({ gpa: [], cgpa: [] });
  const [refresh, setRefresh] = useState(0);  // Use a counter to force re-render

  useEffect(() => {
    loadData();
  }, [refresh]);  // Reload data when refresh state changes

  const loadData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('calculatorData');
      if (savedData) {
        console.log('Data loaded:', savedData);  // Check if data is loaded
        setData(JSON.parse(savedData));
      } else {
        console.log('No data found');
        setData({ gpa: [], cgpa: [] });
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const saveData = async (newData: AppData) => {
    try {
      await AsyncStorage.setItem('calculatorData', JSON.stringify(newData));
      setData(newData);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  

  return (
    <NavigationContainer independent={true}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.title}>Student Assistant</Text>
      </View>
      <Tab.Navigator>
        <Tab.Screen
          name="GPA"
          key={refresh}  
        >
          {() => (
            <GPACalculator
              data={data.gpa}
              saveData={(gpa) => saveData({ ...data, gpa })}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="CGPA"
          key={`CGPA_${refresh}`}  
        >
          {() => (
            <CGPACalculator
              data={data.cgpa}
              saveData={(cgpa) => saveData({ ...data, cgpa })}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="EDIT" component={GradingSystem} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});