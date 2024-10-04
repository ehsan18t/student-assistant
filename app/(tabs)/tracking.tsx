import React, { useEffect, useState } from 'react';
import { View, Text, Button,  StyleSheet } from 'react-native';
import { getSemesters, deleteSemester } from '@/db/database';
import { router } from 'expo-router';
import SemesterList from "@/components/SemesterList";

const TrackingScreen: React.FC<any> = () => {
    const [semesters, setSemesters] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            getSemesters((data: any) => setSemesters(data));
        };
        fetchData();
    }, []);

    const handleOnDelete: any =  async (semId: any) => {
        deleteSemester(semId);
        setSemesters(semesters.filter((semester) => semester.id !== semId));
    }

    return (
        <View>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Semesters</Text>
            </View>
            <View style={{ padding: 10 }}>
                <SemesterList semesters={semesters} onDelete={handleOnDelete} />
                <Button title="Add New Semester" onPress={() => {router.push("/AddSemesterScreen")}} />
            </View>
        </View>
    );
};

export default TrackingScreen;


const styles = StyleSheet.create({
    titleContainer: {
        padding: 16,
        backgroundColor: '#f0f0f0', // Background color for the title section
        borderBottomWidth: 1,
        borderBottomColor: '#ccc', // Border for separation
        alignItems: 'center',
    },
    titleText: {
        fontSize: 24, // Title font size
        fontWeight: 'bold', // Title font weight
        color: '#333', // Title font color
        textAlign: 'center',
    },
});
