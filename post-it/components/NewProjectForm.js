import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import styles from "../styles/styles";
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
          maxLength={16}
          onSubmitEditing={async (e) => {
            e.preventDefault();
            await createProjects(
              newProjectText,
              userId,
              username,
              writter,
              token
            );
            navigation.navigate("Projets");
          }}
        />
        <TextInput
          style={styles.text_input}
          onChangeText={(newValue) => setNewWritter(newValue)}
          placeholder="Nom du community manager à assigner"
          maxLength={16}
          onSubmitEditing={async (e) => {
            e.preventDefault();
            await createProjects(
              newProjectText,
              userId,
              username,
              writter,
              token
            );
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
            navigation.navigate("Projets");
          }}
        >
          <Text style={styles.tinyText}>Ajouter la tâche</Text>
        </Pressable>
      </View>
    </>
  );
}
