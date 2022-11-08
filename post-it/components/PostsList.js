import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import styles from "../styles/styles";
import * as color from "../styles/colors";
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
          <Text style={styles.text}>Liste des Posts :</Text>
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
                      {
                        color: color.textColor,
                        textDecorationLine: "underline",
                      },
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
        <Pressable
          style={[styles.roundPressable, styles.refreshButton]}
          onPress={() => {
            callback(id, token);
          }}
        >
          <FontAwesomeIcon
            icon={faArrowsRotate}
            color={color.mainColor}
            size={35}
          />
        </Pressable>
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
                      {
                        color: color.textColor,
                        textDecorationLine: "underline",
                      },
                    ]}
                  >
                    {item.title} ; {item.state}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
        <Pressable
          style={[styles.roundPressable, styles.refreshButton]}
          onPress={() => {
            callback(id, token);
          }}
        >
          <FontAwesomeIcon
            icon={faArrowsRotate}
            color={color.mainColor}
            size={35}
          />
        </Pressable>
        <Pressable
          style={[styles.roundPressable, styles.plusButton]}
          onPress={(e) => {
            e.preventDefault();
            navigation.navigate("Nouveau post", {
              post: projectID,
            });
          }}
        >
          <FontAwesomeIcon icon={faPlus} color={color.mainColor} size={35} />
        </Pressable>
        {/* <TouchableOpacity
          activeOpacity={0.7}
          onPress={(e) => {
            e.preventDefault();
            navigation.navigate("Nouveau post", {
              post: projectID,
            });
          }}
          style={styles.plusTouchableOpacityStyle}
        >
          <FontAwesomeIcon icon={faPlus} color={color.textColor} size={35} />
        </TouchableOpacity> */}
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
