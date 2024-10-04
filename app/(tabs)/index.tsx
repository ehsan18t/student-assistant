import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const HomeScreen: React.FC<any> = () => {
  return (
      <View>
          <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Home Page</Text>
          </View>

          <View>
              <Text>Home Page Content</Text>
          </View>
      </View>
  );
};

export default HomeScreen;


const styles = StyleSheet.create({
    titleContainer: {
        padding: 16,
        backgroundColor: '#f0f0f0', // Background color for the title section
        borderBottomWidth: 1,
        borderBottomColor: '#ccc', // Border for separation
        alignItems: 'center',
    },
    titleText: {
        fontSize: 24, // Title font size
        fontWeight: 'bold', // Title font weight
        color: '#333', // Title font color
        textAlign: 'center',
    },
});
