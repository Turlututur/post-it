import { View, Text, StyleSheet, Pressable } from "react-native";
import { TokenContext } from "../Context/Context";
import { UsernameContext } from "../Context/Context";
import { UserRoleContext } from "../Context/Context";
import PostsList from "../components/PostsList";

/**
 * Ecran permettant d'afficher la liste de posts
 * @returns L'affichage de la liste des posts en fonction de leur titre et état.
 */
export default function Posts({ route, navigation }) {
  const id = route.params.id;
  return (
    <View style={styles.container}>
      <UserRoleContext.Consumer>
        {([userRole, setUserRole]) => (
          <TokenContext.Consumer>
            {([token, setToken]) => (
              <UsernameContext.Consumer>
                {([username, setUsername]) => {
                  return (
                    <>
                      <Text style={styles.text}>Votre Rôle : {userRole}</Text>
                      <Text style={styles.text}>Projet : {id}</Text>
                      <PostsList
                        username={username}
                        token={token}
                        userRole={userRole}
                        id={id}
                      />
                    </>
                  );
                }}
              </UsernameContext.Consumer>
            )}
          </TokenContext.Consumer>
        )}
      </UserRoleContext.Consumer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B2430",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#D6D5A8",
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
