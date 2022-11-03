import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { getProjects, createProjects, getUserData } from "../API/postItAPI";
import { useNavigation } from "@react-navigation/native";

/**
 * Composant permettant de créer un formulaire de créatiion de projet.
 * @param {String} username Le nom d'utilisateur connecté
 * @param {String} token    Le token d'autorisation de l'api
 * @returns Une flatlist de projets.
 */
export default function NewProjectForm({ username, token }) {
  const [projects, setProjects] = useState([]);
  const [userId, setUserId] = useState();
  const [newProjectText, setNewProjectText] = useState("");
  const [writter, setNewWritter] = useState("");
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

  /**
   * Fonction permettant de récuperer l'id d'un utilisateur grâce à getUserData, provenant de ../API/postitApi.js
   * et de mettre cet id dans une variable 'userId'.
   * @param {String} username Le nom d'utilisateur connecté
   * @param {String} token    Le token d'autorisation de l'api
   */
  const getId = (username, token) => {
    getUserData(username, token).then((data) => {
      setUserId(data[0].id);
      console.log(data[0].id);
    });
  };

  useEffect(() => {
    getId(username, token);
  }, [username, token]);

  return (
    <>
      <View>
        <TextInput
          style={styles.text_input}
          onChangeText={(newValue) => setNewProjectText(newValue)}
          placeholder="Titre du projet"
          onSubmitEditing={async (e) => {
            e.preventDefault();
            await createProjects(
              newProjectText,
              userId,
              username,
              writter,
              token
            );
            callback(username, token);
            navigation.navigate("Projets");
          }}
        />
        <TextInput
          style={styles.text_input}
          onChangeText={(newValue) => setNewWritter(newValue)}
          placeholder="Nom du community manager à assigner"
          onSubmitEditing={async (e) => {
            e.preventDefault();
            await createProjects(
              newProjectText,
              userId,
              username,
              writter,
              token
            );
            callback(username, token);
            navigation.navigate("Projets");
          }}
        />
        <Pressable
          style={styles.pressable}
          onPress={async (e) => {
            e.preventDefault();
            await createProjects(
              newProjectText,
              userId,
              username,
              writter,
              token
            );
            callback(username, token);
            navigation.navigate("Projets");
          }}
        >
          <Text style={styles.text}>Ajouter la tâche</Text>
        </Pressable>
      </View>
    </>
  );
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
