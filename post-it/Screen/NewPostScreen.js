import { View, Text, StyleSheet, Pressable} from 'react-native'
import { TokenContext } from '../Context/Context';
import { UsernameContext } from '../Context/Context';
import { UserRoleContext } from '../Context/Context';
import NewPostForm from '../components/NewPostForm';

/**
 * Ecran permettant d'afficher un formulaire de création de post 
 * @returns L'affichage d'un formulaire
 */
export default function NewPost({route, navigation}){
    console.log(route)
    const id = route.params.id
    console.log("id", id)
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
                        <Text style={styles.text}>Créer un nouveau projet {id}</Text>
                        <NewPostForm username={username} token={token} id={id}/>                    
                        </>
                      ) 
              }}
            </UsernameContext.Consumer>
          )}
          </TokenContext.Consumer>
          )}
          </UserRoleContext.Consumer>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B2430',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 250
  },
  text : {
    color: '#D6D5A8'
  },
  pressable: {
    backgroundColor: '#51557E',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
    height: 40,
    width: 300,
    borderRadius:10
  }
})
