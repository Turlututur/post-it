// npm install react-native-super-grid
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Alert,
  FlatList,
} from "react-native";
import styles from "../styles/styles";
import * as color from "../styles/colors";
import { getProjects, deleteProject } from "../API/postItAPI";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons/faArrowsRotate";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";

/**
 * Composant permettant de récupérrer et d'afficher les projets auquels un utilisateur est assigné.
 * @param {String} username Le nom d'utilisateur connecté
 * @param {String} token    Le token d'autorisation de l'api
 * @param {String} userRole Le rôle de l'utilisateur connecté
 * @returns Une flatlist de projets.
 */
export default function ProjectList({ username, token, userRole }) {
  const [projects, setProjects] = useState([]);
  const navigation = useNavigation();

  /**
   * Fonction permettant de récuperer la liste de projets grâce à getProjects, provenant de ../API/postitApi.js
   * et de mettre ces projets dans une variable 'projects'.
   * @param {String} username Le nom d'utilisateur connecté
   * @param {String} token    Le token d'autorisation de l'api
   */
  const callback = (username, token) => {
    getProjects(username, token).then((projectList) => {
      setProjects(projectList);
    });
  };

  useEffect(() => {
    callback(username, token);
  }, [username, token]);

  if (userRole == "manager") {
    return (
      <>
        <View style={styles.container}>
          <Text style={styles.text}>Liste des Projets :</Text>
          <FlatList
            data={projects}
            style={styles.gridView}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.itemContainer,
                  { backgroundColor: color.thirdColor },
                ]}
              >
                <TouchableOpacity
                  onPress={() => {
                    // On navigue vers la liste de posts en passant l'id et le titre du projet en paramètres
                    navigation.navigate("Posts", {
                      id: item.id,
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

                {/* 
                La suppression fonctionne avec un alert qui ne fonctionne que sur téléphone
                Il est impossible d'utiliser cette fonction sur Web !
                */}

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
                            await deleteProject(item.id, item.title, token);
                            callback(username, token);
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
            )}
          />
        </View>

        <Pressable
          style={[styles.roundPressable, styles.refreshButton]}
          onPress={() => {
            callback(username, token);
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
          onPress={() => {
            navigation.navigate("Nouveau Projet");
          }}
        >
          <FontAwesomeIcon icon={faPlus} color={color.mainColor} size={35} />
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
            data={projects}
            style={styles.gridView}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.itemContainer,
                  { backgroundColor: color.thirdColor },
                ]}
              >
                <TouchableOpacity
                  onPress={() => {
                    // On navigue vers la liste de posts en passant l'id et le titre du projet en paramètres
                    navigation.navigate("Posts", {
                      id: item.id,
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
              </View>
            )}
          />
        </View>
        <Pressable
          style={[styles.roundPressable, styles.refreshButton]}
          onPress={() => {
            callback(username, token);
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
  } else {
    // En théorie ça ne dervait jamais s'afficher
    return (
      <>
        <Text style={styles.text}>Vous n'avez pas de rôle ???</Text>
      </>
    );
  }
}
