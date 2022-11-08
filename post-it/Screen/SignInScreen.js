import React from "react";
import { View, Text } from "react-native";
import styles from "../styles/styles";
import { Link } from "@react-navigation/native";

import SignIn from "../components/SignIn";

/**
 * Ecran de connexion de l'aplication.
 * @returns Une formulaire pour se connecter.
 */
export default function SignInScreen() {
  return (
    <View style={styles.container}>
      <SignIn />
      <Text style={styles.tinyText}>
        Vous pouvez aussi vous{" "}
        <Link style={styles.link} to={{ screen: "S'inscrire" }}>
          inscrire
        </Link>
      </Text>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#1B2430",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   text: {
//     color: "#D6D5A8",
//   },
//   link: {
//     color: "#816797",
//     textDecorationLine: "underline",
//   },
// });
