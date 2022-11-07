// npm install react-native-super-grid
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { getProjects, deleteProject } from "../API/postItAPI";
import { useNavigation } from "@react-navigation/native";
import { FlatGrid } from "react-native-super-grid";
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
  const [userId, setUserId] = useState();
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
          <FlatGrid
            data={projects}
            style={styles.gridView}
            spacing={10}
            renderItem={({ item }) => (
              <View
                style={[styles.itemContainer, { backgroundColor: "#51557E" }]}
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
                      { color: "#D6D5A8", textDecorationLine: "underline" },
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
                  <FontAwesomeIcon icon={faTrash} color="#D6D5A8" size={15} />
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
          <FontAwesomeIcon icon={faArrowsRotate} color="#D6D5A8" size={35} />
        </Pressable>
        <Pressable
          style={[styles.roundPressable, styles.plusButton]}
          onPress={() => {
            navigation.navigate("Nouveau Projet");
          }}
        >
          <FontAwesomeIcon icon={faPlus} color="#D6D5A8" size={35} />
        </Pressable>
      </>
    );
  }

  if (userRole == "writter") {
    return (
      <>
        <View style={styles.container}>
          <Text style={styles.text}>Liste des Projets :</Text>
          <FlatGrid
            data={projects}
            style={styles.gridView}
            spacing={10}
            renderItem={({ item }) => (
              <View
                style={[styles.itemContainer, { backgroundColor: "#51557E" }]}
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
                      { color: "#D6D5A8", textDecorationLine: "underline" },
                    ]}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
          {/* <FlatList
            style={{ textAlign: "center", paddingLeft: 10, paddingTop: 20 }}
            data={projects}
            renderItem={({ item }) => (
              <View>
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
                      { color: "#D6D5A8", textDecorationLine: "underline" },
                    ]}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          /> */}
        </View>
        <Pressable
          style={[styles.roundPressable, styles.refreshButton]}
          onPress={() => {
            callback(username, token);
          }}
        >
          <FontAwesomeIcon icon={faArrowsRotate} color="#D6D5A8" size={35} />
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1B2430",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  text: {
    color: "#D6D5A8",
    fontSize: 20,
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
  roundPressable: {
    backgroundColor: "#1B2430",
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
    height: 54,
    width: 54,
    borderRadius: 100,
  },
  plusButton: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 30,
  },
  refreshButton: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 90,
  },
  floatingButtonStyle: {
    resizeMode: "contain",
    width: 50,
    height: 50,
    //backgroundColor:'black'
  },
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    height: 75,
  },
  text_item: {
    marginLeft: 5,
    width: 150,
    marginBottom: 20,
  },
});
