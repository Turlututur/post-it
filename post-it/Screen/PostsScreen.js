import { View } from "react-native";
import styles from "../styles/styles";
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
