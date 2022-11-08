import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, Pressable } from "react-native";
import styles from "../styles/styles";
import { getPostById, reviewPost, modifyPost } from "../API/postItAPI";
import { useNavigation } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";

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
  const [post, setPost] = useState([]);
  const [reviewComment, setReviewComment] = useState("");
  const [state, setState] = useState("");
  const states = ["Validé", "Rejeté"];
  const [newContent, setNewContent] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const navigation = useNavigation(); //utile pour plus tard (ou pas...)

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

  if (userRole == "manager") {
    return (
      <View>
        <View style={{ flexDirection: "row" }}>
          <FlatList
            data={post}
            renderItem={({ item }) => (
              <View>
                <Text style={styles.tinyText}>Titre: {item.title}</Text>
                <Text style={styles.tinyText}>Contenu: {item.content}</Text>
                <Text style={styles.tinyText}>Description: {item.desc}</Text>
                <Text style={styles.tinyText}>
                  Etat de validation: {item.state}
                </Text>
                <Text style={styles.tinyText}>
                  Commentaire de manager: {item.comment}
                </Text>
              </View>
            )}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.tinyText}>Passer le post en revue :</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={styles.text_input}
            onChangeText={(newValue) => setReviewComment(newValue)}
            placeholder="Commentaire"
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
              backgroundColor: "#D6D5A8",
              borderRadius: 10,
              height: 90,
              width: 300,
            }}
            buttonStyle={{
              backgroundColor: "#D6D5A8",
              color: "white",
              alignItems: "center",
              justifyContent: "center",
              margin: 15,
              height: 40,
              width: 300,
              borderRadius: 10,
            }}
            buttonTextStyle={{ color: "#1B2430", fontSize: 15 }}
            data={states}
            onSelect={(selectedItem) => {
              setState(selectedItem);
            }}
            defaultButtonText={"Etat à assigner"}
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
              callback(id, token);
            }}
          >
            <Text style={styles.tinyText}>Passer en revue</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  if (userRole == "writter") {
    return (
      <View>
        <View style={{ flexDirection: "row" }}>
          <FlatList
            data={post}
            renderItem={({ item }) => (
              <View>
                <Text style={styles.text}>Titre: {item.title}</Text>
                <Text style={styles.text}>Contenu: {item.content}</Text>
                <Text style={styles.text}>Description: {item.desc}</Text>
                <Text style={styles.text}>
                  Etat de validation: {item.state}
                </Text>
                <Text style={styles.text}>
                  Commentaire de manager: {item.comment}
                </Text>
              </View>
            )}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.text}>Modifier le post :</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={styles.text_input}
            onChangeText={(newValue) => setNewContent(newValue)}
            placeholder="Contenu"
            onSubmitEditing={async (e) => {
              e.preventDefault();
              await modifyPost(id, newContent, newDesc, token);
              callback(id, token);
            }}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={styles.text_input}
            onChangeText={(newValue) => setNewDesc(newValue)}
            placeholder="Description"
            onSubmitEditing={async (e) => {
              e.preventDefault();
              await modifyPost(id, newContent, newDesc, token);
              callback(id, token);
            }}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Pressable
            style={styles.pressable}
            onPress={async (e) => {
              e.preventDefault();
              await modifyPost(id, newContent, newDesc, token);
              callback(id, token);
            }}
          >
            <Text>Mettre à jour le post</Text>
          </Pressable>
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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#1B2430",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingTop: 150,
//   },
//   text: {
//     color: "#D6D5A8",
//   },
//   link: {
//     color: "#816797",
//     textDecorationLine: "underline",
//   },
//   text_input: {
//     borderWidth: 1,
//     backgroundColor: "#D6D5A8",
//     color: "#1B2430",
//     margin: 15,
//     height: 40,
//     width: 300,
//     borderRadius: 10,
//     paddingLeft: 10,
//   },
//   pressable: {
//     backgroundColor: "#D6D5A8",
//     color: "white",
//     alignItems: "center",
//     justifyContent: "center",
//     margin: 15,
//     height: 40,
//     width: 300,
//     borderRadius: 10,
//   },
//   text_item: {
//     marginLeft: 10,
//     width: 150,
//   },
//   touchableOpacityStyle: {
//     position: "absolute",
//     width: 50,
//     height: 50,
//     alignItems: "center",
//     justifyContent: "center",
//     right: 30,
//     bottom: 30,
//   },
//   floatingButtonStyle: {
//     resizeMode: "contain",
//     width: 50,
//     height: 50,
//     //backgroundColor:'black'
//   },
// });
