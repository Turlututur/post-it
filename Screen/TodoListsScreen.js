import {useState, useEffect, useCallback} from 'react'
import { View, Text, Button, Dimensions, StyleSheet, SliderComponent } from 'react-native'
import TodoList from '../components/TodoList';

import { getTaskList, createTaskLists, getUserId } from '../API/todoAPI';
import { TokenContext } from '../Context/Context';
import { UsernameContext } from '../Context/Context';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import todoData from '../Helpers/todoData';


function TaskList({username, token}) {
  const [todos, setTodos] = useState([]);

  // const callback = useCallback(() => {
  //   getTaskList(username,token)
  //   .then(taskList => {
  //     setTodos(taskList)
  //   })
  // }, [username, token])


  const callback = (username, token) => {
    getTaskList(username,token)
    .then(taskList => {
      setTodos(taskList)
    })
  }

  useEffect(() => {
    callback(username, token)
  }, [username, token])

  return (
    <>
      {todos.map((value, index) => {
        return <Text key={index}>{value.title} ; ID : {value.id}</Text>
      })}
    </>
  )
}



export default function TodoLists(){


    return (
        <View style={styles.container}>
          <Text>Liste des TodoLists :</Text>

            <TokenContext.Consumer>
          {([token, setToken]) => (
            <UsernameContext.Consumer>
              {([username, setUsername]) => 
                <>
                  <TaskList username={username} token={token} />
                  {/* <Button
                    onPress={() => createTaskLists(getUserId(username, token), "le test", token)}
                    title='Créer une tâche quelquonque'
                  /> */}
                </>
              }
              
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