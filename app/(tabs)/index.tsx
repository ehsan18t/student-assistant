import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity } from 'react-native';
import { getSemesters } from '@/db/database';
import { router } from 'expo-router';

const HomeScreen: React.FC<any> = () => {
  const [semesters, setSemesters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const data: any = await getSemesters();
        
        console.log(data);
      setSemesters(data);
    };
    fetchData();
  }, []);

  return (
      <View style={{ padding: 16 }}>
        <Text>Semesters</Text>
        <FlatList
            data={semesters}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() => {router.push({ pathname :"/SemesterScreen", params: { semesterId: item.id, name: item.name } })}}>
                  <View style={{ padding: 16, backgroundColor: '#f0f0f0', marginBottom: 8 }}>
                    <Text>{item.name}</Text>
                    {item.date && <Text>{item.date}</Text>}
                  </View>
                </TouchableOpacity>
            )}
        />
        <Button title="Add New Semester" onPress={() => {router.push("/SemesterScreen")}} />
      </View>
  );
};

export default HomeScreen;
