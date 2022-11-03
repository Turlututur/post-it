import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import { getPostById } from "../API/postItAPI";
import { useNavigation } from "@react-navigation/native";

/**
 * Composant d'affichage du contenu d'un post
 * @param {String} username Le nom de l'utilisateur.
 * @param {String} token    Le token d'autorisation de l'app.
 * @param {String} userRole Le rôle de l'utilisateur.
 * @param {String} id       L'id du post sur lequel on travaille.
 * @returns                 L'affichage du contenu du post et @todo un formulaire de modification
 *                          en fonction du rôle de l'utilisateur.
 */
export default function PostDetails({ username, token, userRole, id }) {
  const [post, setPost] = useState([]);
  const navigation = useNavigation(); //utile pour plus tard

  /**
   * Fonction permettant de récuperer un post grâce à getPostById, provenant de ../API/postitApi.js
   * et de mettre ce post dans une variable 'post'.
   * @param {String} id       L'id du post
   * @param {String} token    Le token d'autorisation de l'api
   */
  const callback = (id, token) => {
    getPostById(id, token).then((projectList) => {
      setPost(projectList);
    });
  };

  useEffect(() => {
    callback(id, token);
  }, [id, token]);

  if (userRole == "manager") {
    return (
      <>
        <FlatList
          data={post}
          renderItem={({ item }) => (
            <View>
              {console.log(item)}
              <Text style={styles.text}>Titre: {item.title}</Text>
              <Text style={styles.text}>Contenu: {item.content}</Text>
              <Text style={styles.text}>Description: {item.desc}</Text>
              <Text style={styles.text}>Etat de validation: {item.state}</Text>
              <Text style={styles.text}>
                Commentaire de manager: {item.comment}
              </Text>
            </View>
          )}
        />
      </>
    );
  }

  if (userRole == "writter") {
    return (
      <>
        <FlatList
          data={post}
          renderItem={({ item }) => (
            <View>
              {console.log(item)}
              <Text style={styles.text}>Titre: {item.title}</Text>
              <Text style={styles.text}>Contenu: {item.content}</Text>
              <Text style={styles.text}>Description: {item.desc}</Text>
              <Text style={styles.text}>Etat de validation: {item.state}</Text>
              <Text style={styles.text}>
                Commentaire de manager: {item.comment}
              </Text>
            </View>
          )}
        />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B2430",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 150,
  },
  text: {
    color: "#D6D5A8",
  },
  link: {
    color: "#816797",
    textDecorationLine: "underline",
  },
  text_input: {
    borderWidth: 1,
    backgroundColor: "#D6D5A8",
    color: "#1B2430",
    margin: 15,
    height: 40,
    width: 300,
    borderRadius: 10,
    paddingLeft: 10,
  },
  pressable: {
    backgroundColor: "#51557E",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
    height: 40,
    width: 300,
    borderRadius: 10,
  },
  text_item: {
    marginLeft: 10,
    width: 150,
  },
  touchableOpacityStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
  },
  floatingButtonStyle: {
    resizeMode: "contain",
    width: 50,
    height: 50,
    //backgroundColor:'black'
  },
});
