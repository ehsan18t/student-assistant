import React, { useEffect, useState } from 'react';
import { View, Text, Button,  StyleSheet } from 'react-native';
import { getCourses, deleteCourse } from '@/db/database';
import CourseList from "@/components/CourseList";
import { router, useLocalSearchParams } from 'expo-router';

const CouseScreen: React.FC<any> = () => {
    const params = useLocalSearchParams();
    const { semesterId } = params;
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            getCourses(Number(semesterId), (data: any) => setCourses(data));
        };
        fetchData();
    }, []);

    const handleOnDelete: any =  async (courseId: any) => {
        deleteCourse(courseId);
        setCourses(courses.filter((item) => item.id !== courseId));
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Semesters</Text>
            </View>
            <View style={{ padding: 10 }}>
                <CourseList courses={courses} onDelete={handleOnDelete} />
                <Button title="Add New Course" onPress={() => {router.push({ pathname: "/AddCourseScreen", params: { semesterId } })}} />
            </View>
        </View>
    );
};

export default CouseScreen;


const styles = StyleSheet.create({
    mainContainer: {
        paddingTop: 20,
    },
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
