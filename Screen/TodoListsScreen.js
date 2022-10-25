import {useState, useEffect} from 'react'
import { View, Text, Pressable, TouchableOpacity, StyleSheet, TextInput, Image} from 'react-native'
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
    <Text style={styles.text}>ID de l'user : {userId}</Text>
    {/* {console.log(getUserId(username, token).then(res => {return res[0].id}))} */}
    {console.log(todos)}
    <Text style={styles.text}>Liste des TodoLists :</Text>
    <FlatList
      style={{ textAlign:'left' }}
      data={todos}
      renderItem={({item}) => 
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.text}>{item.title}</Text>
        <TouchableOpacity onPress={() => console.log("todo : detele todoList")}>
          <Image source={require('../assets/trash-can-outline.png')} style={{ height: 24, width: 24 }} />
        </TouchableOpacity>
      </View>
       } 
    />
      <TextInput
      style={styles.text_input}
        onChangeText={(newValue) => setNewTodoText(newValue)}
        placeholder='liste de tâche'
        onSubmitEditing={ async (e) => {
          e.preventDefault();
          await createTaskLists(userId, newTodoText, token);
          callback(username, token);
        }}   
      />
      <Pressable
      style={styles.pressable}
        onPress={ async (e) => {
          e.preventDefault();
          await createTaskLists(userId, newTodoText, token);
          callback(username, token);
        }}
      >
      <Text style={styles.text}>Ajouter la tâche</Text>
      </Pressable>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B2430',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 250
  },
  text : {
    color: '#D6D5A8'
  },
  link : {
    color: '#816797',
    textDecorationLine: 'underline'
  },
  pressable: {
    backgroundColor: '#51557E',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:'10px'
  },
  text_input: {
    //borderWidth: 1,
    backgroundColor: '#D6D5A8',
    color: '#1B2430',
    margin: 5
  }
})
