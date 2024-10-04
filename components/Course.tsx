import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';

const Course = ({ item, onDelete }: any) => {
    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity
                style={styles.touchable}
                onPress={() => { router.push({ pathname: "/CourseDetailScreen" as any, params: { courseId: item.id } }); }}>
                <View style={styles.textContainer}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemDetails}>
                        {item.code} | Credits: {item.credits} | Full Marks: {item.full_marks}
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(item.id)}>
                <AntDesign name="delete" size={24} color="#ff6347" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        marginHorizontal: 10,
        backgroundColor: '#f0f0f0',
        marginBottom: 8,
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    touchable: {
        flex: 1,
    },
    textContainer: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemDetails: {
        fontSize: 14,
        color: '#555',
    },
});

export default Course;
