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
          <View style={[styles.container, { marginTop: -75 }]}>
            <Image
              source={require("../assets/PostItCapt.png")}
              style={{ width: 231 / 1.04, height: 140 / 1.04 }}
            />
            <Image
              source={require("../assets/homepage.png")}
              style={{ width: 1380 / 4.5, height: 920 / 4.5 }}
            />
            <Text style={styles.text}>
              {"\n"}Hello {username} et bienvenue chez Post It !{"\n"}
            </Text>
            <View style={{ marginLeft: 15, marginRight: 15 }}>
              <Text style={styles.tinyText}>
                Post It va vous permettre de vous organiser. {"\n"}
                En tant que manager, créez des projets et invitez vos
                collaborateurs pour qu'ils puissent y déposer leur idées de post
                et validez leurs propositions.
                {"\n"}
                En tant que community manager, soumettez vos idées dans les
                projets auxquels vous êtes assignés et attendez le feu vert.{" "}
                {"\n"}
                {"\n"}
              </Text>
            </View>
            <Text style={styles.text}>
              {"\n"}3... 2... 1... Postez !{"\n"}
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
        );
      }}
    </UsernameContext.Consumer>
  );
}
