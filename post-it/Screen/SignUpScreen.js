import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Link } from "@react-navigation/native";

import SignUp from "../components/SignUp";

/**
 * Ecran d'inscription de l'application.
 * @param {*} navigation Si il ya des données de Navigation
 * @returns Un formulaire d'inscription.
 */
export default function SignUpScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <SignUp />
      <Text style={styles.text}>
        Déjà un compte ?{" "}
        <Link style={styles.link} to={{ screen: "Connexion" }}>
          Se connecter
        </Link>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B2430",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#D6D5A8",
  },
  link: {
    color: "#816797",
    textDecorationLine: "underline",
  },
});
