import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  SafeAreaView,
  FlatList,
} from "react-native";
import { Searchbar } from "react-native-paper";
import styles from "../styles/styles";
import {
  getProjects,
  createProjects,
  getUserData,
  getWrittersNames,
} from "../API/postItAPI";
import { useNavigation } from "@react-navigation/native";

/**
 * Composant permettant de créer un formulaire de créatiion de projet.
 * @param {String} username Le nom d'utilisateur connecté
 * @param {String} token    Le token d'autorisation de l'api
 * @returns Une flatlist de projets.
 */
export default function NewProjectForm({ username, token }) {
  const [userId, setUserId] = useState();
  const [newProjectText, setNewProjectText] = useState("");

  const [search, setSearch] = useState("");
  const [writtersNames, setNewWrittersNames] = useState([]);
  const [filteredWrittersNames, setFilteredWrittersNames] = useState([]);

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
    });
  };

  /**
   * Fonction de récuperation des noms de writters dans l'api.
   *
   * @param {String} token Le token d'autorisation de l'api.
   */
  const getWritters = (token) => {
    getWrittersNames(token).then((data) => {
      for (let i in data) {
        writtersNames.push(data[i].username);
      }
      setFilteredWrittersNames(writtersNames);
      console.log(writtersNames);
    });
  };

  useEffect(() => {
    getId(username, token);
  }, [username, token]);

  useEffect(() => {
    getWritters(token);
  }, [token]);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = writtersNames.filter(function (name) {
        return name.match(text);
      });

      setFilteredWrittersNames(newData);
      setSearch(text);
    } else {
      setFilteredWrittersNames(writtersNames);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        {item}
      </Text>
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    setNewWritter(item);
    setNewProjectText(item);
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#C8C8C8",
        }}
      />
    );
  };

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
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <Searchbar
              style={styles.text_input}
              inputStyle={{ fontSize: 14 }}
              searchIcon={{ size: 24 }}
              onChangeText={(text) => searchFilterFunction(text)}
              onClear={(text) => searchFilterFunction("")}
              placeholder="Rechercher un writter..."
              value={search}
            />
            <FlatList
              data={filteredWrittersNames}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={ItemSeparatorView}
              renderItem={ItemView}
            />
          </View>
        </SafeAreaView>
        {/* <TextInput
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
        /> */}
        <Text style={[styles.tinyText, { marginLeft: 15 }]}>
          Community manager assigné : {writter}
        </Text>
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
          <Text style={styles.tinyTextWhite}>Créer le projet</Text>
        </Pressable>
      </View>
    </>
  );
}
