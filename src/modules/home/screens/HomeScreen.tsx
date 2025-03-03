import {Text, ScrollView, View, StyleSheet, Button} from 'react-native';
import React from 'react';
import {observer} from 'mobx-react-lite';
import homeStore from '@/stores/HomeStore';

const HomeScreen = observer(() => {
  const { count, increment, decrement } = homeStore;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text>Count: {count}</Text>
        <Button title="Increment" onPress={increment} />
        <Button title="Decrement" onPress={decrement} />
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
