// npm install react-native-select-dropdown
import React, { useState } from 'react'
import {
  Text,
  TextInput,
  Pressable,
  View,
  StyleSheet,
  ActivityIndicator
} from 'react-native'

import { signIn, signUp } from '../API/postItAPI'

import SelectDropdown from 'react-native-select-dropdown'

import { TokenContext } from '../Context/Context'
import { UsernameContext } from '../Context/Context'
import { UserRoleContext } from '../Context/Context'

export default function SignIn () {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const roles = ["manager", "writter"]
  const [role, setRole] = useState('')
  const [error, setError] = useState('')
  const [visible, setVisible] = useState(true)

  const getSignedIn = (setToken, setUsername, setUserRole) => {
    setError('')
    if (login == '' || password == '' || role == '') return
    setVisible(false)
    signIn(login, password, role)
      .then(token => {
        setUsername(login)
        setToken(token)
        setUserRole(role)
      })
      .catch(err => {
        setError(err.message)
      })
    setVisible(true)
  }

  return (
    <UserRoleContext.Consumer>
      {([userRole, setUserRole]) => (
      <TokenContext.Consumer>
        {([token, setToken]) => (
          <UsernameContext.Consumer>
            {([username, setUsername]) => {

              return(
                <View>
                {visible ? (
                  <>
                    <View style={{ flexDirection: 'row' }}>
                      
                      {/* <Text style={styles.label}>Login</Text> */}
                      <TextInput
                        placeholder = "Nom d'utilisateur"
                        style={styles.text_input}
                        onChangeText={setLogin}
                        onSubmitEditing={() =>
                          getSignedIn(setToken, setUsername, setUserRole)
                        }
                        value={login}
                      />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      {/* <Text style={styles.label}>Mot de passe</Text> */}
                      <TextInput
                        placeholder = "Mot de passe"
                        style={styles.text_input}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                        onSubmitEditing={() =>
                          getSignedIn(setToken, setUsername, setUserRole)
                        }
                        value={password}
                      />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                    {/* <TextInput
                        placeholder = "Role"
                        style={styles.text_input}
                        onChangeText={setRole}
                        onSubmitEditing={() =>
                          getSignedIn(setToken, setUsername, setUserRole)
                        }
                        value={role}
                      /> */}

                      <SelectDropdown
                        dropdownStyle={{
                          backgroundColor: "#D6D5A8", 
                          borderRadius:10,
                          height: 90,
                          width: 300,
                        }}
                        buttonStyle={{
                          backgroundColor: '#D6D5A8',
                          color: 'white',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: 15,
                          height: 40,
                          width: 300,
                          borderRadius:10, 
                        }}
                        buttonTextStyle={{color:'#1B2430', fontSize:15}}
                        data={roles}
                        onSelect={(selectedItem) => {
                          setRole(selectedItem)
                        }}
                        defaultButtonText={'Rôle'}
                        buttonTextAfterSelection={(selectedItem) => {
                          return selectedItem
                        }}
                        rowTextForSelection={(item) => {
                          return item
                        }}
                      />
                      </View>
                    <Pressable 
                      style={styles.pressable}
                      onPress={() => getSignedIn(setToken, setUsername, setUserRole)}
                      // title='Sign In'
                    >
                      <Text style={styles.label}>Connexion</Text>
                    </Pressable>
                    {error ? (
                      <Text style={styles.text_error}>{error}</Text>
                    ) : (
                      []
                    )}
                  </>
                ) : (
                  <ActivityIndicator />
                )}
              </View>
              )

            }}
          </UsernameContext.Consumer>
            )}
        </TokenContext.Consumer>
      )}
    </UserRoleContext.Consumer>
  )
}

const styles = StyleSheet.create({
  label: {
    justifyContent: 'center',
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
