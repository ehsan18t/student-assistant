import React, { useEffect, useState } from 'react';
import CalendarWidget from "@/components/CalendarWidget";
import { FlatList, StyleSheet } from 'react-native';
import { fetchCalendarData, Calendar, fetchNoticeData, Notice  } from '@/functions/crawler';
import NoticeWidget from "@/components/NoticeWidget";

const HomeScreen: React.FC<any> = () => {
    const [data, setData] = useState<Calendar[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [notices, setNotices] = useState<Notice[]>([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const calendarData: any = await fetchCalendarData();
                setData(calendarData);
                const noticesData: any = await fetchNoticeData();
                setNotices(noticesData);
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
            return <NoticeWidget notices={notices} isLoading={isLoading} />;
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
