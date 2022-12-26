import React from "react";
import { View, Text, KeyboardAvoidingView, Image } from "react-native";
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
      // Permet de ne pas cacher le formulaire avec le clavier sur téléphone.
      // Mettre en commentaire ligne du dessous si problèmes (Web)...
      // behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={[styles.container, { marginTop: -250 }]}>
        <Image
          source={require("../assets/corpoImg.png")}
          style={{ width: 1500 / 3.04, height: 741 / 3.04 }}
        />
        <Text style={styles.veryTinyText}>
          Illustration made by Giovanna Giuliano
        </Text>
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
