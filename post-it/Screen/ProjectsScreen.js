import { View, Text, Image, Pressable } from "react-native";
import styles from "../styles/styles";
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
                      <Image
                        source={require("../assets/managerProject.png")}
                        style={{ width: 1380 / 4.5, height: 920 / 4.5 }}
                      />
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
