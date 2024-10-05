import React, { useEffect, useState } from 'react';
import CalendarWidget from "@/components/CalendarWidget";
import { View } from 'react-native'
import { fetchCalendarData, Calendar  } from '@/functions/crawler';

const HomeScreen: React.FC<any> = () => {
    const [data, setData] = useState<Calendar[]>([]);
    const [isLoading, setIsLoading] = useState(true);

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
        }
        return null;
    };

    return (
      <View style={{ paddingTop: 40, margin: 10}}>
          <CalendarWidget calendar={data} isLoading={isLoading} />
      </View>
  );
};

export default HomeScreen;
