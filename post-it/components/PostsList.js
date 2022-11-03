import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList} from 'react-native'
import { getPosts, deletePost } from '../API/postItAPI';
import { useNavigation } from '@react-navigation/native';

/**
 * Composant permettant de récupérrer et d'afficher les posts d'un projet.
 * @param {String} username Le nom d'utilisateur connecté
 * @param {String} token    Le token d'autorisation de l'api 
 * @param {String} userRole Le rôle de l'utilisateur connecté
 * @param {ID} id           L'id du projet auquel appartiennent les posts, necessaire pour les récupérer.
 * @returns Une flatlist de posts.
 */
export default function PostsList({username, token, userRole, id}) {
    const projectID = id;
    console.log(projectID)
    const [posts, setPosts] = useState([]);
    const navigation = useNavigation();     //utile pour plus tard

    /**
    * Fonction permettant de récuperer la liste des posts grâce à getPosts, provenant de ../API/postitApi.js
    * et de mettre ces posts dans une variable 'posts'.
    * @param {String} id       L'id du projet 
    * @param {String} token    Le token d'autorisation de l'api
    */
    const callback = (id, token) => {
      getPosts(id,token)
      .then(projectList => {
        setPosts(projectList)
      })
    }
  
    useEffect(() => {
      callback(id, token)
    }, [id, token])
  
 
    if(userRole == "manager") {

      return (
        <>
        <View>
        {console.log(posts)}
        <Text style={styles.text}>Liste des Projets :</Text>
        <FlatList
          style={{ textAlign:'left', paddingLeft: 10, paddingTop:20 }}
          data={posts}
          renderItem={({item}) => 
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => {
              // On navigue vers la liste de posts en passant l'id et le titre du projet en paramètres
            //   navigation.navigate("Posts", {
            //   id: item.id,
            //   title: item.title
            // });
          }}>
            <Text style={[styles.text_item, {color: '#D6D5A8', textDecorationLine: 'underline'}]}>{item.title} ; Etat : {item.state}</Text>
          </TouchableOpacity>
            <TouchableOpacity 
            onPress={ async (e) => {
              e.preventDefault();
              console.log('suppression de ' + item.title +" "+ item.id);
              await deletePost(item.id, token);
              callback(id, token);
            }}
            >
              <Image source={require('../assets/trash-can-outline-white.png')} style={{ height: 24, width: 24 }} />
            </TouchableOpacity>
          </View>
           } 
        />
        </View>
      </>
      )
    }

    if(userRole == "writter") {
      return (
      <>
      <View>
        {console.log(posts)}
        <Text style={styles.text}>Liste des Projets :</Text>
        <FlatList
          style={{ textAlign:'center', paddingLeft: 10, paddingTop:20 }}
          data={posts}
          renderItem={({item}) => 
          <View>
            <TouchableOpacity onPress={() => {
              // On navigue vers la liste de posts en passant l'id et le titre du projet en paramètres
            //   navigation.navigate("Posts", {
            //     id: item.id,
            //     title: item.title
            //   });
          }}>
          <Text style={[styles.text_item, {color: '#D6D5A8', textDecorationLine: 'underline'}]}>{item.title} ; {item.state}</Text>
          </TouchableOpacity>
          </View>
           } 
        />
        </View>  
        <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate("Nouveau post", {
            id: projectID
          })
        }}
        style={styles.touchableOpacityStyle}>
        <Image
          source={require('../assets/plus_icon_repaint.png')}
          style={styles.floatingButtonStyle}
        />
      </TouchableOpacity>
      </>
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