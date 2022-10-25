import React, { useEffect, useState } from "react";
import { View, Text, Pressable, TouchableOpacity, StyleSheet, TextInput, Image} from 'react-native'
import { getTaskList, createTaskLists, getUserId, deleteTaskLists } from '../API/todoAPI';
import { FlatList } from 'react-native-web';
import { useNavigation } from '@react-navigation/native';

export default function TaskList({username, token}) {
    const [todos, setTodos] = useState([]);
    const [userId, setUserId] = useState();
    const [newTodoText, setNewTodoText] = useState("");
    const navigation = useNavigation();
  
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
      {console.log(todos)}
      <Text style={styles.text}>Liste des TodoLists :</Text>
      <FlatList
        style={{ textAlign:'left' }}
        data={todos}
        renderItem={({item}) => 
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => 
            // navigation.navigate('../Screen/TodoLists.js', {id: item.id})
            // https://reactnavigation.org/docs/params/ !!!
            console.log('todo : navigation')
            }>
            <Text style={{color: '#D6D5A8', textDecorationLine: 'underline'}}>{item.title}</Text>
          </TouchableOpacity> 
          <TouchableOpacity 
          onPress={ async (e) => {
             //supprime TOUT, viens de la query, j'ai test avec un id particulier en dehors de la flatlist
            e.preventDefault();
            console.log('suppression de ' + item.id);
            await deleteTaskLists(item.id, userId, token);
            callback(username, token);
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