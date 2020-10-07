import React from 'react';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity,ScrollView,ActivityIndicator} from 'react-native';
import {Toast} from 'native-base'
import {connect} from 'react-redux';
import ip from './ip'
import { DrawerActions } from 'react-navigation-drawer'

class DetailedScreen extends React.Component {
    state={
        posts:[],
        post:{}
    }

 
//  CUSTOMIZATION OF STACK HEADER
static navigationOptions = ({navigation}) => {
    return{
        title: 'My Post Detail',
    headerStyle: {
        backgroundColor:'#20B2AA'
    },
    headerTintColor: 'white',
    headerTitleStyle: {
        fontWeight: 'bold',
        color:'white'
    },
}
};




  sendComment(){
    const postId = this.props.navigation.getParam('id');
      const message=this.state.message;
    console.log('sending comment')
        const myId=this.props.user._id;
        fetch(`http://${ip}:3000/posts/addComment`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "authorization":`Bearer ${this.props.user.token}`
            },
            body:JSON.stringify({
               id:postId,
               comment:{
                   id:myId,
                   name:this.props.user.name,
                   comment:message,
               }
            })
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data,"comment sent");
            Toast.show({
                text:"comment sent",
                position:"bottom",
                type:"success"
            })
            this.getPost()
        })
        .catch(e=>{
            console.log(e,'e');
            Toast.show({
                text:"comment not sent",
                position:"bottom",
                type:"danger"
            })
        })
  }
    componentDidMount(){
        this.getPost();
        console.log(this.props.user)
    }
    getPost(){
        const postId = this.props.navigation.getParam('id');
        const volLen = this.props.navigation.getParam('volunteerLen');
        console.log(volLen,'vol len');
            this.setState({volLen})
        console.log(postId,'postId');
        fetch(`http://${ip}:3000/posts/getPost`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "authorization":`Bearer ${this.props.user.token}`
            },
            body:JSON.stringify({id:postId})
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data.result[0].comments,"comments");
        this.setState({post:data.result[0]});
        })
        .catch(e=>console.log(e,'e'))
    }


    // Donated................
    _donated(array){
        const postId = this.props.navigation.getParam('id');
        fetch(`http://${ip}:3000/posts/updateStatus`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'authorization':`Bearer ${this.props.user.token}`
            },
            body:JSON.stringify({id:postId,vol:array})
        }).then(res => res.json())
        .then(result => {
            if(result.data){
                this.getPost();
            }
        }
        )
    }
    statusChange(index,newStatus){
        let { post } = this.state;
        post.volunteer[index].status = newStatus
        this.setState({post})
        this._donated(post.volunteer)
    }
  render(){
    return (
     <View style={{flex:1}}>
        <ScrollView style={{marginBottom:50,}} >
    
                 <View  style={{margin:10,backgroundColor:'#F9F9F9',padding:10}}>
                <View  style={{padding:10}}>
                    <Text style={{fontSize:20,fontWeight:'bold'}}>
                        {this.state.post.firstName} {this.state.post.lastName}
                    </Text>
                    <Text style={{fontSize:20}}>
                        {this.state.post.nUnits} units of {this.state.post.bloodGroup} Blood required
                    </Text>
                    <Text style={{fontSize:20}}>
                        At {this.state.post.hospital} Hospital for my friend
                    </Text>
                    <Text style={{fontSize:20}}>
                       Contact No: {this.state.post.contact}
                    </Text>
                    <Text style={{fontSize:20}}>
                        Additional detail: {this.state.post.detail}
                    </Text>
                    <Text style={{fontSize:20}}>
                        Volunteers uptill now : {this.state.volLen}
                    </Text>
                    <Text style={{fontSize:20}}>
                        Current requirement :  {this.state.post.nUnits-this.state.volLen}
                    </Text>
                </View>
            </View>
            <View style={{flex:0.1,flexDirection:'row',marginBottom:10,paddingHorizontal:20,justifyContent:'center'
        ,alignItems:'center'}}>
                    <Text style={{fontSize:20}}>Volunteers</Text>
                </View>
            <View style={{margin:10,backgroundColor:'#F9F9F9',padding:10}}>
                {!!this.state.post.volunteer && this.state.post.volunteer.map((e,i)=>{
                    return <View key={i} style={{borderWidth:1,paddingLeft:20,marginBottom:10,paddingTop:10,borderRadius:10,borderColor:'gray'}}>
                            <Text style={{fontSize:20,fontWeight:'bold'}}>{e.name}</Text>
                            <Text>Blood: {e.bloodGroup}</Text>
                            {e.status === 'Not Donated'
                            ?
                            <Text style={{fontSize:20,color:'#296'}}>Status : {e.status}</Text>
                            :
                            <Text style={{fontSize:20,color:'red'}}>Status : {e.status}</Text>
                        }
                           {e.status === 'Not Donated'
                        ?
                        <TouchableOpacity onPress={()=>this.statusChange(i,'Donated')} style={{alignSelf:'flex-end',backgroundColor:'#296',padding:5,paddingLeft:14,paddingRight:14,marginTop:10,margin:5,borderRadius:5,}}>
                                    <Text style={{fontSize:17,color:'white'}}>Donated</Text>
                                </TouchableOpacity>
:
                                <TouchableOpacity onPress={()=>this.statusChange(i,'Not Donated')} style={{alignSelf:'flex-end',backgroundColor:'black',padding:5,paddingLeft:14,paddingRight:14,marginTop:10,margin:5,borderRadius:5,}}>
                                    <Text style={{fontSize:17,color:'white'}}>Not Donated</Text>
                                </TouchableOpacity>
}
                      
                        </View>
                })}
            </View>
            <View style={{flex:0.1,flexDirection:'row',marginBottom:10,paddingHorizontal:20,justifyContent:'center'
        ,alignItems:'center'}}>
                    <Text style={{fontSize:20}}>Comments</Text>
                </View>
                <View style={{margin:10,backgroundColor:'#F9F9F9',padding:10}}>
                   {this.state.post.comments && this.state.post.comments.map((e)=>{
                       console.log('!!!!!!!!!!!!!!',e)
                       return <View style={{flex:0.2,padding:20}}>
                            <Text>{e.name} </Text>
                            <Text>{e.comment}</Text>
                           </View>
                   })}
                    </View>
        </ScrollView>

            <View style={{position:'absolute',bottom:0,backgroundColor:'teal',width:"100%",display:'flex',flexDirection:'row'}}>
                <View style={{flex:0.9,height:60,alignSelf:'center',borderRightColor:'white',borderRightWidth:1}}>
                    <TextInput 
                    onChangeText={(text)=>this.setState({message:text})}
                    style={{width:'100%',color:'white',paddingLeft:15,paddingRight:10}} multiline={true} placeholder='Add comment' placeholderTextColor='white'/>
                </View>
                <View style={{alignSelf:'center',paddingLeft:5}}>
                    <TouchableOpacity style={{alignSelf:'center',padding:5}} onPress={this.sendComment.bind(this)}>
                <Text style={{textAlign:'center',color:'white'}}>{'>>>>'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
     </View>
      );
    }
}
const mapStateToProps=(state)=>{ 
    console.log("state",state);
  return {
    user:state.user,
  }
  }
export default connect(mapStateToProps,)(DetailedScreen);
