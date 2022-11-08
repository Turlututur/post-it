import { View } from "react-native";
import styles from "../styles/styles";
import { TokenContext } from "../Context/Context";
import { UsernameContext } from "../Context/Context";
import { UserRoleContext } from "../Context/Context";
import PostDetails from "../components/PostsDetails";

/**
 * Ecran permettant d'afficher les détails d'un post et de les modifier
 * @returns L'affichage d'un composant de détails de post.
 */
export default function PostDetailsScreen({ route, navigation }) {
  const post = route.params.post;
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
                      <PostDetails
                        username={username}
                        token={token}
                        userRole={userRole}
                        id={post.id}
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
