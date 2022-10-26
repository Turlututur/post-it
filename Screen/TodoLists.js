import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { TokenContext } from '../Context/Context';
import { UsernameContext } from '../Context/Context';
import { getTasks } from '../API/todoAPI';

export default function TodoLists({route, navigation}){
    const { id, title } = route.params;
    function todos(id,token){
      getTasks(id, token)
      .then(taskList => {
          console.log(taskList)
      })
  }
    return (
        <View style={styles.container}>
          <TokenContext.Consumer>
          {([token, setToken]) => (
            <UsernameContext.Consumer>
              {([username, setUsername]) => 
                <>
                <Text style={styles.text}>La Liste de tâches {title} ayant pour ID : {id}</Text>
                <Pressable 
                style={styles.pressable}
                onPress={() => todos(id, token)}
                >
                <Text style={styles.text}>ConsolLog TaskList</Text>
                </Pressable> 
                <Pressable 
                style={styles.pressable}
                onPress={() => navigation.goBack()}
                >
                <Text style={styles.text}>Retour</Text>
                </Pressable> 
                </>
              }
              
            </UsernameContext.Consumer>
          )}
          </TokenContext.Consumer>
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