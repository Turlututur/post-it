const API_URL = 'http://192.168.0.31:4000' //à adapter !!!

// Mutation de connexion
const SIGN_IN =
  'mutation($username:String!, $password:String!, $role:String!){signIn(username:$username, password:$password, role:$role)}'

// Mutation d'inscription
const SIGN_UP =
  'mutation($username:String!, $password:String!, $role:String!){signUp(username:$username, password:$password, role:$role)}'

// Query permettant de récuperer le role et l'id d'un utilisateur grâce à son nom
const GET_USER_DATA = 
  'query users($username:String!) {users(where: {username: $username}) {id, role}}'


/**
 * Fonction de connexion. 
 * Permet de se connecter à l'api grâce au nom d'utilisateur, 
 * mot de passe et role.
 * @param {String} username Le nom de l'utilisateur
 * @param {String} password Le mot de passe de l'utilisateur
 * @param {String} role     Le rôle de l'usilisateur
 * @returns La reponse de l'api (erreur par exemple).
 */
export function signIn (username, password, role) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: SIGN_IN,
      variables: {
        username: username,
        password: password,
        role: role
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.signIn
    })
    .catch(error => {
      throw error
    })
}

/**
 * Fonction d'inscription.
 * Permet de s'inscrire auprès de l'api grâce au nom d'utilisateur, 
 * mot de passe et role.
 * @param {String} username Le nom de l'utilisateur
 * @param {String} password Le mot de passe de l'utilisateur
 * @param {String} role     Le rôle de l'usilisateur
 * @returns La reponse de l'api (erreur par exemple).
 */
export function signUp (username, password, role) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: SIGN_UP,
      variables: {
        username: username,
        password: password,
        role: role
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.signUp
    })
    .catch(error => {
      throw error
    })
}

/**
 * Fonction permettant de récuperer des informations sur un utilisateur.
 * @param {String} username Le nom d'utilisateur.
 * @param {String} token    Le token permettant de valider la requête auprès de l'api.
 * @returns Les données liées à l'utilisateur ou bien l'erreur d'execution (si elle a lieu).
 */
export function getUserData (username, token){
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token
    },
    body: JSON.stringify({
      query: GET_USER_DATA,
      variables: {
        username: username
      }
    })
  })
  .then(response => {
    return response.json()
  })
  .then(jsonResponse => {
    if (jsonResponse.errors != null) {
      throw jsonResponse.errors[0]
    }
    return jsonResponse.data.users
  })
  .catch(error => {
    throw error
  })
}