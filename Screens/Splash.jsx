import { View, StyleSheet, Image } from "react-native";
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigate } from "react-router-native";

export default function Splash(){
    const navigate = useNavigate()
    const checkEmployessList = async() => {
        const res = await AsyncStorage.getItem('employees')
        if(res){
            navigate('/EmployeeList')
        }
        else{
            navigate('/AddFirstEmployee')
        }
    }
    useEffect(()=>{
        setTimeout(checkEmployessList,3000)
    },[])
    return (
        <View style={styles.container}>
            <Image source={{uri:'https://media.licdn.com/dms/image/C560BAQHwKvcsEAfg9g/company-logo_200_200/0/1532948252293?e=1696464000&v=beta&t=pyWqquRhuscvZY2WQGkZnTMABmgG9COzB82rGnPyf5k'}} style={styles.logo}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF',
        alignItems:'center',
        justifyContent:'center',
    },
    logo:{
        resizeMode:'contain',
        width:120,
        height:120,
    }
})