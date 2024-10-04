import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { getAssessments, deleteAssessment } from '@/db/database';
import { router, useLocalSearchParams } from 'expo-router';
import AssessmentList from "@/components/AssessmentList";

const CourseDetailScreen: React.FC = () => {
    const params = useLocalSearchParams();
    const { courseId } = params;
    const [assessments, setAssessments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            getAssessments(Number(courseId), (data: any) => { setAssessments(data) });
        };
        fetchData();
    }, [courseId]);

    const handleOnDelete = async (assessmentId: any) => {
        deleteAssessment(assessmentId);
        setAssessments(assessments.filter((item: any) => item.id !== assessmentId));
    }

    return (
        <View style={styles.mainContainer}>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Assessments</Text>
                </View>
                <View style={styles.contentContainer}>
                    {assessments.length > 0 ? (
                        <AssessmentList assessments={assessments} onDelete={handleOnDelete} />
                    ) : (
                        <Text>No Assessments available for this course</Text>
                    )}
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <Button
                    title="Add New Assessment"
                    onPress={() => { router.push({ pathname: "/AddAssessmentsScreen", params: { courseId } }) }}
                />
            </View>
        </View>
    );
};

export default CourseDetailScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop: 20
    },
    scrollContainer: {
        flex: 1,
    },
    titleContainer: {
        padding: 16,
        backgroundColor: '#f0f0f0',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    contentContainer: {
        padding: 16,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
});
