import React, { Component } from 'react'
import { View, Text,StyleSheet,TouchableHighlight,TouchableOpacity,Image,ScrollView,AsyncStorage } from 'react-native'
import { DrawerActions } from 'react-navigation-drawer';
import { connect } from 'react-redux'
import { remove_user } from '../store/actions/action'
import ip from './ip'


 class DrawerContent extends Component {

    state={

    }
    
   async _signOut(){
       await fetch(`http://${ip}:3000/users/logout`,{
           method : 'POST',
           headers :{
               'Content-Type' : 'application/json'
            },
            body:JSON.stringify({id:this.props.user._id})
        }).then(res => res.json())
        .then(result => {
            if(result.message){

                console.log('signout~~~~~~',result)
                this.props.remove_user();
                this.props.navigation.navigate('SignIn')
            }
    })

   }
    render() {
        
        return (
            <TouchableOpacity activeOpacity={0.5}  style={styles.drawerTransparent}>
                 <TouchableOpacity  activeOpacity={1} style={styles.drawer}>
                <ScrollView>
                    
                    <View style={styles.header}>
                        <TouchableOpacity onPress={()=>this.props.navigation.dispatch(DrawerActions.closeDrawer())} style={{alignSelf:'flex-end',marginRight:15}}><Text style={[styles.text,{color:'white',fontSize:18}]}>{'X'}</Text></TouchableOpacity>
                          <Image  style={styles.headerImage} />
                          <Text style={[styles.text,{color:'white'}]}>Muhammad Aijaz Abbasi</Text>
                    </View>

                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Home')} underlayColor={'coral'}>
                        <View style={styles.row}>
                        <Image style={[styles.headerImage,{height:25,width:25,backgroundColor:'coral'}]}  />
                        <Text  style={styles.text}>Home</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('MyPosts')}  underlayColor={'rgba(23,30,20,0.2)'}>
                        <View style={styles.row}>
                        <Image style={[styles.headerImage,{height:25,width:25,backgroundColor:'coral'}]}  />
                        <Text  style={styles.text}>My Requests</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('PostR')}  underlayColor={'rgba(23,30,20,0.2)'}>
                        <View style={styles.row}>
                        <Image style={[styles.headerImage,{height:25,width:25,backgroundColor:'coral'}]}  />
                        <Text  style={styles.text}>Post Requirement</Text>
                        </View>
                    </TouchableOpacity>

                     <TouchableOpacity  underlayColor={'rgba(23,30,20,0.2)'}>
                        <View style={styles.row}>
                        <Image style={[styles.headerImage,{height:25,width:25,backgroundColor:'coral'}]}  />
                        <Text  style={styles.text}>Notification</Text>
                        </View>
                    </TouchableOpacity>

                     <TouchableOpacity  underlayColor={'rgba(23,30,20,0.2)'}>
                        <View style={styles.row}>
                        <Image style={[styles.headerImage,{height:25,width:25,backgroundColor:'coral'}]}  />
                        <Text  style={styles.text}>settings</Text>
                        </View>
                    </TouchableOpacity>
                    {/* _____________________________________________________________________ */}
                    <View style={styles.line}></View>
                    <TouchableHighlight onPress={()=>this._signOut()}  underlayColor={'rgba(0,0,0,0.2)'}>
                        <View style={styles.row}>
                        <Image style={[styles.headerImage,{height:25,width:25,backgroundColor:'coral'}]}  />
                        <Text  style={styles.text}>SignOut</Text>
                        </View>
                    </TouchableHighlight>
                </ScrollView>
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    drawerTransparent:{
        flex:1,
        backgroundColor:'transparent'
    },
    drawer:{
        flex:1,
        // width:350,
        width:'100%',
        justifyContent:'center',
    },
    header:{
        width:'100%',
        height:200,
        backgroundColor:'#20B2AA',
        // backgroundColor:'#6195ff',
        alignItems:'center',
        justifyContent:'space-around'
    },
    headerImage:{
        height:100,
        width:100,
        backgroundColor:'white',
        borderRadius:50,
    },
    row:{
        flexDirection:'row',
        paddingVertical:15,
        paddingLeft:20,
    },
    menu:{
        width:10,
        height:10,
        backgroundColor:'red',
        borderRadius:50,
        alignSelf:'center',
    },
    text:{
        marginTop:5,
        fontWeight:'bold',
        marginLeft:15,
        color:'teal',
    },
    line:{
        width:'90%',
        alignSelf:'center',
        height:1,
        backgroundColor:'gray',
        margin:15,
    }
})
const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        remove_user: () => dispatch(remove_user())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);