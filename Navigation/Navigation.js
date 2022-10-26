// npm i --save @react-navigation/bottom-tabs @react-navigation/native 

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import TodoListsScreen from '../Screen/TodoListsScreen'
import HomeScreen from '../Screen/HomeScreen'
import SignInScreen from '../Screen/SignInScreen'
import SignUpScreen from '../Screen/SignUpScreen'
import SignOutScreen from '../Screen/SignOutScreen'
import TodoLists from '../Screen/TodoLists'

import { TokenContext } from '../Context/Context'

const Tab = createBottomTabNavigator();


export default function Navigation () {
  return (
    <TokenContext.Consumer>
      {([token, setToken]) => (
        <NavigationContainer>
          {token == null ? (
            <Tab.Navigator
              screenOptions={{
                tabBarActiveTintColor: '#1B2430',
                tabBarInactiveTintColor: 'gray',
                tabBarActiveBackgroundColor: '#816797',
                tabBarInactiveBackgroundColor: '#51557E'
              }}
            >
              <Tab.Screen options={{headerStyle: {backgroundColor: '#1B2430'}, headerTintColor: '#D6D5A8'}} name='Connexion' component={SignInScreen} />
              <Tab.Screen options={{headerStyle: {backgroundColor: '#1B2430'}, headerTintColor: '#D6D5A8'}} name="S'inscire" component={SignUpScreen} />
            </Tab.Navigator>
          ) : (
            <Tab.Navigator
              screenOptions={{
                tabBarActiveTintColor: '#1B2430',
                tabBarInactiveTintColor: 'gray',
                tabBarActiveBackgroundColor: '#816797',
                tabBarInactiveBackgroundColor: '#51557E'
              }}
            >
              <Tab.Screen options={{headerStyle: {backgroundColor: '#1B2430'}, headerTintColor: '#D6D5A8'}} name='Accueil' component={HomeScreen} />
              <Tab.Screen options={{headerStyle: {backgroundColor: '#1B2430'}, headerTintColor: '#D6D5A8'}} name='Mes listes' component={TodoListsScreen} />
              <Tab.Screen options={{headerStyle: {backgroundColor: '#1B2430'}, headerTintColor: '#D6D5A8'}} name='Deconnexion' component={SignOutScreen} />
              <Tab.Screen options={{headerStyle: {backgroundColor: '#1B2430'}, headerTintColor: '#D6D5A8'}} name='Ma Todolist' component={TodoLists} />
            </Tab.Navigator>
          )}
        </NavigationContainer>
      )}
    </TokenContext.Consumer>
  )
}
