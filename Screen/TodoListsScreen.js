import React from 'react'
import { View, Text, Button, Dimensions, StyleSheet, SliderComponent } from 'react-native'
import TodoList from '../components/TodoList';

import { getTaskList } from '../API/todoAPI';
import { TokenContext } from '../Context/Context';
import { UsernameContext } from '../Context/Context';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

export default function TodoLists(){

    var tasksID = []
    var tasksName = []
    const TaskList = (username,token) => {
      getTaskList(username,token)
      .then(taskList => {
        for (let i = 0; i < taskList.length; i++) {
          console.log('tache: ' + taskList[i].title);
          tasksID.push(taskList[i].id)
          tasksName.push(taskList[i].title)
        }
        console.log(tasksName)
        console.log(tasksID)
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
                  <View>
                    {TaskList(username, token)}
                    {console.log('test')}
                    <Text>Premier ID :{tasksID[0]}</Text>
                  </View>
                  
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