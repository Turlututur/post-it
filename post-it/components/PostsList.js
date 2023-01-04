import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
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
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";

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
    getPosts(id, token).then((postsList) => {
      setPosts(postsList);
    });
  };

  useEffect(() => {
    callback(id, token);
    // Permet de remettre à jour la liste de posts toutes les cinq secondes
    const interval = setInterval(() => {
      callback(id, token);
    }, 5000);
    return () => clearInterval(interval);
  }, [id, token]);

  if (userRole == "manager") {
    return (
      <>
        <View style={styles.container}>
          <Text style={styles.text}>Liste des Posts :</Text>
          <FlatList
            style={styles.gridView}
            data={posts}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
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
                        color: color.mainColor,
                        textDecorationLine: "underline",
                      },
                    ]}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
                <Text
                  style={[
                    styles.text_item,
                    {
                      color: color.mainColor,
                      fontSize: 18,
                    },
                  ]}
                >
                  {item.state}
                </Text>
                <View style={{ marginRight: 13 }}>
                  <TouchableOpacity
                    onPress={async (e) => {
                      e.preventDefault();
                      Alert.alert(
                        "Suppression",
                        "Voulez vous supprimer " + item.title + " ?",
                        [
                          {
                            text: "Annuler",
                          },
                          {
                            text: "Oui",
                            onPress: async () => {
                              await deletePost(item.id, token);
                              callback(id, token);
                            },
                          },
                        ]
                      );
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      color={color.mainColor}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
        <Pressable
          style={[
            styles.roundPressable,
            styles.refreshButton,
            { backgroundColor: color.thirdColor },
          ]}
          onPress={() => {
            callback(id, token);
          }}
        >
          <FontAwesomeIcon
            icon={faArrowsRotate}
            color={color.mainColor}
            size={29}
          />
        </Pressable>
      </>
    );
  }

  if (userRole == "writter") {
    return (
      <>
        <View style={styles.container}>
          <Text style={styles.text}>Liste des Projets :</Text>
          <FlatList
            style={styles.gridView}
            data={posts}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
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
                        color: color.mainColor,
                        textDecorationLine: "underline",
                      },
                    ]}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
                <Text
                  style={[
                    styles.text_item,
                    {
                      color: color.mainColor,
                      fontSize: 18,
                    },
                  ]}
                >
                  {item.state}
                </Text>
              </View>
            )}
          />
        </View>
        <Pressable
          style={[
            styles.roundPressable,
            styles.refreshButton,
            { backgroundColor: color.thirdColor },
          ]}
          onPress={() => {
            callback(id, token);
          }}
        >
          <FontAwesomeIcon
            icon={faArrowsRotate}
            color={color.mainColor}
            size={29}
          />
        </Pressable>
        <Pressable
          style={[
            styles.roundPressable,
            styles.plusButton,
            { backgroundColor: color.thirdColor },
          ]}
          onPress={(e) => {
            e.preventDefault();
            navigation.navigate("Nouveau post", {
              post: projectID,
            });
          }}
        >
          <FontAwesomeIcon icon={faPlus} color={color.mainColor} size={29} />
        </Pressable>
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
