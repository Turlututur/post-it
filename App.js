import React, { useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

import Navigation from './Navigation/Navigation'

import { TokenContext, UsernameContext } from './Context/Context'

export default function App () {
  const [token, setToken] = useState(null)
  const [username, setUsername] = useState(null)

  console.log('token', token)
  return (
    <UsernameContext.Provider value={[username, setUsername]}>
      <TokenContext.Provider value={[token, setToken]}>
        <Navigation />
      </TokenContext.Provider>
    </UsernameContext.Provider>
  )
}

//colorPalette : https://colorhunt.co/palette/1b243051557e816797d6d5a8
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
