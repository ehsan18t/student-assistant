import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { addSemester } from '@/db/database';
import { router } from 'expo-router';


const AddSemesterScreen: React.FC<any> = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');

    const handleAddSemester = () => {
        if (name.trim() === '') {
            Alert.alert('Error', 'Semester name is required');
            return;
        }
        addSemester(name, date);
        router.push("/")
    };

    return (
        <View style={{ padding: 16 }}>
            <TextInput
                placeholder="Semester Name"
                value={name}
                onChangeText={setName}
                style={{ marginBottom: 12, borderBottomWidth: 1, padding: 8 }}
            />
            <TextInput
                placeholder="Date (Optional)"
                value={date}
                onChangeText={setDate}
                style={{ marginBottom: 12, borderBottomWidth: 1, padding: 8 }}
            />
            <Button title="Add Semester" onPress={handleAddSemester} />
        </View>
    );
};

export default AddSemesterScreen;
