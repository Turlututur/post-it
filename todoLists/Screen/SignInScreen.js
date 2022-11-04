import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "@react-navigation/native";

import SignIn from "../components/SignIn";

export default function SignInScreen() {
  return (
    <View style={styles.container}>
      <SignIn />
      <Text style={styles.text}>
        Vous pouvez aussi vous{" "}
        <Link style={styles.link} to={{ screen: "S'inscrire" }}>
          inscrire
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
