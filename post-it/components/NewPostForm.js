import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import styles from "../styles/styles";
import { createPost } from "../API/postItAPI";
import { useNavigation } from "@react-navigation/native";

/**
 * Composant permettant de créer un formulaire de création de post.
 * @param {String} username Le nom d'utilisateur connecté
 * @param {String} token    Le token d'autorisation de l'api
 * @param {ID} id           L'id du projet associé au post à créer
 * @returns Une flatlist de projets.
 */
export default function NewPostForm({ username, token, id }) {
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostDesc, setNewPostDesc] = useState("");
  const navigation = useNavigation();

  return (
    <>
      <View>
        <TextInput
          style={styles.text_input}
          onChangeText={(newValue) => setNewPostTitle(newValue)}
          placeholder="Titre du post"
          onSubmitEditing={async (e) => {
            e.preventDefault();
            await createPost(
              newPostTitle,
              newPostContent,
              newPostDesc,
              id,
              token
            );
            navigation.goBack(null);
          }}
        />
        <TextInput
          style={styles.text_input}
          onChangeText={(newValue) => setNewPostContent(newValue)}
          placeholder="Contenu du post"
          onSubmitEditing={async (e) => {
            e.preventDefault();
            await createPost(
              newPostTitle,
              newPostContent,
              newPostDesc,
              id,
              token
            );
            navigation.goBack(null);
          }}
        />
        <TextInput
          style={styles.text_input}
          onChangeText={(newValue) => setNewPostDesc(newValue)}
          placeholder="Description du post"
          onSubmitEditing={async (e) => {
            e.preventDefault();
            await createPost(
              newPostTitle,
              newPostContent,
              newPostDesc,
              id,
              token
            );
            navigation.goBack(null);
          }}
        />
        <Pressable
          style={styles.pressable}
          onPress={async (e) => {
            e.preventDefault();
            await createPost(
              newPostTitle,
              newPostContent,
              newPostDesc,
              id,
              token
            );
            navigation.goBack(null);
          }}
        >
          <Text style={styles.tinyText}>Créer le post</Text>
        </Pressable>
      </View>
    </>
  );
}
