import React, { Component } from 'react'
import { View, 
    Text, 
    StyleSheet,
    TouchableOpacity,
    Animated,
    PanResponder,
    Dimensions,
    UIManager,
    LayoutAnimation,
} from 'react-native'



export default class List extends Component{


    constructor(props){
        super(props);
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
        this.panResponder = PanResponder.create({

            onStartShouldSetPanResponder : () => false,
            onStartShouldSetPanResponderCapture : () => false,
            onMoveShouldSetResponderCapture : ()=> true,

            onMoveShouldSetPanResponderCapture : ( evt, gestureState ) => {
                const { dx, dy } = gestureState;
                if(dx>2 || dx < -2 || dy > 5 || dy < -5) {
                    return true;
                }else{return false;}
            },

            onPanResponderMove : ( evt, gestureState ) => {
                this.onMoveX(gestureState.dx);
            },
            onPanResponderTerminate : ( evt, gestureState ) => {
                this.onPanResponderRelease(gestureState);
            },
            onPanResponderRelease : ( evt, gestureState ) => {
                this.onPanResponderRelease(gestureState);
            }

            
        })
    }

    onMoveX = (dx) => {
        this.refs['task'].setNativeProps({style:{transform :[{translateX:dx}]}})
    }

    onPanResponderRelease = ( gestureState ) => {
        if (Math.abs(gestureState.dx) < Dimensions.get('window').width/2){

            this.refs['task'].setNativeProps({style:{transform:[{translateX:0}]}})
        }
        if(Math.abs(gestureState.dx)>= Dimensions.get('window').width/2){
            LayoutAnimation.configureNext(LayoutAnimation.create(300, "easeInEaseOut", 'opacity'))
            this.refs['task'].setNativeProps({style:{transform:[{translateX:Dimensions.get('window').width}]}})
            this.props.handleDeleteTask(this.props.item.id);
        }
    }

    render(){
        return(
            <View>
                <View style={styles.absolute} >
                    <Text style={[styles.text, {marginHorizontal:10}]} >DELETE</Text>
                    <Text style={[styles.text, {marginHorizontal:10}]} >DELETE</Text>

                </View>

                <Animated.View ref='task' style={styles.item} {...this.panResponder.panHandlers} >
                <Text style={[styles.text, {flex:1}]} > {this.props.item.text} </Text>

                <TouchableOpacity>
                    <View style={styles.menu} ></View>
                    {/* <View style={styles.menu} ></View>
                    <View style={styles.menu} ></View> */}
                </TouchableOpacity>
                </Animated.View>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    item:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'white'
    },
    absolute:{
        position:'absolute',
        width:'100%',
        height:'100%',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'red',
        flexDirection:'row'
    },
    text:{
        marginVertical:20,
        fontSize:20,
        marginLeft:10,
    },
    menu:{
        width:20,
        height:2,
        backgroundColor:'silver',
        margin:2,
        marginHorizontal:10,
        borderRadius:2
    }
})