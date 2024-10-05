import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import moment from 'moment';

const formatDate = (date: string) => {
    // Check if it's a date range (i.e., contains "–")
    if (date.includes("–")) {
        const parts = date.split("–").map(part => part.trim());

        // Parse the first part (e.g., "May 27")
        const startDate = moment(parts[0], ["MMM D, YYYY", "MMMM D, YYYY"]);

        // Parse the second part (either just a day or full date)
        const endDate = moment(parts[1], ["D, YYYY", "MMM D, YYYY", "MMMM D, YYYY"]);

        // Combine the two dates into a readable range
        return `${startDate.format('MMM D')} - ${endDate.format('MMM D, YYYY')}`;
    } else {
        // If it's a single date, just format it
        return moment(date, ["MMM D, YYYY", "MMMM D, YYYY"]).format('MMM D, YYYY');
    }
};


// Function to filter upcoming events (next 7 days)
const getUpcomingEvents = (calendar: any[]) => {
    return calendar.filter(event => {
        const eventDate = moment(event.date.split("–")[0].trim(), ["MMM D, YYYY", "MMMM D, YYYY"]);
        return eventDate.isAfter(moment()) && eventDate.diff(moment(), 'days') <= 7;
    });
};

const CalendarWidget = ({ calendar }: { calendar: any[] }) => {
    const [viewAll, setViewAll] = useState(false);
    const [eventsToShow, setEventsToShow] = useState<any[]>([]);

    useEffect(() => {
        setEventsToShow(viewAll ? calendar : getUpcomingEvents(calendar));
    }, [viewAll, calendar]);

    return (
        <View style={styles.widgetContainer}>
            <Text style={styles.title}>Upcoming Academic Events</Text>
            <ScrollView style={styles.eventList}>
                {eventsToShow.map((event, index) => (
                    <View key={index} style={styles.eventItem}>
                        <Text style={styles.eventDate}>{formatDate(event.date)}</Text>
                        <Text style={styles.eventDetails}>{event.details}</Text>
                    </View>
                ))}
            </ScrollView>
            <Button title={viewAll ? "View Less" : "View All"} onPress={() => setViewAll(!viewAll)} />
        </View>
    );
};

export default CalendarWidget;

const styles = StyleSheet.create({
    widgetContainer: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderColor: '#ccc',
        borderWidth: 1,
        marginVertical: 16,
        elevation: 2, // For shadow on Android
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    eventList: {
        maxHeight: 400, // Limit height when showing the upcoming 7 days
    },
    eventItem: {
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    eventDate: {
        fontWeight: 'bold',
    },
    eventDetails: {
        color: '#555',
    }
});
