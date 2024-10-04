export type RootStackParamList = {
    Home: undefined;
    Semester: undefined;
    Courses: { semesterId: number; name: string };
    Course: { semesterId: number };
    Assessments: { courseId: number; name: string };
    AddAssessment: { courseId: number };
};
