import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { addAssessment } from '@/db/database';
import { router, useLocalSearchParams } from 'expo-router';


const AddAssessmentsScreen: React.FC<any> = () => {
    const params = useLocalSearchParams();
    const { courseId } = params;
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [expectedMarks, setExpectedMarks] = useState('');
    const [actualMarks, setActualMarks] = useState('');
    const [percentage, setPercentage] = useState('');
    const [bestCount, setBestCount] = useState('');

    const handleAddAssessment = () => {
        if (name.trim() === '' || type.trim() === '' || expectedMarks.trim() === '' || actualMarks.trim() === '') {
            Alert.alert('Error', 'All fields are required');
            return;
        }
        addAssessment(Number(courseId), name, type, expectedMarks, actualMarks, percentage, bestCount);
        router.push({ pathname: "/CourseDetailScreen", params: { courseId } });
    };

    return (
        <View style={{ padding: 16 }}>
            <TextInput
                placeholder="Assessment Name"
                value={name}
                onChangeText={setName}
                style={{ marginBottom: 12, borderBottomWidth: 1, padding: 8 }}
            />
            <TextInput
                placeholder="Type (Exam, Assignment)"
                value={type}
                onChangeText={setType}
                style={{ marginBottom: 12, borderBottomWidth: 1, padding: 8 }}
            />
            <TextInput
                placeholder="Expected Marks"
                value={expectedMarks}
                keyboardType="numeric"
                onChangeText={setExpectedMarks}
                style={{ marginBottom: 12, borderBottomWidth: 1, padding: 8 }}
            />
            <TextInput
                placeholder="Actual Marks"
                value={actualMarks}
                keyboardType="numeric"
                onChangeText={setActualMarks}
                style={{ marginBottom: 12, borderBottomWidth: 1, padding: 8 }}
            />
            <TextInput
                placeholder="Percentage"
                value={percentage}
                keyboardType="numeric"
                onChangeText={setPercentage}
                style={{ marginBottom: 12, borderBottomWidth: 1, padding: 8 }}
            />
            <TextInput
                placeholder="Best Count"
                value={bestCount}
                keyboardType="numeric"
                onChangeText={setBestCount}
                style={{ marginBottom: 12, borderBottomWidth: 1, padding: 8 }}
            />
            <Button title="Add Assessment" onPress={handleAddAssessment} />
        </View>
    );
};

export default AddAssessmentsScreen;
