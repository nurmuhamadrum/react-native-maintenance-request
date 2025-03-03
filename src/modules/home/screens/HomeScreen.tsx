import {Text, ScrollView, View, StyleSheet} from 'react-native';
import React from 'react';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text>HomeScreen</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
