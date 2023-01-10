import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, Pressable } from "react-native";
import styles from "../styles/styles";
import * as color from "../styles/colors";
import { getPostById, reviewPost, modifyPost } from "../API/postItAPI";
import { useNavigation } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";

// La dose de dopamine fournie à un writter dont le projet a été validé
import ConfettiCannon from "react-native-confetti-cannon";

/**
 * Composant d'affichage du contenu d'un post
 * @param {String} username Le nom de l'utilisateur.
 * @param {String} token    Le token d'autorisation de l'app.
 * @param {String} userRole Le rôle de l'utilisateur.
 * @param {String} id       L'id du post sur lequel on travaille.
 * @returns                 L'affichage du contenu du post et un formulaire de modification
 *                          en fonction du rôle de l'utilisateur.
 */
export default function PostDetails({ username, token, userRole, id }) {
  // Le Post que l'on récupère
  const [post, setPost] = useState([]);

  // Commentaire de manager à propos du post
  const [reviewComment, setReviewComment] = useState("");
  // Etat du post que le manager va assigner
  const [state, setState] = useState("");
  // Etats que l'on va assigner (const utile pour le dropdown)
  const states = ["Validé", "Rejeté"];

  // Nouveau contenu si le writer modifie le post
  const [newContent, setNewContent] = useState("");
  // Nouvelle description si le writer modifie le post
  const [newDesc, setNewDesc] = useState("");

  // Navigation entre les screens
  const navigation = useNavigation();

  /**
   * Fonction permettant de récuperer un post grâce à getPostById, provenant de ../API/postitApi.js
   * et de mettre ce post dans une variable 'post'.
   * @param {String} id       L'id du post
   * @param {String} token    Le token d'autorisation de l'api
   */
  const callback = (id, token) => {
    getPostById(id, token).then((projectList) => {
      setPost(projectList);
    });
  };

  useEffect(() => {
    callback(id, token);
  }, [id, token]);

  /**
   * Deux vues différentes : en tant que manager il est possible
   * d'évaluer les posts.
   * En tant que writter il est possible de modifier les posts (ce qui les remettra dans l'état
   * en attente de validation, que le post ai été validé ou rejeté au préalable).
   */

  // Vue manager
  if (userRole == "manager") {
    return (
      <View style={styles.container}>
        <View style={[styles.container, { flexDirection: "row" }]}>
          {/* Flatlist du contenu du post */}
          <FlatList
            data={post}
            renderItem={({ item }) => (
              <View style={styles.container}>
                <TextInput
                  style={styles.text_input}
                  editable={false}
                  value={item.title}
                />
                <TextInput
                  style={styles.large_text_input}
                  editable={false}
                  textAlignVertical="top"
                  multiline={true}
                  value={item.content}
                />
                <TextInput
                  style={styles.medium_text_input}
                  editable={false}
                  textAlignVertical="top"
                  multiline={true}
                  value={item.desc}
                />
                <Text style={styles.tinyText}>
                  Etat de validation: {item.state}
                </Text>
                {/* Formulaire d'évaluation de post */}
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.text}>Evaluer le Post :</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <TextInput
                    style={styles.medium_text_input}
                    textAlignVertical="top"
                    multiline={true}
                    onChangeText={(newValue) => setReviewComment(newValue)}
                    placeholder="Commentaire"
                    defaultValue={item.comment}
                    onSubmitEditing={async (e) => {
                      e.preventDefault();
                      await reviewPost(id, state, reviewComment, token);
                      callback(id, token);
                    }}
                  />
                </View>
                <View style={{ flexDirection: "row" }}>
                  <SelectDropdown
                    dropdownStyle={{
                      backgroundColor: color.mainColor,
                      borderRadius: 10,
                      height: 90,
                      width: 300,
                    }}
                    buttonStyle={{
                      backgroundColor: color.secondColor,
                      color: "white",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: 15,
                      height: 40,
                      width: 300,
                      borderRadius: 10,
                    }}
                    buttonTextStyle={{ color: color.mainColor, fontSize: 15 }}
                    data={states}
                    onSelect={(selectedItem) => {
                      setState(selectedItem);
                    }}
                    defaultButtonText={"Etat"}
                    buttonTextAfterSelection={(selectedItem) => {
                      return selectedItem;
                    }}
                    rowTextForSelection={(item) => {
                      return item;
                    }}
                  />
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Pressable
                    style={styles.pressable}
                    onPress={async (e) => {
                      e.preventDefault();
                      await reviewPost(id, state, reviewComment, token);
                      navigation.goBack();
                    }}
                  >
                    <Text
                      style={[styles.tinyTextWhite, { color: color.mainColor }]}
                    >
                      Soumettre
                    </Text>
                  </Pressable>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    );
  }

  // Vue writter
  if (userRole == "writter") {
    return (
      <View style={styles.container}>
        <View style={[styles.container, { flexDirection: "row" }]}>
          {/* Flatilist du contenu du post */}
          <FlatList
            data={post}
            renderItem={({ item }) => (
              <View style={styles.container}>
                {/* Si le post est validé, un petit canon à confétis */}
                {item.state == "Validé" && (
                  // DOPAMIIIIIINE !
                  <ConfettiCannon
                    count={200}
                    origin={{ x: -10, y: 0 }}
                    explosionSpeed={700}
                    fallSpeed={6000}
                    colors={["#F05454", "#30475E"]}
                  />
                )}

                {item.state == "Validé" && (
                  <Text style={styles.text}>
                    🥳 Votre Post a été validé ! Félicitations ! 🥳
                  </Text>
                )}

                <TextInput
                  style={styles.text_input}
                  value={item.title}
                  editable={false}
                  onSubmitEditing={async (e) => {
                    e.preventDefault();
                    await modifyPost(id, newContent, newDesc, token);
                    callback(id, token);
                  }}
                />
                <TextInput
                  style={styles.large_text_input}
                  textAlignVertical="top"
                  multiline={true}
                  defaultValue={item.content}
                  onChangeText={(newValue) => setNewContent(newValue)}
                  onSubmitEditing={async (e) => {
                    e.preventDefault();
                    await modifyPost(id, newContent, newDesc, token);
                    callback(id, token);
                  }}
                />
                <TextInput
                  style={styles.medium_text_input}
                  textAlignVertical="top"
                  multiline={true}
                  defaultValue={item.desc}
                  onChangeText={(newValue) => setNewDesc(newValue)}
                  onSubmitEditing={async (e) => {
                    e.preventDefault();
                    await modifyPost(id, newContent, newDesc, token);
                    callback(id, token);
                  }}
                />
                <Text style={styles.tinyText}>
                  Etat de validation: {item.state}
                </Text>
                <Text style={styles.tinyText}>
                  Commentaire de manager: {item.comment}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Pressable
                    style={styles.pressable}
                    onPress={async (e) => {
                      e.preventDefault();
                      await modifyPost(id, newContent, newDesc, token);
                      navigation.goBack();
                    }}
                  >
                    <Text style={styles.tinyTextWhite}>
                      Mettre à jour le post
                    </Text>
                  </Pressable>
                </View>
              </View>
            )}
          />
        </View>
      </View>
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
