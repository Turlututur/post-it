import React, { useEffect, useState } from "react";
import { View, Text, Pressable, TouchableOpacity, StyleSheet, TextInput, Image, FlatList} from 'react-native'
import { getProjects, getUserData } from '../API/postItAPI';
import { useNavigation } from '@react-navigation/native';

/**
 * Composant permettant de récupérrer et d'afficher les projets auquels un utilisateur est assigné.
 * @param {String} username Le nom d'utilisateur connecté
 * @param {String} token    Le token d'autorisation de l'api 
 * @returns Une flatlist de projets.
 * @todo Suppression de Projets en fonction du rôle (manager a le droit, writter n'a pas le droit)
 */
export default function ProjectList({username, token}) {
    const [projects, setProjects] = useState([]);
    const [userId, setUserId] = useState();
    const navigation = useNavigation(); //utile pour plus tard...

    /**
    * Fonction permettant de récuperer la liste de projets grâce à getProjects, provenant de ../API/postitApi.js
    * et de mettre ces projets dans une variable 'projects'.
    * @param {String} username Le nom d'utilisateur connecté
    * @param {String} token    Le token d'autorisation de l'api
    */
    const callback = (username, token) => {
      getProjects(username,token)
      .then(projectList => {
        setProjects(projectList)
      })
    }
  
    useEffect(() => {
      callback(username, token)
    }, [username, token])
  
    /**
    * Fonction permettant de récuperer l'id d'un utilisateur grâce à getUserData, provenant de ../API/postitApi.js
    * et de mettre cet id dans une variable 'userId'.
    * @param {String} username Le nom d'utilisateur connecté
    * @param {String} token    Le token d'autorisation de l'api
    */  
    const getId = (username, token) => {
      getUserData(username, token)
      .then(data => {
        setUserId(data[0].id)
        console.log(data[0].id)
      })
    } 
  
    useEffect(() => {
      getId(username, token)
    }, [username, token])
  
  
    return (
      <View>
      <Text style={styles.text}>ID de l'user : {userId}</Text>
      {console.log(projects)}
      <Text style={styles.text}>Liste des Projets :</Text>
      <FlatList
        style={{ textAlign:'left', paddingLeft: 10, paddingTop:20 }}
        data={projects}
        renderItem={({item}) => 
        <View style={{flexDirection: 'row'}}>
        <Text style={[styles.text_item, {color: '#D6D5A8', textDecorationLine: 'underline'}]}>{item.title}</Text>
          <TouchableOpacity 
          onPress={ async (e) => {
            // e.preventDefault();
            // console.log('suppression de ' + item.title +" "+ item.id);
            // await deleteTaskLists(item.id, item.title ,userId, token);
            // callback(username, token);
            console.log('todo : delete')
          }}
          >
            <Image source={require('../assets/trash-can-outline-white.png')} style={{ height: 24, width: 24 }} />
          </TouchableOpacity>
        </View>
         } 
      />
      </View>
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
    text_input: {
      borderWidth: 1,
      backgroundColor: '#D6D5A8',
      color: '#1B2430',
      margin: 15,
      height: 40,
      width: 300,
      borderRadius: 10,
      paddingLeft:10
    },
    pressable: {
      backgroundColor: '#51557E',
      color: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 15,
      height: 40,
      width: 300,
      borderRadius:10
    },
    text_item: {
      marginLeft: 10,
      width: 150
  }
  })