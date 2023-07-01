import { View, StyleSheet, Image, StatusBar, Text, ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import { useEffect, useState, memo, useCallback, Fragment } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigate } from "react-router-native";
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons'; 
import Drawer from "../Components/Drawer";

const RenderEmployee = memo(props=>{
    const { id, firstName, lastName, jobTitle, isFavourite, handleFavourite } = props
    return (
        <View style={styles.listItem}>
            <View style={styles.leftListSection}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{`${firstName[0]}${lastName[0]}`}</Text>
                </View>
                <View style={styles.listNameSection}>
                    <Text style={styles.listTitle}>{`${firstName} ${lastName}`}</Text>
                    <Text style={styles.listSubtitle}>{jobTitle}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={()=>{handleFavourite(id)}}>
                {
                    isFavourite
                    ? <Entypo name="star" size={40} color="#EBE154"/>
                    : <Entypo name="star-outlined" size={40} color="#000000"/>
                }
            </TouchableOpacity>
        </View>
    )
})

export default function EmployeeList(){
    const [ state, updateState ] = useState({
        isLoading:true,
        employees:[],
        showModal:false,
        showSortOption:false,
    })
    const setState = updation => {
        updateState(prev=>({
            ...prev,
            ...updation
        }))
    }
    const navigate = useNavigate()
    const loadEmployees = async() => {
        const { employees } = JSON.parse(await AsyncStorage.getItem('employees'))
        setState({employees})
    }
    useEffect(()=>{
        loadEmployees()
    },[])
    const handleFavourite = useCallback(id=>{
        updateState(prev=>{
            const updatedList = prev.employees.map(employee=>employee.id===id ? {...employee, isFavourite:!employee.isFavourite} : employee)
            AsyncStorage.setItem('employees',JSON.stringify({employees:updatedList}))
            return ({
                ...prev,
                employees:updatedList
            })
        })
    },[])
    const handleSort = () => {
        setState({
            employees:state.employees.sort((prev,curr)=>{
                const prevF = prev.firstName[0].toLowerCase()
                const currF = curr.firstName[0].toLowerCase()
                if(prevF<currF) return -1
                if(prevF>currF) return 1
                return 0
            }),
            showSortOption:false,
        })
    }
    return (
        <Fragment>
            <Drawer close={()=>{setState({showModal:false})}} isOpen={state.showModal}>
                <Text style={styles.summary}>Total Employees : {state.employees.length}</Text>
                <Text style={styles.summary}>Total Favourites : {state.employees.filter(e=>e.isFavourite).length}</Text>
            </Drawer>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.leftHeaderSection}>
                        <TouchableOpacity onPress={()=>{setState({showModal:true})}}>
                            <Ionicons name="menu" size={40} color="black"/>
                        </TouchableOpacity>
                        <Text style={styles.heading}>Inbox</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={()=>{setState({showSortOption:!state.showSortOption})}}>
                            <Entypo name="dots-three-vertical" size={24} color="black" />
                        </TouchableOpacity>
                        {
                            state.showSortOption
                            ? <View style={styles.dropdownContainer}>
                                <TouchableOpacity onPress={handleSort}>
                                    <Text style={styles.sortText}>Sort by Name</Text>
                                </TouchableOpacity>
                            </View>
                            :null
                        }
                    </View>
                </View>
                <FlatList
                    data={state.employees}
                    style={styles.listContainer}
                    renderItem={({item})=><RenderEmployee handleFavourite={handleFavourite} {...item}/>}
                />
            </View>
            <TouchableOpacity onPress={()=>{navigate('/EmployeeRegistration')}} style={styles.actionButton}>
                <AntDesign name="plus" size={30} color="black"/>
            </TouchableOpacity>
        </Fragment>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF',
        alignItems:'center',
        backgroundColor:'#EBEBEB'
    },
    header:{
        padding:10,
        paddingHorizontal:15,
        backgroundColor:'#32A852',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginTop:StatusBar.currentHeight,
        width:'100%',
    },
    leftHeaderSection:{
        flexDirection:'row',
        alignItems:'center',
    },
    heading:{
        fontSize:20,
        fontWeight:'bold',
        marginLeft:15,
    },
    listContainer:{
        padding:10,
        width:'100%',
    },
    listItem:{
        padding:10,
        backgroundColor:'#FFFFFF',
        width:'100%',
        flexDirection:'row',
        borderRadius:5,
        elevation:5,
        justifyContent:'space-between',
        marginBottom:5,
    },
    avatar:{
        backgroundColor:'#32A852',
        borderRadius:25,
        width:50,
        height:50,
        alignItems:'center',
        justifyContent:'center',
    },
    avatarText:{
        fontSize:25,
        fontWeight:'bold',
    },
    leftListSection:{
        flexDirection:'row',
        alignItems:'center'
    },
    listTitle:{
        fontSize:16,
        fontWeight:'bold',
    },
    listNameSection:{
        paddingLeft:15,
    },
    listSubtitle:{
        fontSize:14,
        color:'#505050',
    },
    summary:{
        fontSize:18,
        fontWeight:'bold',
    },
    actionButton:{
        position:'absolute',
        bottom:30,
        right:20,
        backgroundColor:'#32A852',
        padding:15,
        borderRadius:30,
    },
    dropdownContainer:{
        backgroundColor:'#FFFFFF',
        borderRadius:5,
        position:'absolute',
        minWidth:120,
        right:30,
        padding:10,
    },
    sortText:{
        fontWeight:'bold'
    }
})