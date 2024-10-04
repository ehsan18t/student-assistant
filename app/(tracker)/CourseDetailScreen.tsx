import React, { useEffect, useState } from 'react';
import { Button } from 'react-native';
import { getAssessments, deleteAssessment } from '@/db/database';
import { router, useLocalSearchParams } from 'expo-router';
import Assessment from "@/components/Assessment";
import CustomScreen from "@/components/CustomScreen";

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
        <CustomScreen data={assessments} title={"Assessments"} CustomItem={Assessment} onDelete={handleOnDelete} button={
            (
                <Button
                    title="Add New Assessment"
                    onPress={() => { router.push({ pathname: "/AddAssessmentsScreen" as any, params: { courseId } }) }}
                />
            )
        } />
    );
};

export default CourseDetailScreen;
