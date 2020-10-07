import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import Data from './Data'
import ListItem from './ListItem'
export default class Flatlist extends Component{

    constructor(props){
        super(props)
        this.initData = Data;
        this.state ={
            data:this.initData,
        }
    }

    handleDeleteTask = (itemId) => {
        const newData = this.state.data.filter( item => itemId !== item.id);
        this.setState({data:newData})
    }

    render(){
        const header = () => {
            return<View style={StyleSheet.header}>
                <Text style={styles.headerText} >List Header</Text>
            </View>
        }
        return(
            <View style={styles.contentContainer} >

            <FlatList
            ListHeaderComponent={header}
            data={this.state.data}
            keyExtractor={(item)=>(item.id).toString()}
            ItemSeparatorComponent={()=><View style={StyleSheet.itemSeparator} ></View>}
            contentContainerStyle={{borderBottomColor:'gray',borderBottomWidth:2}}
            renderItem={({item,index})=><ListItem item={item} index={index} handleDeleteTask={this.handleDeleteTask} />}

            />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    contentContainer : {
        backgroundColor:'white'
    },
    header:{
        height:60,
        backgroundColor:'orange',
        alignItems:'center',
        justifyContent:'center'
    },
    headerText:{
        fontSize:20,
        color:'white'
    },
    itemSeparator:{
        borderBottomWidth:1,
        borderBottomColor:'gray'
    }
})



