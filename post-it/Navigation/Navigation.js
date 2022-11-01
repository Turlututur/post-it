// npm i --save @react-navigation/bottom-tabs @react-navigation/native 
// npm i @fortawesome/react-native-fontawesome
// npm i --save @fortawesome/free-solid-svg-icons
// npm install react-native-svg@9.13.3
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { Text, Pressable, StyleSheet } from 'react-native';
import { Icon } from '@rneui/themed';
import { Link } from '@react-navigation/native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'


import HomeScreen from '../Screen/HomeScreen'
import SignInScreen from '../Screen/SignInScreen'
import SignUpScreen from '../Screen/SignUpScreen'
import MyAccount from '../Screen/MyAccountScreen'
import Projects from '../Screen/ProjectsScreen';
import { TokenContext } from '../Context/Context'


const Stack = createStackNavigator();

/**
 * Permet de gérer la navigation de l'application via la création de 'screens', pages de l'app.
 */
export default function Navigation () {

  return (
    <TokenContext.Consumer>
      {([token, setToken]) => (
        <NavigationContainer>
          {token == null ? (
            <Stack.Navigator>
              <Stack.Screen options={{headerStyle: {backgroundColor: '#1B2430'}, headerTintColor: '#D6D5A8'}} name='Connexion' component={SignInScreen} />
              <Stack.Screen options={{headerStyle: {backgroundColor: '#1B2430'}, headerTintColor: '#D6D5A8'}} name="S'inscrire" component={SignUpScreen} />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator>
              <Stack.Screen 
              options={{
                headerStyle: {backgroundColor: '#1B2430'}, headerTintColor: '#D6D5A8',
                headerRight: () => (
                    <Link 
                      style={[styles.link, {paddingRight: 20}]}
                      to={{ screen: "Mon compte" }}
                    >
                      <FontAwesomeIcon 
                      icon={faUser}
                      color='#D6D5A8'
                      size={25}/>
                    </Link>
                ),
              }} 
              name='Accueil' component={HomeScreen} />

              <Stack.Screen name="Mon compte" component={MyAccount} options={{ headerStyle: {backgroundColor: '#1B2430'}, headerTintColor: '#D6D5A8'}}/>
              <Stack.Screen name="Projets" component={Projects} 
              options={{
                headerStyle: {backgroundColor: '#1B2430'}, headerTintColor: '#D6D5A8',
                headerRight: () => (
                    <Link 
                      style={[styles.link, {paddingRight: 20}]}
                      to={{ screen: "Mon compte" }}
                    >
                      <FontAwesomeIcon 
                      icon={faUser}
                      color='#D6D5A8'
                      size={25}/>
                    </Link>
                ),
              }}/>    

            </Stack.Navigator>
            
          )}
        </NavigationContainer>
      )}
    </TokenContext.Consumer>
  )
}

const styles = StyleSheet.create({
  label: {
    width: 70,
    color: '#D6D5A8'
  },
  text_error: {
    color: 'red'
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
    backgroundColor: '#1B2430',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
    height: 40,
    width: 40,
    borderRadius:10
  }
})