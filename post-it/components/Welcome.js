// npm install react-native-super-grid
import React from "react";
import { View, Text, Pressable, Image, ScrollView } from "react-native";
import { Link } from "@react-navigation/native";
import styles from "../styles/styles";

/**
 * Composant permettant d'afficher un message de bienvenue en fonction du rôle
 * @param {String} username Le nom d'utilisateur connecté
 * @param {String} token    Le token d'autorisation de l'api
 * @param {String} userRole Le rôle de l'utilisateur connecté
 * @returns Un acceuil chaleureux
 */
export default function Welcome({ username, token, userRole }) {
  if (userRole == "manager") {
    return (
      <>
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          >
            <View style={styles.container}>
              <Image
                source={require("../assets/PostItCapt.png")}
                style={{ width: 231 / 1.04, height: 140 / 1.04 }}
              />
              <Image
                source={require("../assets/homepage.png")}
                style={{ width: 1380 / 4.5, height: 920 / 4.5 }}
              />
              <Text style={styles.veryTinyText}>
                Image by storyset on Freepik
              </Text>
              <Text style={styles.text}>
                {"\n"}Hello {username} et bienvenue chez Post It ! {"\n"}
              </Text>
              <View style={{ marginLeft: 15, marginRight: 15 }}>
                <Text style={styles.tinyText}>
                  Post It va vous permettre de vous organiser. {"\n"}
                  Vous êtes manager, vous pouvez créer des projets. Un projet va
                  pouvoir contenir des brouillons de posts qu'un community
                  manager (writter) pourra créer.
                  {"\n"}En tant que manager, créez des projets, assignez y des
                  community managers et validez (ou non) leurs idées de posts !
                  {"\n"}
                  {"\n"}
                </Text>
              </View>
              <Text style={styles.text}>
                {"\n"}3... 2... 1... Créez un projet !{"\n"}
              </Text>
              <Pressable style={styles.pressable}>
                <Text
                  style={[
                    styles.tinyTextWhite,
                    { fontWeight: "bold", fontSize: 17 },
                  ]}
                >
                  <Link style={styles.tinyTextWhite} to={{ screen: "Projets" }}>
                    Vos projets
                  </Link>
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </>
    );
  }

  if (userRole == "writter") {
    return (
      <>
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          >
            <View style={styles.container}>
              <Image
                source={require("../assets/PostItCapt.png")}
                style={{ width: 231 / 1.04, height: 140 / 1.04 }}
              />
              <Image
                source={require("../assets/homepage.png")}
                style={{ width: 1380 / 4.5, height: 920 / 4.5 }}
              />
              <Text style={styles.veryTinyText}>
                Image by storyset on Freepik
              </Text>
              <Text style={styles.text}>
                {"\n"}Hello {username} et bienvenue chez Post It ! {"\n"}
              </Text>
              <View style={{ marginLeft: 15, marginRight: 15 }}>
                <Text style={styles.tinyText}>
                  Post It va vous permettre de vous organiser. {"\n"}
                  Vous êtes writter, vous pouvez créer des posts. Un post est un
                  brouillon qui sera validé (ou non) par votre manager, une fois
                  validé, postez le sur les réseaux sociaux.{"\n"}
                  Rendez vous dans un de vos projets pour y créer vos premiers
                  posts à faire valider !{"\n"}
                  Pas de projet ? Attendez qu'un de vos manager vous y assigne.
                  {"\n"}
                </Text>
              </View>
              <Text style={styles.text}>
                {"\n"}3... 2... 1... Créez un post !{"\n"}
              </Text>
              <Pressable style={styles.pressable}>
                <Text
                  style={[
                    styles.tinyTextWhite,
                    { fontWeight: "bold", fontSize: 17 },
                  ]}
                >
                  <Link style={styles.tinyTextWhite} to={{ screen: "Projets" }}>
                    Vos projets
                  </Link>
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </>
    );
  } else {
    // En théorie ça ne dervait jamais s'afficher
    return (
      <>
        <Text style={styles.text}>Vous n'avez pas de rôle ???</Text>
      </>
    );
  }
}
