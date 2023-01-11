import React from "react";
import {
  View,
  ScrollView,
  Text,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import styles from "../styles/styles";
import { Link } from "@react-navigation/native";

import SignIn from "../components/SignIn";

/**
 * Ecran de connexion de l'aplication.
 * @returns Une formulaire pour se connecter.
 */
export default function SignInScreen() {
  return (
    <>
      <KeyboardAvoidingView
        // Permet de ne pas cacher le formulaire avec le clavier sur téléphone.
        // Mettre en commentaire ligne du dessous si problèmes (Web)...
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          >
            <View style={styles.container}>
              <Image
                source={require("../assets/corpoImg.png")}
                style={[styles.logo, { width: 1500 / 4, height: 741 / 4 }]}
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
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}
