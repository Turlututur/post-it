// npm i --save @react-navigation/bottom-tabs @react-navigation/native
// npm i @fortawesome/react-native-fontawesome
// npm i --save @fortawesome/free-solid-svg-icons
// npm install react-native-svg@9.13.3
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Image, StyleSheet } from "react-native";
import * as color from "../styles/colors";
import { Link } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";

import HomeScreen from "../Screen/HomeScreen";
import SignInScreen from "../Screen/SignInScreen";
import SignUpScreen from "../Screen/SignUpScreen";
import MyAccount from "../Screen/MyAccountScreen";
import Projects from "../Screen/ProjectsScreen";
import NewProject from "../Screen/NewProjectScreen";
import Posts from "../Screen/PostsScreen";
import NewPost from "../Screen/NewPostScreen";
import PostDetailsScreen from "../Screen/PostDetailsScreen";
import { TokenContext } from "../Context/Context";

const Stack = createStackNavigator();

/**
 * Permet de gérer la navigation de l'application via la création de 'screens', pages de l'app.
 */
export default function Navigation() {
  return (
    <TokenContext.Consumer>
      {([token, setToken]) => (
        <NavigationContainer>
          {token == null ? (
            <Stack.Navigator>
              <Stack.Screen
                options={{
                  headerStyle: { backgroundColor: color.mainColor },
                  headerTintColor: color.textColor,
                  headerTitle: "",
                  headerLeft: () => (
                    <Image
                      style={[
                        StyleSheet.absoluteFill,
                        {
                          width: 231 / 2.2,
                          height: 140 / 2.2,
                          marginLeft: 50,
                        },
                      ]}
                      source={require("../assets/PostIt.png")}
                    />
                  ),
                }}
                name="Connexion"
                component={SignInScreen}
              />
              <Stack.Screen
                options={{
                  headerStyle: { backgroundColor: color.mainColor },
                  headerTintColor: color.textColor,
                  headerTitle: "",
                  headerLeft: () => (
                    <Image
                      style={[
                        StyleSheet.absoluteFill,
                        {
                          width: 231 / 2.2,
                          height: 140 / 2.2,
                          marginLeft: 50,
                        },
                      ]}
                      source={require("../assets/PostIt.png")}
                    />
                  ),
                }}
                name="S'inscrire"
                component={SignUpScreen}
              />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator>
              <Stack.Screen
                options={{
                  headerStyle: { backgroundColor: color.mainColor },
                  headerTintColor: color.textColor,
                  headerRight: () => (
                    <Link
                      style={[styles.link, { paddingRight: 20 }]}
                      to={{ screen: "Mon compte" }}
                    >
                      <FontAwesomeIcon
                        icon={faUser}
                        color={color.textColor}
                        size={25}
                      />
                    </Link>
                  ),
                }}
                name="Accueil"
                component={HomeScreen}
              />

              <Stack.Screen
                name="Mon compte"
                component={MyAccount}
                options={{
                  headerStyle: { backgroundColor: color.mainColor },
                  headerTintColor: color.textColor,
                }}
              />
              <Stack.Screen
                name="Projets"
                component={Projects}
                options={{
                  headerStyle: { backgroundColor: color.mainColor },
                  headerTintColor: color.textColor,
                  headerRight: () => (
                    <Link
                      style={[styles.link, { paddingRight: 20 }]}
                      to={{ screen: "Mon compte" }}
                    >
                      <FontAwesomeIcon
                        icon={faUser}
                        color={color.textColor}
                        size={25}
                      />
                    </Link>
                  ),
                }}
              />

              <Stack.Screen
                name="Nouveau Projet"
                component={NewProject}
                options={{
                  headerStyle: { backgroundColor: color.mainColor },
                  headerTintColor: color.textColor,
                  headerRight: () => (
                    <Link
                      style={[styles.link, { paddingRight: 20 }]}
                      to={{ screen: "Mon compte" }}
                    >
                      <FontAwesomeIcon
                        icon={faUser}
                        color={color.textColor}
                        size={25}
                      />
                    </Link>
                  ),
                }}
              />

              <Stack.Screen
                name="Nouveau post"
                component={NewPost}
                options={{
                  headerStyle: { backgroundColor: color.mainColor },
                  headerTintColor: color.textColor,
                  headerRight: () => (
                    <Link
                      style={[styles.link, { paddingRight: 20 }]}
                      to={{ screen: "Mon compte" }}
                    >
                      <FontAwesomeIcon
                        icon={faUser}
                        color={color.textColor}
                        size={25}
                      />
                    </Link>
                  ),
                }}
              />

              <Stack.Screen
                name="Posts"
                component={Posts}
                options={{
                  headerStyle: { backgroundColor: color.mainColor },
                  headerTintColor: color.textColor,
                  headerRight: () => (
                    <Link
                      style={[styles.link, { paddingRight: 20 }]}
                      to={{ screen: "Mon compte" }}
                    >
                      <FontAwesomeIcon
                        icon={faUser}
                        color={color.textColor}
                        size={25}
                      />
                    </Link>
                  ),
                }}
              />

              <Stack.Screen
                name="Détails du post"
                component={PostDetailsScreen}
                options={{
                  headerStyle: { backgroundColor: color.mainColor },
                  headerTintColor: color.textColor,
                  headerRight: () => (
                    <Link
                      style={[styles.link, { paddingRight: 20 }]}
                      to={{ screen: "Mon compte" }}
                    >
                      <FontAwesomeIcon
                        icon={faUser}
                        color={color.textColor}
                        size={25}
                      />
                    </Link>
                  ),
                }}
              />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      )}
    </TokenContext.Consumer>
  );
}

const styles = StyleSheet.create({
  label: {
    width: 70,
    color: color.textColor,
  },
  text_error: {
    color: "red",
  },
  text: {
    color: color.textColor,
  },
  text_input: {
    borderWidth: 1,
    backgroundColor: color.textColor,
    color: color.mainColor,
    margin: 15,
    height: 40,
    width: 300,
    borderRadius: 10,
    paddingLeft: 10,
  },
  pressable: {
    backgroundColor: color.mainColor,
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
    height: 40,
    width: 40,
    borderRadius: 10,
  },
});
