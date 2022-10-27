import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { TokenContext } from '../Context/Context';
import { UsernameContext } from '../Context/Context';
import TodoList from '../components/TodoList';

export default function TodoLists({route, navigation}){
    const { id, title } = route.params;

    return (
      <View style={styles.container}>
        <TokenContext.Consumer>
        {([token, setToken]) => (
          <UsernameContext.Consumer>
            {([username, setUsername]) => 
              <>
                <TodoList username={username} token={token} id={id} />
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