import React, { useState } from "react";
import { View, Text, Pressable, Image } from "react-native";
import styles from "../styles/styles";
import { Link } from "@react-navigation/native";

import {
  UsernameContext,
  TokenContext,
  UserRoleContext,
} from "../Context/Context";

import { getUserData, updateUserNbConnections } from "../API/postItAPI";

import Welcome from "../components/Welcome";
import ProjectList from "../components/ProjectList";

/**
 * Ecran permettant d'afficher un accueil, base de la navigation de l'app.
 * @returns Des informations basiques et la possiblité de naviguer dans l'app.
 * @todo    Une jolie interface de bienvenue !
 */
export default function HomeScreen() {
  const [nbConnections, setNbConnections] = useState(0);

  const getNbConnections = (username, token) => {
    getUserData(username, token).then((data) => {
      setNbConnections(data[0].nbConnections);
      console.log("Nb logins: ", data[0].nbConnections);
      updateUserNbConnections(username, token, data[0].nbConnections + 1);
    });
  };

  return (
    <UserRoleContext.Consumer>
      {([userRole, setUserRole]) => (
        <TokenContext.Consumer>
          {([token, setToken]) => (
            <UsernameContext.Consumer>
              {([username, setUsername]) => {
                getNbConnections(username, token);
                if (nbConnections < 3) {
                  return (
                    <Welcome
                      username={username}
                      token={token}
                      userRole={userRole}
                    ></Welcome>
                  );
                } else {
                  return (
                    <View style={[styles.container, { marginTop: 0 }]}>
                      <Image
                        source={require("../assets/managerProject.png")}
                        style={{ width: 1380 / 4.5, height: 920 / 4.5 }}
                      />
                      <Text style={styles.veryTinyText}>
                        Image by storyset on Freepik
                      </Text>
                      {/* Le composant importé : */}
                      <ProjectList
                        username={username}
                        token={token}
                        userRole={userRole}
                      ></ProjectList>
                    </View>
                  );
                }
              }}
            </UsernameContext.Consumer>
          )}
        </TokenContext.Consumer>
      )}
    </UserRoleContext.Consumer>
  );
}
