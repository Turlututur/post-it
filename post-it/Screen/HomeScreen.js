import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import styles from "../styles/styles";
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
            <Text style={styles.text}>Bienvenue !</Text>
            <Text style={styles.tinyText}>
              Inscrit sous le login {username}
            </Text>
            <Text style={styles.tinyText}>
              Vous pouvez aussi vous{" "}
              <Link style={styles.link} to={{ screen: "Mon compte" }}>
                deconnecter
              </Link>
            </Text>
            <Pressable style={styles.pressable}>
              <Text style={styles.tinyText}>
                <Link style={styles.tinyText} to={{ screen: "Projets" }}>
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
