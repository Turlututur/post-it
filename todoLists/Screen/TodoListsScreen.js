import { View, StyleSheet } from "react-native";
import { TokenContext } from "../Context/Context";
import { UsernameContext } from "../Context/Context";
import TaskList from "../components/TaskList";

export default function TodoLists() {
  return (
    <View style={styles.container}>
      <TokenContext.Consumer>
        {([token, setToken]) => (
          <UsernameContext.Consumer>
            {([username, setUsername]) => (
              <TaskList username={username} token={token} />
            )}
          </UsernameContext.Consumer>
        )}
      </TokenContext.Consumer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B2430",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 250,
  },
});
