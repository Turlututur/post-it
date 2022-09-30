import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Text, FlatList, Switch } from 'react-native';

import todoData from '../Helpers/todoData';
import TodoItem from './TodoItem';


export default function TodoList(){

    const [count, setCount] = useState(0);
    const updateCount = (offset) => {setCount(count + offset)};
    const [todos, setTodos] = useState(todoData);
    const [newTodoText, setNewTodoText] = useState("");

    
    const deleteTodo = (id) => {
        const newTodos = todos.filter(item => item.id != id)
        setTodos(newTodos)
        setCount(newTodos.filter(item => item.done).length)
    };

    const addNewTodo = () => {
        const newId = Math.max(...todos.map(item => item.id)) + 1
        const newTodo = {
            id:newId,
            content:newTodoText,
            done:false
        }
        setTodos([...todos, newTodo])
    }

    const checkAll = () => {
        const newTodos = todos.map( item => {
            return {
                id:item.id,
                content:item.content,
                done:true
            }
        })
        setTodos(newTodos)
        setCount(newTodos.filter(item => item.done).length)
    }

    const checkNone = () => {
        const newTodos = todos.map( item => {
            return {
                id:item.id,
                content:item.content,
                done:false
            }
        })
        setTodos(newTodos)
        setCount(newTodos.filter(item => item.done).length)
    }

/*     const displayNotDone = () => {
        
    } */

    return (
        <View style={styles.container}>
        <Text>Voici votre liste de tâches</Text>
        <Text>Nombre de tâches réalisées : {count}</Text>
        <Text style={{flexDirection: 'row'}}>
            <Button 
                title="CheckAll"
                onPress={checkAll}
            />
            
            <Button
                title="CheckNone"
                onPress={checkNone}
            />
        </Text>
        <FlatList
            style={{ paddingLeft: 10 }}
            data={todos}
            renderItem={({item}) => <TodoItem todoDelete={deleteTodo} onPressed={updateCount} item={item} />} />   

            <Text style={{flexDirection: 'row'}}>
            <Button 
                title="Finies"
            />
            
            <Button
                title="En cours"
                /* onPress={displayNotDone} */
            />
        </Text>
             
        <TextInput
            onChangeText={setNewTodoText}
            placeholder='Saisir la nouvelle tâche'
            onSubmitEditing={addNewTodo}
            value={newTodoText}    
        />
        <Button
            title="Ajouter la tâche"
            onPress={addNewTodo}
        />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        
    },
    allSwitch: {
        justifyContent: 'flex-start'
    }
})