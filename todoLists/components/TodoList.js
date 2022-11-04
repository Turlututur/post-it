import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Switch,
  FlatList,
} from "react-native";
import {
  getTasks,
  createTask,
  getUserId,
  deleteTasks,
  updateDone,
} from "../API/todoAPI";
//import { useNavigation } from '@react-navigation/native';

export default function TaskList({ username, token, id }) {
  const [todos, setTodos] = useState([]);
  const [userId, setUserId] = useState();
  const [newTodoText, setNewTodoText] = useState("");
  // const navigation = useNavigation();

  const callback = (id, token) => {
    getTasks(id, token).then((taskList) => {
      setTodos(taskList);
    });
  };

  useEffect(() => {
    callback(id, token);
  }, [id, token]);

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
    <>
      {console.log(userId)}
      {console.log(todos)}
      <FlatList
        style={{ textAlign: "left", paddingLeft: 10, paddingTop: 20 }}
        data={todos}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row" }}>
            <Switch
              style={{ marginBottom: 30 }}
              value={item.done}
              onValueChange={async () => {
                await updateDone(item.id, item.done, token);
                callback(id, token);
              }}
            />
            <TouchableOpacity
              onPress={async () => {
                await updateDone(item.id, item.done, token);
                callback(id, token);
              }}
            >
              <Text
                style={[
                  styles.text_item,
                  {
                    color: "#D6D5A8",
                    textDecorationLine: item.done ? "line-through" : "none",
                  },
                ]}
              >
                {item.content}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async (e) => {
                e.preventDefault();
                await deleteTasks(item.id, token);
                callback(id, token);
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
        placeholder="Nom de la tâche"
        onSubmitEditing={async (e) => {
          e.preventDefault();
          await createTask(id, newTodoText, userId, token);
          callback(id, token);
        }}
      />
      <Pressable
        style={styles.pressable}
        onPress={async (e) => {
          e.preventDefault();
          await createTask(id, newTodoText, userId, token);
          callback(id, token);
        }}
      >
        <Text style={styles.text}>Ajouter une tâche</Text>
      </Pressable>
    </>
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
