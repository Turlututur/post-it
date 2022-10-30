// npm i --save @react-navigation/bottom-tabs @react-navigation/native 

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../Screen/HomeScreen'
import SignInScreen from '../Screen/SignInScreen'
import SignUpScreen from '../Screen/SignUpScreen'
import SignOutScreen from '../Screen/SignOutScreen'
import { TokenContext } from '../Context/Context'


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
              <Stack.Screen options={{headerStyle: {backgroundColor: '#1B2430'}, headerTintColor: '#D6D5A8'}} name='Accueil' component={HomeScreen} />
              <Stack.Screen options={{headerStyle: {backgroundColor: '#1B2430'}, headerTintColor: '#D6D5A8'}} name='Deconnexion' component={SignOutScreen} />
            </Stack.Navigator>
            
          )}
        </NavigationContainer>
      )}
    </TokenContext.Consumer>
  )
}
