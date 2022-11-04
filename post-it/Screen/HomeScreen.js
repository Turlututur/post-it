import React from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { Link } from "@react-navigation/native";

import { UsernameContext } from "../Context/Context";

/**
 * Ecran permettant d'afficher un accueil, base de la navigation de l'app.
 * @returns Des informations basiques et la possiblité de naviguer dans l'app.
 * @todo    Une jolie interface de bienvenue !
 */
export default function HomeScreen() {
  return (
    <UsernameContext.Consumer>
      {([username, setUsername]) => {
        return (
          <View style={styles.container}>
            <Image
              source={require("../assets/PostItCapt.png")}
              style={{ width: 231 / 1.04, height: 140 / 1.04 }}
            />
            <Text style={[styles.text, { marginTop: 100 }]}>Bienvenue !</Text>
            <Text style={styles.text}>Inscrit sous le login {username}</Text>
            <Text style={styles.text}>
              Vous pouvez aussi vous{" "}
              <Link style={styles.link} to={{ screen: "Mon compte" }}>
                deconnecter
              </Link>
            </Text>
            <Pressable style={styles.pressable}>
              <Text style={styles.text}>
                <Link style={styles.text} to={{ screen: "Projets" }}>
                  Projets
                </Link>
              </Text>
            </Pressable>
          </View>
        );
      }}
    </UsernameContext.Consumer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B2430",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -400,
  },
  text: {
    color: "#D6D5A8",
  },
  link: {
    color: "#816797",
    textDecorationLine: "underline",
  },
  pressable: {
    backgroundColor: "#51557E",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
    height: 40,
    width: 300,
    borderRadius: 10,
  },
});
