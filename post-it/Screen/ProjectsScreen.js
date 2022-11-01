import { View, Text, StyleSheet} from 'react-native'
import { TokenContext } from '../Context/Context';
import { UsernameContext } from '../Context/Context';
// import TaskList from '../components/TaskList';

/**
 * Ecran permettant d'afficher la liste de projets 
 * @returns L'affichage de la liste des projets
 * @todo L'affichage de la liste des projets (lmao)
 */
export default function Projects(){

    return (
        <View style={styles.container}>
          <TokenContext.Consumer>
          {([token, setToken]) => (
            <UsernameContext.Consumer>
              {([username, setUsername]) => 
                //   <TaskList username={username} token={token} />
                <Text>todo project list</Text>
              }
            </UsernameContext.Consumer>
          )}
          </TokenContext.Consumer>
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
  }
})
