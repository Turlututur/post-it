const API_URL = 'http://localhost:4000'

const SIGN_IN =
  'mutation($username:String!, $password:String!){signIn(username:$username, password:$password)}'

const SIGN_UP =
  'mutation($username:String!, $password:String!){signUp(username:$username, password:$password)}'

const GET_USER_ID = 
  'query($username:String!) {users(where: {username: $username}) {id}}'

const CREATE_TASK_LISTS =
  'mutation($id:ID, $title:String!){createTaskLists(input:{title:$title, owner:{connect:{where:{id:$id}}}}) {taskLists{id, title, owner{id, username}}}}'

const CREATE_TASK = 
  'mutation($taskListID:ID,$taskName:String){createTasks(input:{content:$taskName, done:false, belongsTo:{connect:{where:{id:$taskListID}}}})'

const DELETE_TASK_LISTS  =
  'mutation()'

const DELETE_TASK =
  'mutation()'

const TASKLIST = 
  'query taskLists($username: String!) {taskLists(where: { owner: { username: $username } }) {id title}}'


export function signIn (username, password) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: SIGN_IN,
      variables: {
        username: username,
        password: password
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

export function signUp (username, password) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: SIGN_UP,
      variables: {
        username: username,
        password: password
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

export function createTaskLists(id, title, token) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer ' + token
    },
    body: JSON.stringify({
      query: CREATE_TASK_LISTS,
      variables: {
        id: id,
        title: title
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
      return jsonResponse.data.createTaskLists
    })
    .catch(error => {
      throw error
    })
}

export function createTask(taskId, taskName) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: CREATE_TASK,
      variables: {
        taskId: taskId,
        taskName: taskName
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
      return jsonResponse.data.createTask
    })
    .catch(error => {
      throw error
    })
}

export function getTaskList (username,token){
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token
    },
    body: JSON.stringify({
      query: TASKLIST,
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
    return jsonResponse.data.taskLists
  })
  .catch(error => {
    throw error
  })
}

export function getUserId (username, token){
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token
    },
    body: JSON.stringify({
      query: GET_USER_ID,
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
    return jsonResponse.data.taskLists
  })
  .catch(error => {
    throw error
  })
}