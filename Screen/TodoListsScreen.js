import React from 'react'
import { View, Text, Button, Dimensions, StyleSheet } from 'react-native'
import TodoList from '../components/TodoList';

import { getTaskList } from '../API/todoAPI';
import { TokenContext } from '../Context/Context';
import { UsernameContext } from '../Context/Context';

export default function TodoLists(){

    const TaskList = (username,token) => {
      getTaskList(username,token)
      .then(taskList => {
        let finalList = [];
        for (let i = 0; i < taskList.length; i++) {
          console.log('tache: ' + taskList[i].title);
          finalList += taskList[i].title;
        }
      })
  }

    return (
        <View style={styles.container}>
            <Text>Liste des TodoLists</Text>

            <TokenContext.Consumer>
          {([token, setToken]) => (
            <UsernameContext.Consumer>
              {([username, setUsername]) => {
                return (
                 TaskList(username,token) 
                 )
              }}
            </UsernameContext.Consumer>
          )}
        </TokenContext.Consumer>

            {/* <TodoList/> */}
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