import { Fragment, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Dimensions, Button, Animated, StatusBar, TouchableWithoutFeedback, Modal } from "react-native";
const phoneHeight = Dimensions.get('window').height
const phoneWidth = Dimensions.get('window').width

const drawerWidth = phoneWidth*0.8

export default function Drawer({isOpen,close, children}){
    const track = useRef(new Animated.Value(0)).current
    const show = () => {
        Animated.timing(track,{duration:700,toValue:1,useNativeDriver:false}).start()
    }
    const hide = () => {
        Animated.timing(track,{duration:700,toValue:0,useNativeDriver:false}).start()
    }
    const animatedValue = track.interpolate({
        inputRange : [0,1],
        outputRange : [-drawerWidth,0]
    })
    useEffect(()=>{
        if(isOpen) show()
        else hide()
    },[isOpen])
    return (
        <Modal transparent={true} visible={isOpen}>
            <TouchableWithoutFeedback onPress={close}>
                <View style={[StyleSheet.absoluteFillObject,{backgroundColor:'#rgba(0,0,0,0.5)'}]}/>
            </TouchableWithoutFeedback>
            <Animated.View style={{...styles.container,left:animatedValue}}>
                {children}
            </Animated.View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    container : {
        position:'absolute',
        backgroundColor : '#FFFFFF',
        alignItems:'center',
        justifyContent:'center',
        zIndex:10,
        width:drawerWidth,
        height:phoneHeight,  
    }
})