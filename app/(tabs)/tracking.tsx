import React, { useEffect, useState } from 'react';
import { Button } from 'react-native';
import { getSemesters, deleteSemester } from '@/db/database';
import { router } from 'expo-router';
import Semester from "@/components/Semester";
import CustomScreen from "@/components/CustomScreen";

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
        setSemesters(semesters.filter((semester: any) => semester.id !== semId));
    }

    return (
        <CustomScreen data={semesters} title={"Semesters"} CustomItem={Semester} onDelete={handleOnDelete} button={
            (
                <Button
                    title="Add New Semester"
                    onPress={() => { router.push("/AddSemesterScreen") }}
                />
            )
        } />
    );
};

export default TrackingScreen;
