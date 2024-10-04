import React, { ReactNode } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native';

// Define types for the props
interface CustomScreenProps {
    data: any;
    title: string;
    button: ReactNode;
    CustomItem: any
    onDelete: any;
}

const CustomScreen: React.FC<CustomScreenProps> = ({ data, title, button, CustomItem, onDelete }) => {
    return (
        <View style={styles.mainContainer}>
            <FlatList
                data={data}
                ListHeaderComponent={
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>{title}</Text>
                    </View>
                }
                ListEmptyComponent={<Text style={styles.emptyMessage}>No Item Available</Text>}
                renderItem={({ item }) => <CustomItem item={item} onDelete={onDelete} />}
                keyExtractor={(item) => item.id.toString()}
            />
            <View style={styles.buttonContainer}>
                {button}
            </View>
        </View>
    );
};

export default CustomScreen;
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop: 20,
    },
    titleContainer: {
        padding: 16,
        backgroundColor: '#f0f0f0',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    itemContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemType: {
        fontSize: 14,
        color: '#666',
    },
    itemDetails: {
        fontSize: 14,
        color: '#666',
    },
    emptyMessage: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginTop: 20,
    },
    buttonContainer: {
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
});
