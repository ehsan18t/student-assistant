import React, { useEffect, useState } from 'react';
import CalendarWidget from "@/components/CalendarWidget";
import { FlatList, StyleSheet } from 'react-native';
import { fetchCalendarData, Calendar  } from '@/functions/crawler';
import NoticeWidget from "@/components/NoticeWidget";

const HomeScreen: React.FC<any> = () => {
    const [data, setData] = useState<Calendar[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [notices, setNotices] = useState([
        {
            "date": "September 25, 2024",
            "title": "NOTICE REGARDING STUDENT TRANSPORT SERVICE",
            "link": "https://www.uiu.ac.bd/notice/notice-regarding-student-transport-service/"
        },
        {
            "date": "September 23, 2024",
            "title": "Revised Student Transport Service Timings",
            "link": "https://www.uiu.ac.bd/notice/revised-student-transport-service-timings/"
        },
        {
            "date": "September 23, 2024",
            "title": "LIST OF SELECTED CANDIDATES – 2nd Admission Test for Fall 2024 Trimester & 1st Admission Test for BGE for Fall 2024 Semester",
            "link": "https://www.uiu.ac.bd/notice/list-of-selected-candidates-2nd-admission-test-for-fall-2024-trimester-1st-admission-test-for-bge-for-fall-2024-semester/"
        },
        {
            "date": "September 19, 2024",
            "title": "New Transport Route",
            "link": "https://www.uiu.ac.bd/notice/new-transport-route/"
        },
        {
            "date": "September 17, 2024",
            "title": "Notice: Shifting of classrooms for the students of Trimester based Programs",
            "link": "https://www.uiu.ac.bd/notice/notice-shifting-of-classrooms-for-the-students-of-trimester-based-programs/"
        },
        {
            "date": "September 15, 2024",
            "title": "Sanctioning of 100% Tuition Fee and Other Fees Waiver for Meritorious and Poor Students from Underdeveloped Regions of Bangladesh—Fall 2024 Semester",
            "link": "https://www.uiu.ac.bd/notice/sanctioning-of-100-tuition-fee-and-other-fees-waiver-for-meritorious-and-poor-students-from-underdeveloped-regions-of-bangladesh-fall-2024-semester/"
        },
        {
            "date": "September 15, 2024",
            "title": "Scholarship Award List Fall 2024",
            "link": "https://www.uiu.ac.bd/notice/scholarship-award-list-fall-2024/"
        },
        {
            "date": "September 15, 2024",
            "title": "HOLIDAY NOTICE: HOLY EID-E-MILADUNNABI",
            "link": "https://www.uiu.ac.bd/notice/holiday-notice-holy-eid-e-miladunnabi/"
        },
        {
            "date": "September 12, 2024",
            "title": "Notice on Harassment of the students and alumni of the United International University (UIU)",
            "link": "https://www.uiu.ac.bd/notice/notice-on-harassment-of-the-students-and-alumni-of-the-united-international-university-uiu/"
        },
        {
            "date": "September 11, 2024",
            "title": "Notice on UCAM Updating of the Tuition Fee Special Waivers",
            "link": "https://www.uiu.ac.bd/notice/notice-on-ucam-updating-of-the-tuition-fee-special-waivers/"
        },
        {
            "date": "September 9, 2024",
            "title": "Shifting of Classrooms for the Students of Trimester Based Programs",
            "link": "https://www.uiu.ac.bd/notice/shifting-of-classrooms-for-the-students-of-trimester-based-programs/"
        },
        {
            "date": "September 6, 2024",
            "title": "Committee to Investigate Untoward Incidents of September 04, 2024 at UIU",
            "link": "https://www.uiu.ac.bd/notice/committee-to-investigate-untoward-incidents-of-september-04-2024-at-uiu/"
        }
    ])


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Assume fetchCalendarData and fetchNoticesData are your data fetching functions
                const calendarData: any = await fetchCalendarData();
                setData(calendarData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);
    
    const renderItem = ({ item }: { item: string }) => {
        if (item === 'calendar') {
            return <CalendarWidget calendar={data} isLoading={isLoading}  />;
        } else if (item === 'notices') {
            return <NoticeWidget notices={notices} />;
        }
        return null;
    };

    return (
        <FlatList
            data={['calendar', 'notices']} // List of sections
            renderItem={renderItem}
            keyExtractor={(item) => item}
            contentContainerStyle={styles.container}
        />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        paddingHorizontal: 10,
    },
});
