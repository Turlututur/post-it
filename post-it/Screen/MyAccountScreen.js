import React from "react";
import { View, ScrollView, Text, Pressable } from "react-native";
import styles from "../styles/styles";
import { TokenContext } from "../Context/Context";
import { UsernameContext } from "../Context/Context";
import { deleteUser } from "../API/postItAPI";

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
                <ScrollView
                  contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: "center",
                  }}
                >
                  <View style={styles.container}>
                    <Text style={styles.text}>
                      Bienvenue sur votre compte {username} {"\n"}
                    </Text>
                    <Text style={styles.tinyText}>
                      Vous pouvez vous déconnecter ou encore supprimer votre
                      compte. Attention, la suppression est instantanée et les
                      données effacées seront irrécupérables.
                      {"\n"}
                    </Text>
                    <Pressable
                      style={styles.pressable}
                      onPress={() => setToken(null)}
                    >
                      <Text style={styles.tinyTextWhite}>Me deconnecter</Text>
                    </Pressable>
                    <Pressable
                      style={styles.pressable}
                      onPress={async (e) => {
                        e.preventDefault();
                        await deleteUser(username, token);
                        setToken(null);
                      }}
                    >
                      <Text style={styles.tinyTextWhite}>
                        Supprimer mon compte
                      </Text>
                    </Pressable>
                  </View>
                </ScrollView>
              </View>
            );
          }}
        </UsernameContext.Consumer>
      )}
    </TokenContext.Consumer>
  );
}
