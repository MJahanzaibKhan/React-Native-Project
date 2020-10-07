import React, { Component } from 'react'
import {
View, Text,TouchableOpacity,ScrollView,StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
// import update_user  from '../store/reducers/root'
import { update_user } from '../store/actions/action'
import ip from './ip'
import moment from 'moment'

import { DrawerActions } from 'react-navigation-drawer'


class MyPosts extends Component{
state={posts:[]}
    
//  CUSTOMIZATION OF STACK HEADER
    static navigationOptions = ({navigation}) => {
        return{

            title: 'My Post ',

                //  toggle
            headerLeft: 
            <TouchableOpacity onPress={()=>navigation.dispatch(DrawerActions.toggleDrawer())}
             style={{ display:'flex',flexDirection:'column',marginLeft:10,alignSelf:"center",}}>

        <Text style={{  width:30,height:2,backgroundColor:'white',alignSelf:"center", marginBottom:6}}></Text>
        <Text style={{  width:30,height:2,backgroundColor:'white',alignSelf:"center", marginBottom:6}}></Text>
        <Text style={{  width:30,height:2,backgroundColor:'white',alignSelf:"center", marginBottom:6}}></Text>
        {/* <Text style={{  width:30,height:2,backgroundColor:'white',alignSelf:"center", marginBottom:4}}></Text> */}

         </TouchableOpacity>,
      
    //   toggle end

        headerStyle: {
            backgroundColor:'#20B2AA'
            // backgroundColor: '#946638',
        },
        headerTintColor: 'red',
        headerTitleStyle: {
            fontWeight: 'bold',
            color:'white'
        },
    }
 };

 async getAllPosts(){
     let { user } = this.props
        
        fetch(`http://${ip}:3000/posts/myposts`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "authorization":`Bearer ${user.token}`
            },
            body:JSON.stringify({id:user._id})
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data,"data");
        this.setState({posts:data.result});
        })
        .catch(e=>console.log(e,'e'))
    }

    

     

    componentDidMount(){
        let { user } = this.props;
        if(user){
            this.getAllPosts()
        }else{
            this.props.navigation.navigate('SignIn')
        }
    }

    render(){
        let { posts } = this.state;
        let sortedArray =posts ? posts.sort((a,b)=>{
            if(a.timeStamp < b.timeStamp){
                return 1
            }else{
                return -1
            }
        }):[]
        return(
                <View style={{backgroundColor:"lightgray",flex:1}} >
                   
                <ScrollView >

                {/* Feed Card */}
                {
                    posts && sortedArray.map((val,key)=>{
                        // console.log('post>>>',this.props.navigation)
                        return(
                            <TouchableOpacity key={key}  onPress={()=>this.props.navigation.navigate('MyPostDetail',{id:val._id,volunteerLen:val.volunteer.length})}>

                            <View  style={styles.card} >
                                  <View style={{display:'flex',flexDirection:'row',marginTop:7,justifyContent:'space-between'}}>
                         
                         <View style={{display:'flex',flexDirection:'row',marginTop:1,}}>
                     <Text style={styles.name}>No. of Units Required : </Text>
                   <Text style={styles.para}>{val.nUnits}</Text>
                    </View>
                   
                 <Text style={styles.para}>{moment(val.timeStamp).fromNow()}</Text>
                    </View>

                    <View style={{display:'flex',flexDirection:'row',marginTop:7,}}>
                     <Text style={styles.name}>Hospital : </Text>
                 <Text style={styles.para}>{val.hospital}</Text>
                    </View>
                    
                   
                    <View style={{display:'flex',flexDirection:'row',marginTop:7,}}>
                     <Text style={styles.name}>Urgency : </Text>
                    <Text style={styles.para}> {val.urgency}</Text>
                    </View>


                    
                    <View style={{display:'flex',flexDirection:'row',marginTop:7,marginBottom:5,borderColor:'lightgray',}}>
                     <Text style={styles.name}>Contact : </Text>
                    <Text style={styles.para}>{val.contact}</Text>
                    </View>
                </View>
                            </TouchableOpacity>
                            )
                        })
                }


                </ScrollView>
                 <TouchableOpacity onPress={()=>this.props.navigation.navigate('PostR')} style={styles.addbtn}>
                    <Text style={styles.addbtnText} > + </Text>
                </TouchableOpacity>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    card:{
        margin:10,
        padding:10,
        borderRadius:10,
        backgroundColor:"white"
    },
    name:{
        fontSize:15,
        color:'teal'
    },
    para:{
        fontSize:14,
    },
    button:{
        margin:5,
        marginTop:10,
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:15,
        paddingRight:15,
        width:150,
        justifyContent:'center',
        borderRadius:10,
        backgroundColor:'red',
       
    },
       button1:{
        margin:5,
        marginTop:10,
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:15,
        paddingRight:15,
        width:150,
        justifyContent:'center',
        borderRadius:10,
        backgroundColor:'navy',
       
    }
    ,
    addbtn:{
        position:'absolute',
        width:50,
        height:50,
        backgroundColor:'#20B2AA',
        bottom:10,
        right:10,
        borderRadius:25,
        justifyContent:'center',
        padding:0,
    },
    addbtnText:{
        color:'white',
        textAlign:'center',
        alignSelf:'center',
        fontSize:30,
        margin:0,
    }
    
    
})
const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        store_user: (user) => dispatch(update_user(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPosts);