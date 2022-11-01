import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Link } from '@react-navigation/native'

import { UsernameContext } from '../Context/Context'

/**
 * Ecran permettant d'afficher un accueil, base de la navigation de l'app.
 * @returns Des informations basiques et la possiblité de naviguer dans l'app.
 * @todo    Une jolie interface de bienvenue !
 */
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
            <Pressable
                    style={styles.pressable}
                  >
                    <Text style={styles.text}>
                    <Link 
                      style={styles.text}
                      to={{ screen: "Projets" }}
                    >
                      Projets
                    </Link>
                    </Text>
                  </Pressable>
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
