import React , { Component } from 'react'
import {
View, Text, TouchableOpacity, TextInput, StyleSheet
} from "react-native"

const Signup = () => {
    return(
        <View style={styles.container}>

            <TextInput/>
            <TextInput/>

            <TouchableOpacity>
                <Text>Submit</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'coral',
    }
})

export default Signup;