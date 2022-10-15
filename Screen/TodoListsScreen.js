import {useState, useEffect, useCallback} from 'react'
import { RefreshControl, View, Text, Button, Dimensions, StyleSheet, SliderComponent, TextInput } from 'react-native'
import TodoList from '../components/TodoList';

import { getTaskList, createTaskLists, getUserId } from '../API/todoAPI';
import { TokenContext } from '../Context/Context';
import { UsernameContext } from '../Context/Context';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import todoData from '../Helpers/todoData';


function TaskList({username, token}) {
  const [todos, setTodos] = useState([]);
  const [userId, setUserId] = useState();
  const [newTodoText, setNewTodoText] = useState("");

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


  const getId = (username, token) => {
    getUserId(username, token)
    .then(id => {
      setUserId(id[0].id)
      console.log(id[0].id)
    })
  } 

  useEffect(() => {
    getId(username, token)
  }, [username, token])


  return (
    <>
    <Text>ID de l'user : {userId}</Text>
    {/* {console.log(getUserId(username, token).then(res => {return res[0].id}))} */}
    {console.log(todos)}
      {todos.map((value, index) => {
        return <Text key={index}>{value.title} ; ID : {value.id}</Text>
      })}
      {/* <Button
        onPress={() => {
          createTaskLists(userId, "le test", token);
          window.location.reload(false);
        }}
        title='Créer une tâche test'
      /> */}

      <TextInput
        onChangeText={(newValue) => setNewTodoText(newValue)}
        placeholder='liste de tâche'
        onSubmitEditing={() => createTaskLists(userId, newTodoText, token)}
        // value={(text) => newTodoText}    
      />
      <Button
        title="Ajouter la tâche"
        onPress={() => createTaskLists(userId, newTodoText, token)}
      />
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
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 250,
  },
});