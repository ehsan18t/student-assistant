import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Dimensions, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { fetchCourseContributions } from '@/db/database'; // Assuming this is correctly fetching data

// Get screen dimensions for responsiveness
const screenWidth = Dimensions.get('window').width;

const PieChartComponent = ({ semester_id }: { semester_id: number }) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCourseContributions(semester_id, (contributions) => {
            const chartData = contributions.map((course: any) => ({
                name: course.name,          // This will be used as the legend label
                contribution: course.percentage,  // This is the value for the chart slices
                color: getRandomColor(),    // Random color generation for each course
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            }));

            setData(chartData);
            setLoading(false);
        });
    }, [semester_id]);

    // Helper function to generate random colors for each chart slice
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.title}>Course Contributions</Text>

            <View style={styles.chartContainer}>
                {loading ? (
                    <Text style={styles.loadingText}>Loading...</Text>
                ) : data.length > 0 ? (
                    <PieChart
                        data={data}
                        width={screenWidth * 0.9}
                        height={220}
                        chartConfig={{
                            backgroundColor: '#fff',
                            backgroundGradientFrom: '#fff',
                            backgroundGradientTo: '#fff',
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            strokeWidth: 2,
                        }}
                        accessor="contribution" // Refers to the value used to size the slices
                        backgroundColor="transparent"
                        paddingLeft="15"
                        avoidFalseZero={true}
                        absolute
                    />
                ) : (
                    <Text>No data available</Text>
                )}
            </View>

        </ScrollView>
    );
};

// Styling the container and other components
const styles = StyleSheet.create({
    scrollContainer: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    chartContainer: {
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    loadingText: {
        fontSize: 16,
        color: '#555',
    },
    infoText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
});

export default PieChartComponent;
