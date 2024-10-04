import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const AssessmentList = ({ item, onDelete }: any) => {
    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity style={styles.touchable}>
                <View style={styles.textContainer}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemDetails}>
                        Type: {item.type} | Expected Marks: {item.expected_marks}
                    </Text>
                    <Text style={styles.itemDetails}>
                        Actual Marks: {item.actual_marks} | Percentage: {item.percentage}%
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
    mainContainer: {
        marginTop: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        marginLeft: 2,
        marginRight: 2,
        backgroundColor: '#f0f0f0',
        marginBottom: 8,
        borderRadius: 8,
        elevation: 2, // For Android shadow
        shadowColor: '#000', // For iOS shadow
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

export default AssessmentList;
