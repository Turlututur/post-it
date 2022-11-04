import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  FlatList,
} from "react-native";
import {
  getTaskList,
  createTaskLists,
  getUserId,
  deleteTaskLists,
} from "../API/todoAPI";
import { useNavigation } from "@react-navigation/native";

export default function TaskList({ username, token }) {
  const [todos, setTodos] = useState([]);
  const [userId, setUserId] = useState();
  const [newTodoText, setNewTodoText] = useState("");
  const navigation = useNavigation();

  const callback = (username, token) => {
    getTaskList(username, token).then((taskList) => {
      setTodos(taskList);
    });
  };

  useEffect(() => {
    callback(username, token);
  }, [username, token]);

  const getId = (username, token) => {
    getUserId(username, token).then((id) => {
      setUserId(id[0].id);
      console.log(id[0].id);
    });
  };

  useEffect(() => {
    getId(username, token);
  }, [username, token]);

  return (
    <View>
      <Text style={styles.text}>ID de l'user : {userId}</Text>
      {console.log(todos)}
      <Text style={styles.text}>Liste des TodoLists :</Text>
      <FlatList
        style={{ textAlign: "left", paddingLeft: 10, paddingTop: 20 }}
        data={todos}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                //navigation.navigate('../Component/TaskList', {id: item.id})
                navigation.navigate("Ma Todolist", {
                  id: item.id,
                  title: item.title,
                });
                // https://reactnavigation.org/docs/params/ !!!
                //console.log('todo : navigation')
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
            <TouchableOpacity
              onPress={async (e) => {
                e.preventDefault();
                console.log("suppression de " + item.title + " " + item.id);
                await deleteTaskLists(item.id, item.title, userId, token);
                callback(username, token);
              }}
            >
              <Image
                source={require("../assets/trash-can-outline-white.png")}
                style={{ height: 24, width: 24 }}
              />
            </TouchableOpacity>
          </View>
        )}
      />
      <TextInput
        style={styles.text_input}
        onChangeText={(newValue) => setNewTodoText(newValue)}
        placeholder="Nom de la liste"
        onSubmitEditing={async (e) => {
          e.preventDefault();
          await createTaskLists(userId, newTodoText, token);
          callback(username, token);
        }}
      />
      <Pressable
        style={styles.pressable}
        onPress={async (e) => {
          e.preventDefault();
          await createTaskLists(userId, newTodoText, token);
          callback(username, token);
        }}
      >
        <Text style={styles.text}>Ajouter la tâche</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B2430",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 200,
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
});
