// npm install react-native-select-dropdown
import React, { useState } from "react";
import {
  Text,
  TextInput,
  Pressable,
  View,
  ActivityIndicator,
} from "react-native";
import styles from "../styles/styles";
import * as color from "../styles/colors";
import { signIn, signUp } from "../API/postItAPI";

import SelectDropdown from "react-native-select-dropdown";

import { TokenContext } from "../Context/Context";
import { UsernameContext } from "../Context/Context";
import { UserRoleContext } from "../Context/Context";

/**
 * Composant de connexion de l'application
 * @returns Un formulaire qui sera affiché dans l'écran de connexion de l'app !
 */
export default function SignIn() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const roles = ["manager", "writter"];
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(true);

  /**
   * Fonction permettant de se connecter et d'initier les variables globales :
   * @param {String} setToken    Le token de l'app.
   * @param {String} setUsername Le nom de l'utilisateur qui se connecte.
   * @param {String} setUserRole Le role de l'utilisateur qui se connecte.
   * @returns Un message d'erreur si il a lieu d'être.
   */
  const getSignedIn = (setToken, setUsername, setUserRole) => {
    setError("");
    if (login == "" || password == "" || role == "") return;
    setVisible(false);
    signIn(login, password, role)
      .then((token) => {
        setUsername(login);
        setToken(token);
        setUserRole(role);
      })
      .catch((err) => {
        setError(err.message);
      });
    setVisible(true);
  };

  return (
    <UserRoleContext.Consumer>
      {([userRole, setUserRole]) => (
        <TokenContext.Consumer>
          {([token, setToken]) => (
            <UsernameContext.Consumer>
              {([username, setUsername]) => {
                return (
                  <View>
                    {visible ? (
                      <>
                        <View style={{ flexDirection: "row" }}>
                          {/* <Text style={styles.label}>Login</Text> */}
                          <TextInput
                            placeholder="Nom d'utilisateur"
                            maxLength={16}
                            style={styles.text_input}
                            onChangeText={setLogin}
                            onSubmitEditing={() =>
                              getSignedIn(setToken, setUsername, setUserRole)
                            }
                            value={login}
                          />
                        </View>
                        <View style={{ flexDirection: "row" }}>
                          {/* <Text style={styles.label}>Mot de passe</Text> */}
                          <TextInput
                            placeholder="Mot de passe"
                            style={styles.text_input}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                            onSubmitEditing={() =>
                              getSignedIn(setToken, setUsername, setUserRole)
                            }
                            value={password}
                          />
                        </View>
                        <View style={{ flexDirection: "row" }}>
                          {/* <TextInput
                        placeholder = "Role"
                        style={styles.text_input}
                        onChangeText={setRole}
                        onSubmitEditing={() =>
                          getSignedIn(setToken, setUsername, setUserRole)
                        }
                        value={role}
                      /> */}

                          <SelectDropdown
                            dropdownStyle={{
                              backgroundColor: color.mainColor,
                              borderRadius: 10,
                              height: 90,
                              width: 300,
                            }}
                            buttonStyle={{
                              backgroundColor: color.thirdColor,
                              color: "white",
                              alignItems: "center",
                              justifyContent: "center",
                              margin: 15,
                              height: 40,
                              width: 300,
                              borderRadius: 10,
                            }}
                            buttonTextStyle={{
                              color: color.mainColor,
                              fontSize: 15,
                            }}
                            data={roles}
                            onSelect={(selectedItem) => {
                              setRole(selectedItem);
                            }}
                            defaultButtonText={"Rôle"}
                            buttonTextAfterSelection={(selectedItem) => {
                              return selectedItem;
                            }}
                            rowTextForSelection={(item) => {
                              return item;
                            }}
                          />
                        </View>
                        <Pressable
                          style={styles.pressable}
                          onPress={() =>
                            getSignedIn(setToken, setUsername, setUserRole)
                          }
                          // title='Sign In'
                        >
                          <Text style={styles.tinyTextWhite}>Connexion</Text>
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
      )}
    </UserRoleContext.Consumer>
  );
}
