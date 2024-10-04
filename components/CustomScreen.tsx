import React, { ReactNode } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

// Define types for the props
interface CustomScreenProps {
    children: ReactNode;
    title: string;
    button: ReactNode;
}

const CustomScreen: React.FC<CustomScreenProps> = ({ children, title, button }) => {
    return (
        <View style={styles.mainContainer}>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{title}</Text>
                </View>
                <View style={styles.contentContainer}>
                    {children}
                </View>
            </ScrollView>
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
        paddingTop: 20
    },
    scrollContainer: {
        flex: 1,
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
    contentContainer: {
        padding: 16,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
});
