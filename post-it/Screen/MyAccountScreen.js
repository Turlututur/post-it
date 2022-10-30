import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'

import { TokenContext } from '../Context/Context'
import { UsernameContext } from '../Context/Context'


export default function MyAccount ({ navigation }) {
  return (
    
    <TokenContext.Consumer>
      {([token, setToken]) => (
        <UsernameContext.Consumer>
          {([username, setUsername]) => {
            return (
              <View style={styles.container}>
                <Text style={styles.text}>Votre compte {username}</Text>
                <Pressable 
                  style={styles.pressable}
                  onPress={() => setToken(null)} >
                  <Text style={styles.text}>Me deconnecter</Text>
                </Pressable>
              </View>
            )
          }}
        </UsernameContext.Consumer>
      )}
    </TokenContext.Consumer>

    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B2430',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text : {
    color: '#D6D5A8'
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
  }
})
