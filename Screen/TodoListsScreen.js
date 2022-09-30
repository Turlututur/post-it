import React from 'react'
import { View, Text, Button, Dimensions, StyleSheet } from 'react-native'
import TodoList from '../components/TodoList';

export default function TodoLists(){
    return (
        <View style={styles.container}>
            <Text>Liste des TodoLists</Text>
            <TodoList/>
        </View>
    )
}

const screen = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {
    height: screen.width * 0.8,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 250,
  },
});