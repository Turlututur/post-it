import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList} from 'react-native'
import { getProjects, deleteProject, getUserData } from '../API/postItAPI';
import { useNavigation } from '@react-navigation/native';

/**
 * Composant permettant de récupérrer et d'afficher les projets auquels un utilisateur est assigné.
 * @param {String} username Le nom d'utilisateur connecté
 * @param {String} token    Le token d'autorisation de l'api 
 * @param {String} userRole Le rôle de l'utilisateur connecté
 * @returns Une flatlist de projets.
 */
export default function ProjectList({username, token, userRole}) {
    const [projects, setProjects] = useState([]);
    const [userId, setUserId] = useState();
    const navigation = useNavigation(); 

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
  
    const clickHandler = () => {
      //function to handle click on floating Action Button
      alert('Todo : page de création de projet !');
    };
    
    if(userRole == "manager") {

      return (
        <>
        <View>
        <Text style={styles.text}>ID de l'user : {userId}</Text>
        {console.log(projects)}
        <Text style={styles.text}>Liste des Projets :</Text>
        <FlatList
          style={{ textAlign:'left', paddingLeft: 10, paddingTop:20 }}
          data={projects}
          renderItem={({item}) => 
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => {
              // On navigue vers la liste de posts en passant l'id et le titre du projet en paramètres
              navigation.navigate("Posts", {
              id: item.id
            });
          }}>
            <Text style={[styles.text_item, {color: '#D6D5A8', textDecorationLine: 'underline'}]}>{item.title}</Text>
          </TouchableOpacity>
            <TouchableOpacity 
            onPress={ async (e) => {
              e.preventDefault();
              console.log('suppression de ' + item.title +" "+ item.id);
              await deleteProject(item.id, item.title, token);
              callback(username, token);
            }}
            >
              <Image source={require('../assets/trash-can-outline-white.png')} style={{ height: 24, width: 24 }} />
            </TouchableOpacity>
          </View>
           } 
        />
        </View>
        
        <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {navigation.navigate("Nouveau Projet")}}
        style={styles.touchableOpacityStyle}>
        <Image
          source={require('../assets/plus_icon_repaint.png')}
          style={styles.floatingButtonStyle}
        />
      </TouchableOpacity>
      </>
      )
    }

    if(userRole == "writter") {
      return (
      <View>
        <Text style={styles.text}>ID de l'user : {userId}</Text>
        {console.log(projects)}
        <Text style={styles.text}>Liste des Projets :</Text>
        <FlatList
          style={{ textAlign:'center', paddingLeft: 10, paddingTop:20 }}
          data={projects}
          renderItem={({item}) => 
          <View>
            <TouchableOpacity onPress={() => {
              // On navigue vers la liste de posts en passant l'id et le titre du projet en paramètres
              navigation.navigate("Posts", {
                id: item.id
              });
          }}>
          <Text style={[styles.text_item, {color: '#D6D5A8', textDecorationLine: 'underline'}]}>{item.title}</Text>
          </TouchableOpacity>
          </View>
           } 
        />
        </View>  
      )    
    } else {
      // En théorie ça ne dervait jamais s'afficher 
      return (
        <><Text style={styles.text}>Vous n'avez pas de rôle ???</Text></>
      )
    }
  
    
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1B2430',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 150
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
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    //backgroundColor:'black'
  }
  })