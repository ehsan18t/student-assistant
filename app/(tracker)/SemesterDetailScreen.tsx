import React, { useEffect, useState } from 'react';
import { Button} from 'react-native';
import { getCourses, deleteCourse } from '@/db/database';
import { router, useLocalSearchParams } from 'expo-router';
import Course from "@/components/Course";
import CustomScreen from "@/components/CustomScreen";

const SemesterDetailScreen: React.FC<any> = () => {
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
        setCourses(courses.filter((item: any) => item.id !== courseId));
    }

    return (
        <CustomScreen data={courses} title={"Courses"} CustomItem={Course} onDelete={handleOnDelete} button={
            (
                <Button
                    title="Add New Course"
                    onPress={() => { router.push({ pathname: "/AddCourseScreen" as any, params: { semesterId } }) }}
                />
            )
        } />
    );
};

export default SemesterDetailScreen;
