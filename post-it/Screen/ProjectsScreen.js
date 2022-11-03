import { View, Text, StyleSheet, Pressable } from "react-native";
import { TokenContext } from "../Context/Context";
import { UsernameContext } from "../Context/Context";
import { UserRoleContext } from "../Context/Context";
import ProjectList from "../components/ProjectList";

/**
 * Ecran permettant d'afficher la liste de projets
 * @returns L'affichage de la liste des projets et d'un bouton de création en fonction du rôle
 */
export default function Projects() {
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
                      {/* Le composant importé : */}
                      <ProjectList
                        username={username}
                        token={token}
                        userRole={userRole}
                      ></ProjectList>
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
    paddingTop: 100,
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
