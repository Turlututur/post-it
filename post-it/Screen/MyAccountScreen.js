import React from "react";
import { View, Text, Pressable } from "react-native";
import styles from "../styles/styles";
import { TokenContext } from "../Context/Context";
import { UsernameContext } from "../Context/Context";

/**
 * Ecran d'affichage des paramètres utilisateurs.
 * @param {*} navigation Si il ya des données de Navigation
 * @returns La possiblité de se déconnecter de l'api.
 * @todo Suppression de l'user, modification de mot de passe, modification de rôle...
 */
export default function MyAccount({ navigation }) {
  return (
    <TokenContext.Consumer>
      {([token, setToken]) => (
        <UsernameContext.Consumer>
          {([username, setUsername]) => {
            return (
              <View style={styles.container}>
                <Text style={styles.text}>Votre compte {username}</Text>
                <Pressable
                  style={styles.pressable}
                  onPress={() => setToken(null)}
                >
                  <Text style={styles.text}>Me deconnecter</Text>
                </Pressable>
              </View>
            );
          }}
        </UsernameContext.Consumer>
      )}
    </TokenContext.Consumer>
  );
}
