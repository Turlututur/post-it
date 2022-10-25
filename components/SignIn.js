import React, { useState } from 'react'
import {
  Text,
  TextInput,
  Pressable,
  View,
  StyleSheet,
  ActivityIndicator
} from 'react-native'

import { signIn, signUp } from '../API/todoAPI'

import { TokenContext } from '../Context/Context'
import { UsernameContext } from '../Context/Context'

export default function SignIn () {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [visible, setVisible] = useState(true)

  const getSignedIn = (setToken, setUsername) => {
    setError('')
    if (login == '' || password == '') return
    setVisible(false)
    signIn(login, password)
      .then(token => {
        setUsername(login)
        setToken(token)
      })
      .catch(err => {
        setError(err.message)
      })
    setVisible(true)
  }

  return (
    <TokenContext.Consumer>
      {([token, setToken]) => (
        <UsernameContext.Consumer>
          {([username, setUsername]) => {
            return (
              <View>
                {visible ? (
                  <>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.label}>Login</Text>
                      <TextInput
                        style={styles.text_input}
                        onChangeText={setLogin}
                        onSubmitEditing={() =>
                          getSignedIn(setToken, setUsername)
                        }
                        value={login}
                      />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.label}>Password</Text>
                      <TextInput
                        style={styles.text_input}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                        onSubmitEditing={() =>
                          getSignedIn(setToken, setUsername)
                        }
                        value={password}
                      />
                    </View>
                    <Pressable 
                      style={styles.pressable}
                      onPress={() => getSignedIn(setToken, setUsername)}
                      // title='Sign In'
                    >
                      <Text style={styles.label}>Sign In</Text>
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
                 {/* <Button onPress={() => signUp("leTest","ouiLeTest").then(result => console.log(result))}
                  title='Print token on console'
                /> */}
              </View>
            )
          }}
        </UsernameContext.Consumer>
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
    //borderWidth: 1,
    backgroundColor: '#D6D5A8',
    color: '#1B2430',
    margin: 5
  },
  pressable: {
    backgroundColor: '#51557E',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:'10px'
  }
})
