import React, { useState } from 'react'
import Navigation from './Navigation/Navigation'

import { TokenContext, UsernameContext, UserRoleContext } from './Context/Context'

export default function App () {
  const [token, setToken] = useState(null)
  const [username, setUsername] = useState(null)
  const [userRole, setUserRole] = useState(null)

  console.log('token', token)
  console.log('role', userRole)
  return (
    <UsernameContext.Provider value={[username, setUsername]}>
      <TokenContext.Provider value={[token, setToken]}>
        <UserRoleContext.Provider value={[userRole, setUserRole]}>
          <Navigation />
        </UserRoleContext.Provider>
      </TokenContext.Provider>
    </UsernameContext.Provider>
  )
}

//styles : colorPalette : https://colorhunt.co/palette/1b243051557e816797d6d5a8
