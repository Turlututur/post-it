import { View, Text } from "react-native";
import styles from "../styles/styles";
import { TokenContext } from "../Context/Context";
import { UsernameContext } from "../Context/Context";
import { UserRoleContext } from "../Context/Context";
import NewPostForm from "../components/NewPostForm";

/**
 * Ecran permettant d'afficher un formulaire de création de post
 * @returns L'affichage d'un formulaire
 */
export default function NewPost({ route, navigation }) {
  console.log(route);
  const id = route.params.id;
  console.log("id", id);
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
                      <Text style={styles.text}>
                        Créer un nouveau post {id}
                      </Text>
                      <NewPostForm username={username} token={token} id={id} />
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
