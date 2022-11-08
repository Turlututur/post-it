import React, { useState } from "react";
import Navigation from "./Navigation/Navigation";

import {
  TokenContext,
  UsernameContext,
  UserRoleContext,
} from "./Context/Context";

/**
 * La base de l'application
 * @returns Le lancement des composants et écrans...
 */
export default function App() {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [userRole, setUserRole] = useState(null);

  return (
    <UsernameContext.Provider value={[username, setUsername]}>
      <TokenContext.Provider value={[token, setToken]}>
        <UserRoleContext.Provider value={[userRole, setUserRole]}>
          <Navigation />
        </UserRoleContext.Provider>
      </TokenContext.Provider>
    </UsernameContext.Provider>
  );
}
