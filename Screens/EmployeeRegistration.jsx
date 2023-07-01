import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigate } from "react-router-native";
import { v1 as uuid } from 'uuid'

const initialState = {
    id:uuid(),
    firstName:'',
    lastName:'',
    jobTitle:'',
    salary:'',
    isFavourite:false,
}
export default function Splash(){
    const navigate = useNavigate()
    const [ state, updateState ] = useState(initialState)
    const setState = updation => {
        updateState(prev=>({
            ...prev,
            ...updation
        }))
    }
    const handleSubmit = async() => {
        if(!state.firstName || !state.lastName || !state.jobTitle || !state.salary){
            return Alert.alert('Codinova','Please Enter all details')
        }
        const exists = await AsyncStorage.getItem('employees')
        if(exists){
            const savedData = JSON.parse(exists)
            const  updatedData = {
                employees:[...savedData.employees, state]
            }
            await AsyncStorage.setItem('employees',JSON.stringify(updatedData))
        }
        else{
            await AsyncStorage.setItem('employees',JSON.stringify({employees:[state]}))
        }
        setState(initialState)
        navigate('/EmployeeList')
    }
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Enter Employee Details</Text>
            <View style={styles.formControl}>
                <Text style={styles.label}>First Name</Text>
                <TextInput value={state.firstName} onChangeText={text=>{setState({firstName:text})}} style={styles.input}/>
            </View>
            <View style={styles.formControl}>
                <Text style={styles.label}>Last Name</Text>
                <TextInput value={state.lastName} onChangeText={text=>{setState({lastName:text})}} style={styles.input}/>
            </View>
            <View style={styles.formControl}>
                <Text style={styles.label}>Job Title</Text>
                <TextInput value={state.jobTitle} onChangeText={text=>{setState({jobTitle:text})}} style={styles.input}/>
            </View>
            <View style={styles.formControl}>
                <Text style={styles.label}>Salary</Text>
                <TextInput value={state.salary} onChangeText={text=>{setState({salary:text})}} style={styles.input}/>
            </View>
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF',
        alignItems:'center',
        padding:20,
    },
    heading:{
        color:'#32A852',
        fontWeight:'bold',
        fontSize:18,
        marginTop:40,
    },
    label:{
        color:'#505050',
        fontWeight:'bold',
    },
    formControl:{
        width:'100%',
        padding:20,
    },
    input:{
        width:'100%',
        fontSize:16,
        borderBottomColor:'#32A852',
        borderBottomWidth:2,
        paddingBottom:10,
    },
    buttonText:{
        fontWeight:'bold',
        color:'#FFFFFF',
        fontSize:16,
    },
    button:{
        backgroundColor:'#32A852',
        width:'90%',
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        marginTop:10,
        borderRadius:5,
    }
})