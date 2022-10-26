import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'

export default function TodoLists({route, navigation}){
    const { id, title } = route.params;
    return (
        <View style={styles.container}>
        <Text style={styles.text}>La Liste de tâches {title} ayant pour ID : {id}</Text>
        <Pressable 
        style={styles.pressable}
        onPress={() => navigation.goBack()}
        >
        <Text style={styles.text}>Retour</Text>
        </Pressable> 
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