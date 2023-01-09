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
  // Titre du nouveau post
  const [newPostTitle, setNewPostTitle] = useState("");
  // Contenu du nouveau post
  const [newPostContent, setNewPostContent] = useState("");
  // Description du post (explications dédiées à un manager)
  const [newPostDesc, setNewPostDesc] = useState("");
  // Navigation entre les screens
  const navigation = useNavigation();

  return (
    <>
      <View>
        {/* Entrée utilisateur du titre du post */}
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
        {/* Entrée utilisateur du contenu du post */}
        <TextInput
          style={styles.large_text_input}
          onChangeText={(newValue) => setNewPostContent(newValue)}
          placeholder="Contenu du post"
          textAlignVertical="top"
          multiline={true}
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
        {/* Entrée utilisateur de la description du post */}
        <TextInput
          style={styles.medium_text_input}
          onChangeText={(newValue) => setNewPostDesc(newValue)}
          placeholder="Description du post"
          textAlignVertical="top"
          multiline={true}
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
        {/* Bouton de soumission du formulaire qui redirige vers la liste de posts */}
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
          <Text style={styles.tinyTextWhite}>Créer le post</Text>
        </Pressable>
      </View>
    </>
  );
}
