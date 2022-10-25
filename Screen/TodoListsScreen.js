import {useState, useEffect} from 'react'
import { View, Text, Button, Dimensions, StyleSheet, TextInput, Form, useForm} from 'react-native'
import TodoList from '../components/TodoList';

import { getTaskList, createTaskLists, getUserId } from '../API/todoAPI';
import { TokenContext } from '../Context/Context';
import { UsernameContext } from '../Context/Context';
import { FlatList } from 'react-native-web';
/* import todoData from '../Helpers/todoData'; */


function TaskList({username, token}) {
  const [todos, setTodos] = useState([]);
  const [userId, setUserId] = useState();
  const [newTodoText, setNewTodoText] = useState("");

  
  /* const { handleSubmit } = useForm(); */

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
    <Text>Liste des TodoLists :</Text>
    <FlatList
      style={{ textAlign:'left' }}
      data={todos}
      renderItem={({item}) => <Text>{item.title}</Text> } 
    />
      <TextInput
      style={{ backgroundColor:'white' }}
        onChangeText={(newValue) => setNewTodoText(newValue)}
        placeholder='liste de tâche'
        onSubmitEditing={ async (e) => {
          e.preventDefault();
          await createTaskLists(userId, newTodoText, token);
          callback(username, token);
        }}   
      />
      <Button
        title="Ajouter la tâche"
        onPress={ async (e) => {
          e.preventDefault();
          await createTaskLists(userId, newTodoText, token);
          callback(username, token);
        }}
      />
    </>
  )
}



export default function TodoLists(){


    return (
        <View style={styles.container}>
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
    textAlign: 'left',
    height: screen.width * 0.8,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 250,
  },
});