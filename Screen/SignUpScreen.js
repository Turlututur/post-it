import React from 'react'
import { View, StyleSheet } from 'react-native'

import SignUp from '../components/SignUp'

export default function SignUpScreen ({ navigation }) {
  return (
    <View
      style={styles.container}
    >
      <SignUp />
    </View>
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
