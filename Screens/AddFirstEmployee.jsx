import { Button, View, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";

export default function AddFirstEmployee(){
    const navigate = useNavigate()
    const handlePress = () => {
        navigate('/EmployeeRegistration')
    }
    return (
        <View style={styles.container}>
            <Button color={'#366E45'} title="Add Employee" onPress={handlePress} style={styles.button}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#32A852',
        alignItems:'center',
        justifyContent:'center',
    },
})