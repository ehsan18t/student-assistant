import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { getAssessments, deleteAssessment, deleteCourse } from '@/db/database';
import { router, useLocalSearchParams } from 'expo-router';
import AssessmentList from "@/components/AssessmentList";

const CourseDetailScreen: React.FC = () => {
    const params = useLocalSearchParams();
    const { courseId } = params;
    const [assessments, setAssessments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            getAssessments(Number(courseId), (data: any) => {setAssessments(data)});
        };
        fetchData();
    }, [courseId]);
    
    const handleOnDelete = async (assessmentId: any) => {
        deleteAssessment(assessmentId);
        setAssessments(assessments.filter((item) => item.id !== assessmentId));
    }

    return (
        <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: 16 }}>Course Details</Text>
            {assessments.length > 0 ? (
                <AssessmentList assessments={assessments} onDelete={handleOnDelete} />
            ) : (
                <Text>No Assessments available for this course</Text>
            )}
            <Button title="Add New Course" onPress={() => {router.push({ pathname: "/AddAssessmentsScreen", params: { courseId } })}} />
        </View>
    );
};

export default CourseDetailScreen;
