const API_URL = "http://192.168.0.28:4000"; //à adapter !!!

// Mutation de connexion
const SIGN_IN =
  "mutation($username:String!, $password:String!, $role:String!){signIn(username:$username, password:$password, role:$role)}";

// Mutation d'inscription
const SIGN_UP =
  "mutation($username:String!, $password:String!, $role:String!){signUp(username:$username, password:$password, role:$role)}";

// Query permettant de récuperer le role et l'id d'un utilisateur grâce à son nom
const GET_USER_DATA =
  "query users($username:String!) {users(where: {username: $username}) {id, role}}";

// Mutation de création de projet
const CREATE_PROJECT = `mutation($title:String!, $userId:ID, $username:String!, $writter:String) {
  createProjects(
    input:{
      title:$title, 
      asignedWritter:[$username, $writter]
      owner:{
        connect:{
          where:{
            id:$userId
          }
        }
      }
    }
  ) {projects{id, title, owner{id, username}}}
}`;

// Query permettant de récupérer les projets d'un utilisateur assigné.
const GET_PROJECTS = `query($username:String!) {
  projects(
    where:{
      asignedWritter_INCLUDES:$username
    }
  ){title, id, asignedWritter}}`;

// Mutation de suppression de Projet
const DELETE_PROJECT = `mutation($projectId:ID, $title:String){
  deleteProjects(
    where:{
      id:$projectId,
      AND:{title:$title}
    }
  ) {nodesDeleted}
}`;

// Mutation de création de post
const CREATE_POST = `mutation($title:String!, $content:String!, $desc:String!, $projectId:ID) {
  createPosts(
    input:{
      title:$title,
      content:$content,
      desc:$desc,
      comment:"En attente de commentaire",
      state:"En attente",
      belongsTo:{
        connect:{
          where:{
            id:$projectId
            }
          }
        }
      }
  ) {posts{id,title,content,desc,comment,state,belongsTo{id}}}
}`;

// Query de récuperation de posts
const GET_POSTS = `query($projectId:ID) {
  posts(
    where:{
      belongsTo:{
        id:$projectId
      }
    }
  ) {id, title, content, desc, comment, state}
}`;

// Query pour récuperer un post en particulier en fonction de son ID
const GET_POST_BY_ID = `query($id:ID) {
  posts(where:{id:$id}) {id, title, content, desc, comment, state}
}`;

// Mutation de suppression de post
const DELETE_POST = `mutation($postId:ID) {
  deletePosts(
    where:{
      id:$postId
    }
  ){nodesDeleted}
}`;

/**
 * Fonction de connexion.
 * Permet de se connecter à l'api grâce au nom d'utilisateur,
 * mot de passe et role.
 * @param {String} username Le nom de l'utilisateur
 * @param {String} password Le mot de passe de l'utilisateur
 * @param {String} role     Le rôle de l'usilisateur
 * @returns La reponse de l'api (erreur par exemple).
 */
export function signIn(username, password, role) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: SIGN_IN,
      variables: {
        username: username,
        password: password,
        role: role,
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0];
      }
      return jsonResponse.data.signIn;
    })
    .catch((error) => {
      throw error;
    });
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
export function signUp(username, password, role) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: SIGN_UP,
      variables: {
        username: username,
        password: password,
        role: role,
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0];
      }
      return jsonResponse.data.signUp;
    })
    .catch((error) => {
      throw error;
    });
}

/**
 * Fonction permettant de récuperer des informations sur un utilisateur.
 * @param {String} username Le nom d'utilisateur.
 * @param {String} token    Le token permettant de valider la requête auprès de l'api.
 * @returns Les données liées à l'utilisateur ou bien l'erreur d'execution (si elle a lieu).
 */
export function getUserData(username, token) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      query: GET_USER_DATA,
      variables: {
        username: username,
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0];
      }
      return jsonResponse.data.users;
    })
    .catch((error) => {
      throw error;
    });
}

/**
 * Fonction permettant de créer un projet dans l'api.
 * @param {String} title  Le titre du nouveau projet.
 * @param {ID} userId     L'id de l'utilisateur créant le projet.
 * @param {String} token  Le token d'autorisation.
 * @returns Une erreur si elle a lieu.
 */
export function createProjects(title, userId, username, writter, token) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      query: CREATE_PROJECT,
      variables: {
        title: title,
        userId: userId,
        username: username,
        writter: writter,
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0];
      }
      return jsonResponse.data.createProjects;
    })
    .catch((error) => {
      throw error;
    });
}

/**
 * Fonction permettant de récuperer les projets d'un utilisateur.
 * @param {String} username Le nom de l'utilisateur.
 * @param {String} token    Le token d'autorisation.
 * @returns La liste des projets (titre et id) ou une erreur.
 */
export function getProjects(username, token) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      query: GET_PROJECTS,
      variables: {
        username: username,
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0];
      }
      return jsonResponse.data.projects;
    })
    .catch((error) => {
      throw error;
    });
}

/**
 * Fonction de suppresion de projet en fonction de son identifiant ET de son titre.
 * @param {ID} projectId L'ID du projet.
 * @param {String} title Le titre du projet.
 * @param {String} token Le token d'autorisation de l'application.
 * @returns Une erreur si elle a lieu.
 */
export function deleteProject(projectId, title, token) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      query: DELETE_PROJECT,
      variables: {
        projectId: projectId,
        title: title,
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0];
      }
      return jsonResponse.data.deleteProject;
    })
    .catch((error) => {
      throw error;
    });
}

/**
 * Fonction de création de post destinée aux community manager.
 * @param {String!} title   Le titre du post (ne peut être vide).
 * @param {String!} content Le contenu du post (ne peut être vide).
 * @param {String} desc     La description destinée au supérieur hiérarchique
 *                          (peut être vide pour l'instant, mais il n'est pas exclu que cela change...).
 * @param {ID} projectId    L'id du projet qui contient le post.
 * @param {String} token    Le token d'autorisation de l'application.
 * @returns Retourne une erreur sie lle a lieu ou le resultat de la mutation effectuée.
 */
export function createPost(title, content, desc, projectId, token) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      query: CREATE_POST,
      variables: {
        title: title,
        content: content,
        desc: desc,
        projectId: projectId,
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0];
      }
      return jsonResponse.data.createPost;
    })
    .catch((error) => {
      throw error;
    });
}

/**
 * Fonction de récuperation de posts.
 * @param {ID} projectId L'id du projet qui contient le post.
 * @param {String} token Le token d'autorisation de l'app.
 * @returns Les posts et leur titre, contenu, description, commentaire et état.
 */
export function getPosts(projectId, token) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      query: GET_POSTS,
      variables: {
        projectId: projectId,
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0];
      }
      return jsonResponse.data.posts;
    })
    .catch((error) => {
      throw error;
    });
}

/**
 * Fonction de récupération de post en fonction de son ID
 * @param {ID} id
 * @param {String} token
 * @returns Le post et ses paramètres.
 */
export function getPostById(id, token) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      query: GET_POST_BY_ID,
      variables: {
        id: id,
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0];
      }
      return jsonResponse.data.posts;
    })
    .catch((error) => {
      throw error;
    });
}

/**
 * Fonction de suppression de post.
 * @param {ID} postId     L'id du post à supprimer.
 * @param {String} token  Le token d'autorisation de l'application.
 * @returns Le nombre de noeuds supprimés ou un erreur si elle a lieu.
 */
export function deletePost(postId, token) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      query: DELETE_POST,
      variables: {
        postId: postId,
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0];
      }
      return jsonResponse.data.nodesDeleted;
    })
    .catch((error) => {
      throw error;
    });
}
