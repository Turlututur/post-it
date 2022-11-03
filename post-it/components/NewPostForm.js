import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
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
            navigation.navigate("Posts", { id: id });
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
            navigation.navigate("Posts", { id: id });
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
            navigation.navigate("Posts", { id: id });
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
            navigation.navigate("Posts", { id: id });
          }}
        >
          <Text style={styles.text}>Créer le post</Text>
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
