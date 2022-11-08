import { View, Text } from "react-native";
import styles from "../styles/styles";
import { TokenContext } from "../Context/Context";
import { UsernameContext } from "../Context/Context";
import { UserRoleContext } from "../Context/Context";
import NewProjectForm from "../components/NewProjectForm";

/**
 * Ecran permettant d'afficher un formulaire de création de projet
 * @returns L'affichage de la liste des projets et d'un bouton de création en fonction du rôle
 */
export default function NewProject() {
  return (
    <View style={styles.container}>
      <UserRoleContext.Consumer>
        {([userRole, setUserRole]) => (
          <TokenContext.Consumer>
            {([token, setToken]) => (
              <UsernameContext.Consumer>
                {([username, setUsername]) => {
                  if (userRole == "manager") {
                    return (
                      <>
                        <Text style={styles.text}>Créer un nouveau projet</Text>
                        <NewProjectForm username={username} token={token} />
                      </>
                    );
                  } else {
                    return (
                      <>
                        <Text style={styles.text}>
                          Vous n'êtes pas autorisé à créer de projet. Cette page
                          ne devrait même pas vous être accessible ?
                        </Text>
                      </>
                    );
                  }
                }}
              </UsernameContext.Consumer>
            )}
          </TokenContext.Consumer>
        )}
      </UserRoleContext.Consumer>
    </View>
  );
}
