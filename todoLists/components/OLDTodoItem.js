import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from "react-native";

export default function TodoItem(props) {
  const [done, setDone] = useState(props.item.done);
  const setAndUpdate = (state) => {
    setDone(state);
    props.onPressed(done ? -1 : 1);
  };
  /*
    useEffect( () => setDone(props.item.done), [props.item.done] ) bon déjà écrit lmao mais on prend en notes le cours
    */
  useEffect(() => setDone(props.item.done), [props.item.done]); //deux param : action à effectuer et liste des variables sur laquelle on taffe

  return (
    <View style={styles.content}>
      <Switch value={done} onValueChange={(state) => setAndUpdate(state)} />
      <Text
        style={[
          styles.text_item,
          { textDecorationLine: done ? "line-through" : "none" },
        ]}
      >
        {props.item.content}
      </Text>
      <TouchableOpacity onPress={() => props.todoDelete(props.item.id)}>
        <Image
          source={require("../assets/trash-can-outline.png")}
          style={{ height: 24, width: 24 }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginTop: 10,
    flexDirection: "row",
  },
  text_item: {
    marginTop: 15,
    marginLeft: 10,
    width: 150,
  },
});
