import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { TokenContext } from "../Context/Context";
import { UsernameContext } from "../Context/Context";
import TodoList from "../components/TodoList";

export default function TodoLists({ route, navigation }) {
  const { id, title } = route.params;

  if (id == "") {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Aucune liste de todos n'est séléctionnée
        </Text>
        <Pressable
          style={styles.pressable}
          onPress={() => {
            navigation.navigate("Mes listes");
          }}
        >
          <Text style={styles.text}>Listes de todos</Text>
        </Pressable>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <TokenContext.Consumer>
          {([token, setToken]) => (
            <UsernameContext.Consumer>
              {([username, setUsername]) => (
                <>
                  <Text style={styles.text}>Votre liste {title}:</Text>
                  <TodoList username={username} token={token} id={id} />
                </>
              )}
            </UsernameContext.Consumer>
          )}
        </TokenContext.Consumer>
      </View>
    );
  }
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
  pressable: {
    backgroundColor: "#51557E",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  text_input: {
    //borderWidth: 1,
    backgroundColor: "#D6D5A8",
    color: "#1B2430",
    margin: 5,
  },
});
