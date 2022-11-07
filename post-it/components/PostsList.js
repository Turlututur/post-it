import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import { getPosts, deletePost } from "../API/postItAPI";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons/faArrowsRotate";

/**
 * Composant permettant de récupérrer et d'afficher les posts d'un projet.
 * @param {String} username Le nom d'utilisateur connecté
 * @param {String} token    Le token d'autorisation de l'api
 * @param {String} userRole Le rôle de l'utilisateur connecté
 * @param {ID} id           L'id du projet auquel appartiennent les posts, necessaire pour les récupérer.
 * @returns Une flatlist de posts.
 */
export default function PostsList({ username, token, userRole, id }) {
  const projectID = id;
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation(); //utile pour plus tard

  /**
   * Fonction permettant de récuperer la liste des posts grâce à getPosts, provenant de ../API/postitApi.js
   * et de mettre ces posts dans une variable 'posts'.
   * @param {String} id       L'id du projet
   * @param {String} token    Le token d'autorisation de l'api
   */
  const callback = (id, token) => {
    getPosts(id, token).then((projectList) => {
      setPosts(projectList);
    });
  };

  useEffect(() => {
    callback(id, token);
  }, [id, token]);

  if (userRole == "manager") {
    return (
      <>
        <View>
          <Text style={styles.text}>Liste des Projets :</Text>
          <FlatList
            style={{ textAlign: "left", paddingLeft: 10, paddingTop: 20 }}
            data={posts}
            renderItem={({ item }) => (
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Détails du post", {
                      post: item,
                    });
                  }}
                >
                  <Text
                    style={[
                      styles.text_item,
                      { color: "#D6D5A8", textDecorationLine: "underline" },
                    ]}
                  >
                    {item.title} ; Etat : {item.state}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={async (e) => {
                    e.preventDefault();
                    await deletePost(item.id, token);
                    callback(id, token);
                  }}
                >
                  <Image
                    source={require("../assets/trash-can-outline-white.png")}
                    style={{ height: 24, width: 24 }}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            callback(id, token);
          }}
          style={styles.refreshTouchableOpacityStyle}
        >
          <FontAwesomeIcon icon={faArrowsRotate} color="#D6D5A8" size={35} />
        </TouchableOpacity>
      </>
    );
  }

  if (userRole == "writter") {
    return (
      <>
        <View>
          <Text style={styles.text}>Liste des Projets :</Text>
          <FlatList
            style={{ textAlign: "center", paddingLeft: 10, paddingTop: 20 }}
            data={posts}
            renderItem={({ item }) => (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Détails du post", {
                      post: item,
                    });
                  }}
                >
                  <Text
                    style={[
                      styles.text_item,
                      { color: "#D6D5A8", textDecorationLine: "underline" },
                    ]}
                  >
                    {item.title} ; {item.state}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            callback(id, token);
          }}
          style={styles.refreshTouchableOpacityStyle}
        >
          <FontAwesomeIcon icon={faArrowsRotate} color="#D6D5A8" size={35} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={(e) => {
            e.preventDefault();
            navigation.navigate("Nouveau post", {
              post: projectID,
            });
          }}
          style={styles.plusTouchableOpacityStyle}
        >
          <FontAwesomeIcon icon={faPlus} color="#D6D5A8" size={35} />
        </TouchableOpacity>
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
  plusTouchableOpacityStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
  },
  refreshTouchableOpacityStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 90,
  },
  floatingButtonStyle: {
    resizeMode: "contain",
    width: 50,
    height: 50,
    //backgroundColor:'black'
  },
});
