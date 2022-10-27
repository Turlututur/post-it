import React, { useEffect, useState } from "react";
import { View, Text, Pressable, TouchableOpacity, StyleSheet, TextInput, Image, Switch} from 'react-native'
import { getTasks, createTask, getUserId, deleteTasks } from '../API/todoAPI';
import { FlatList } from 'react-native-web';
//import { useNavigation } from '@react-navigation/native';

export default function TaskList({username, token, id}) {
    const [todos, setTodos] = useState([]);
    const [userId, setUserId] = useState();
    const [newTodoText, setNewTodoText] = useState("");
   // const navigation = useNavigation();

    const callback = (id, token) => {
      getTasks(id,token)
      .then(taskList => {
        setTodos(taskList)
      })
    }
  
    useEffect(() => {
      callback(id, token)
    }, [id, token])
  
  
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
      {console.log(todos)}
      <Text style={styles.text}>Liste des TodoLists :</Text>
      <FlatList
        style={{ textAlign:'left', paddingLeft: 10, paddingTop:20 }}
        data={todos}
        renderItem={({item}) => 
        <View style={{flexDirection: 'row'}}>
        <Switch value={false} onValueChange={() => {return;}} />
          <TouchableOpacity onPress={() => 
            console.log(item.id)
            }>
            <Text style={{color: '#D6D5A8'}}>{item.content}</Text>
          </TouchableOpacity> 
          <TouchableOpacity 
          onPress={ async (e) => {
            e.preventDefault();
            await deleteTasks(item.id, token);
            callback(id, token);
          }}
          >
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
            await createTask(id, newTodoText, userId, token);
            callback(id, token);
          }}   
        />
        <Pressable
        style={styles.pressable}
          onPress={ async (e) => {
            e.preventDefault();
            await createTask(id, newTodoText, userId, token);
            callback(id, token);
          }}
        >
        <Text style={styles.text}>Ajouter le todo</Text>
        </Pressable>
      </>
    )
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1B2430',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 200
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