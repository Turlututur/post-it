import React from "react";
import { View, Text, KeyboardAvoidingView } from "react-native";
import styles from "../styles/styles";
import { Link } from "@react-navigation/native";

import SignIn from "../components/SignIn";

/**
 * Ecran de connexion de l'aplication.
 * @returns Une formulaire pour se connecter.
 */
export default function SignInScreen() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={[styles.container, { marginTop: -250 }]}>
        <SignIn />
        <Text style={styles.tinyText}>
          Vous pouvez aussi vous{" "}
          <Link style={styles.link} to={{ screen: "S'inscrire" }}>
            inscrire
          </Link>
        </Text>
      </View>
    </KeyboardAvoidingView>
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
