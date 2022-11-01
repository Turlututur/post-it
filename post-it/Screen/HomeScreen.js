import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Link } from '@react-navigation/native'

import { UsernameContext } from '../Context/Context'

export default function HomeScreen () {
  return (
    <UsernameContext.Consumer>
      {([username, setUsername]) => {
        return (
          <View
            style={styles.container}
          >
            <Text style={styles.text}>Bienvenue !</Text>
            <Text style={styles.text}>Inscrit sous le login {username}</Text>
            <Text style={styles.text}>
              Vous pouvez aussi vous{' '}
              <Link 
                style={styles.link}
                to={{ screen: "Mon compte" }}
              >
                deconnecter
              </Link>
            </Text>
          </View>
        )
      }}
    </UsernameContext.Consumer>
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
  link : {
    color: '#816797',
    textDecorationLine: 'underline'
  }
})
