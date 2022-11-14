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
import SelectDropdown from "react-native-select-dropdown";

import { signUp } from "../API/postItAPI";

import { TokenContext } from "../Context/Context";
import { UsernameContext } from "../Context/Context";
import { UserRoleContext } from "../Context/Context";

/**
 * Composant permettant de s'inscrire sur l'api de l'app.
 * @returns Un formulaire d'inscription.
 */
export default function SignUp() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const roles = ["manager", "writter"];
  const [copyPassword, setCopyPassword] = useState("");
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(true);

  /**
   * Fonction permettant de s'inscrire et d'initier les variables globales :
   * @param {String} setToken    Le token de l'app.
   * @param {String} setUsername Le nom de l'utilisateur qui s'inscrit.
   * @param {String} setUserRole Le role de l'utilisateur qui s'inscrit.
   * @returns Un message d'erreur si il a lieu d'être.
   */
  const getSignedUp = (setToken, setUsername, setUserRole) => {
    setError("");
    if (login == "" || role == "" || password == "" || copyPassword == "")
      return;
    if (password != copyPassword) {
      setError("Les mots de passe sont differents !");
      return;
    }
    setVisible(false);
    signUp(login, password, role)
      .then((token) => {
        setUsername(login);
        setToken(token);
        setUserRole(role);
        //console.log('token', token)
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
                          <TextInput
                            placeholder="Nom d'utilisateur"
                            placeholderTextColor="#787878"
                            maxLength={16}
                            style={styles.text_input}
                            onChangeText={setLogin}
                            onSubmitEditing={() =>
                              getSignedUp(setToken, setUsername, setUserRole)
                            }
                            value={login}
                          />
                        </View>
                        <View style={{ flexDirection: "row" }}>
                          {/* <TextInput
                          placeholder="Rôle"
                          style={styles.text_input}
                          onChangeText={setRole}
                          onSubmitEditing={() =>
                            getSignedUp(setToken, setUsername, setUserRole)
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
                              backgroundColor: color.secondColor,
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
                        <View style={{ flexDirection: "row" }}>
                          <TextInput
                            placeholder="Mot de passe"
                            placeholderTextColor="#787878"
                            style={styles.text_input}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                            onSubmitEditing={() =>
                              getSignedUp(setToken, setUsername, setUserRole)
                            }
                            value={password}
                          />
                        </View>
                        <View style={{ flexDirection: "row" }}>
                          <TextInput
                            placeholder="Confirmez votre mot de passe"
                            placeholderTextColor="#787878"
                            style={styles.text_input}
                            onChangeText={setCopyPassword}
                            secureTextEntry={true}
                            onSubmitEditing={() =>
                              getSignedUp(setToken, setUsername, setUserRole)
                            }
                            value={copyPassword}
                          />
                        </View>
                        <Pressable
                          style={[styles.pressable, { marginTop: 75 }]}
                          onPress={() =>
                            getSignedUp(setToken, setUsername, setUserRole)
                          }
                          //title='Sign Up'
                        >
                          <Text
                            style={[
                              styles.tinyTextWhite,
                              { fontWeight: "bold", fontSize: 14 },
                            ]}
                          >
                            S'inscrire
                          </Text>
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
