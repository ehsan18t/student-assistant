import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { addCourse } from '@/db/database';
import { router, useLocalSearchParams } from 'expo-router';

const AddCourseScreen: React.FC<any> = () => {
    const params = useLocalSearchParams();
    const { semesterId } = params;
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [credits, setCredits] = useState('');
    const [fullMarks, setFullMarks] = useState('');
    
    const handleAddCourse = () => {
        if (name.trim() === '' || code.trim() === '' || credits.trim() === '' || fullMarks.trim() === '') {
            Alert.alert('Error', 'All fields are required');
            return;
        }
        addCourse(Number(semesterId), name, code, credits, fullMarks);
        router.push({ pathname: "/CourseScreen", params: { semesterId } });
    };

    return (
        <View style={{ padding: 16 }}>
            <TextInput
                placeholder="Course Name"
                value={name}
                onChangeText={setName}
                style={{ marginBottom: 12, borderBottomWidth: 1, padding: 8 }}
            />
            <TextInput
                placeholder="Course Code"
                value={code}
                onChangeText={setCode}
                style={{ marginBottom: 12, borderBottomWidth: 1, padding: 8 }}
            />
            <TextInput
                placeholder="Credits"
                value={credits}
                onChangeText={setCredits}
                keyboardType="numeric"
                style={{ marginBottom: 12, borderBottomWidth: 1, padding: 8 }}
            />
            <TextInput
                placeholder="Full Marks"
                value={fullMarks}
                keyboardType="numeric"
                onChangeText={setFullMarks}
                style={{ marginBottom: 12, borderBottomWidth: 1, padding: 8 }}
            />
            <Button title="Add Course" onPress={handleAddCourse} />
        </View>
    );
};

export default AddCourseScreen;
