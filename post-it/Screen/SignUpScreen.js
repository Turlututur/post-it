import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "@react-navigation/native";
import styles from "../styles/styles";
import SignUp from "../components/SignUp";

/**
 * Ecran d'inscription de l'application.
 * @param {*} navigation Si il ya des données de Navigation
 * @returns Un formulaire d'inscription.
 */
export default function SignUpScreen({ navigation }) {
  return (
    <>
      <View style={styles.container}>
        <SignUp />
        <Text style={styles.tinyText}>
          Déjà un compte ?{" "}
          <Link style={styles.link} to={{ screen: "Connexion" }}>
            Se connecter
          </Link>
        </Text>
      </View>
    </>
  );
}
