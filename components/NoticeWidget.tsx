import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Linking, ActivityIndicator } from 'react-native';
import moment from 'moment';
import { Notice } from "@/functions/crawler";

type NoticesWidgetProps = {
    notices: Notice[],
    isLoading: boolean
};

const NoticesWidget: React.FC<NoticesWidgetProps> = ({ notices, isLoading }: NoticesWidgetProps) => {
    const [showAll, setShowAll] = useState(false);

    const displayedNotices = showAll ? notices : notices.slice(0, 6);

    const handleViewMore = () => {
        setShowAll(!showAll);
    };

    const renderNoticeItem = ({ item }: { item: Notice }) => (
        <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
            <View style={styles.noticeItem}>
                <Text style={styles.dateText}>{moment(item.date, ["MMMM D, YYYY"]).format('MMM D, YYYY')}</Text>
                <Text style={styles.titleText}>{item.title}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Latest Notices</Text>
            <FlatList
                data={displayedNotices}
                renderItem={renderNoticeItem}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={
                    isLoading ?
                        (<ActivityIndicator animating={true} color={"#333"} />)
                        :
                        (<View>
                            <Text>0 results</Text>
                        </View>)}
            />
            <TouchableOpacity style={styles.viewMoreButton} onPress={handleViewMore}>
                <Text style={styles.viewMoreText}>{showAll ? 'View Less' : 'View All'}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default NoticesWidget;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 16,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
        color: '#333',
    },
    noticeItem: {
        marginBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingBottom: 8,
    },
    dateText: {
        fontSize: 14,
        color: '#666',
    },
    titleText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#007bff',
    },
    viewMoreButton: {
        marginTop: 12,
        padding: 8,
        backgroundColor: '#007bff',
        borderRadius: 4,
        alignItems: 'center',
    },
    viewMoreText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});
