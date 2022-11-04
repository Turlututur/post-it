import React, { useState } from "react";
import {
  Text,
  TextInput,
  Pressable,
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import { signUp } from "../API/todoAPI";

import { TokenContext } from "../Context/Context";
import { UsernameContext } from "../Context/Context";

export default function SignUp() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [copyPassword, setCopyPassword] = useState("");
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(true);

  const getSignedUp = (setToken, setUsername) => {
    setError("");
    if (login == "" || password == "" || copyPassword == "") return;
    if (password != copyPassword) {
      setError("Passwords don't match");
      return;
    }
    setVisible(false);
    signUp(login, password)
      .then((token) => {
        setUsername(login);
        setToken(token);
        console.log("token", token);
      })
      .catch((err) => {
        setError(err.message);
      });
    setVisible(true);
  };

  return (
    <TokenContext.Consumer>
      {([token, setToken]) => (
        <UsernameContext.Consumer>
          {([username, setUsername]) => {
            return (
              <View>
                {visible ? (
                  <>
                    <View style={{ flexDirection: "row" }}>
                      <TextInput
                        placeholder="Nom d'utilisateur"
                        style={styles.text_input}
                        onChangeText={setLogin}
                        onSubmitEditing={() =>
                          getSignedUp(setToken, setUsername)
                        }
                        value={login}
                      />
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <TextInput
                        placeholder="Mot de passe"
                        style={styles.text_input}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                        onSubmitEditing={() =>
                          getSignedUp(setToken, setUsername)
                        }
                        value={password}
                      />
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <TextInput
                        placeholder="Confirmez votre mot de passe"
                        style={styles.text_input}
                        onChangeText={setCopyPassword}
                        secureTextEntry={true}
                        onSubmitEditing={() =>
                          getSignedUp(setToken, setUsername)
                        }
                        value={copyPassword}
                      />
                    </View>
                    <Pressable
                      style={styles.pressable}
                      onPress={() => getSignedUp(setToken, setUsername)}
                      //title='Sign Up'
                    >
                      <Text style={styles.label}>S'inscrire</Text>
                    </Pressable>
                    {error ? (
                      <Text style={styles.text_error}>{error}</Text>
                    ) : (
                      []
                    )}
                  </>
                ) : (
                  <ActivityIndicator />
                )}
              </View>
            );
          }}
        </UsernameContext.Consumer>
      )}
    </TokenContext.Consumer>
  );
}

const styles = StyleSheet.create({
  label: {
    width: 70,
    color: "#D6D5A8",
  },
  text_error: {
    color: "red",
  },
  text: {
    color: "#D6D5A8",
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
});
