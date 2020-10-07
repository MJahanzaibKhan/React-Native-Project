import React , { Component } from 'react'
import {
View,Text,TouchableOpacity,ScrollView,StyleSheet,Picker
} from 'react-native'
import { connect } from 'react-redux'
import { update_user } from '../store/actions/action'
import ip from './ip'

import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';


class SignIn extends Component {
    constructor(){
        super()
        this.state = {
            email:'m7y@gmail.com',password:12334455,
            error:null,
        }
    }


    

    _sigin(){
  console.log('chala')
  let { email,password } = this.state
  fetch(`http://${ip}:3000/users/login`, {
    method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
    body: JSON.stringify({ email,password })
}).then(user=>user.json())
.then(data=>{
    if(data.message){
        this.setState({error:data.message})
    }
    else if(data._id){
        console.log('>>>>>>>>>>>>>>',data)
        this.props.store_user(data)
        this.props.navigation.navigate('Home')
    }
})
}

componentDidMount(){
    let user = this.props.user;
    if (user){
        this.props.navigation.navigate('Home')
    }
}
    render(){
        let { error, } = this.state;
        return(
            <View style={{flex:1,backgroundColor:'teal'}}>

{/* Header */}
                <View style={styles.header}>
                    <Text style={styles.hText}>Blood Donation App</Text>
                </View>

{/* Form */}
            <View style={styles.container}>

                <ScrollView>

                  <Form style={styles.form}>
          

            <Item floatingLabel>
              <Label style={styles.label}>Email</Label>
              <Input onChangeText={(text)=>this.setState({email:text})} />
            </Item>

           

            <Item floatingLabel >
              <Label style={styles.label}>Password</Label>
              <Input onChangeText={(text)=>this.setState({password:text})}  secureTextEntry/>
            </Item>

            <View style={{justifyContent:'center',marginTop:10}}>
                {error && <Text style={{textAlign:'center',color:'yellow'}}>{error}</Text>}
            </View>

            <TouchableOpacity onPress={()=>this._sigin()} style={styles.button}>
                <Text style={styles.bText}>Sign In</Text>
            </TouchableOpacity>

            <View style={{display:'flex',flexDirection:'row',justifyContent:'center',marginTop:20}}>
                <Text style={{color:'white',fontSize:16,marginRight:5}}>Don't have any account? </Text>
                <TouchableOpacity onPress={()=> this.props.navigation.navigate('SignUp')}>
                    <Text style={{color:'#00FFFF',fontSize:18,}}>Sign Up</Text>
                </TouchableOpacity>
            </View>
          </Form>

</ScrollView>
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'teal'
    },
    form:{
        marginLeft:5,
        marginRight:5,
        maxWidth:350,
        alignSelf:'center',
        minWidth:300
    },
    label:{
        color:'white'
    },
    button:{
        backgroundColor:'white',
        marginTop:26,
        height:40,
        justifyContent:'center',
        borderRadius:20
    },
    bText:{
        color:'teal',
        textAlign:'center',
        fontSize:18
    },
    header:{
        height:100,
        backgroundColor:'#20B2AA',
        justifyContent:'center',
        // borderWidth:2,
        borderBottomEndRadius:100,
        borderBottomStartRadius:100,
        marginBottom:2,
    },
    hText:{
        color:'white',
        fontWeight:'800',
        fontSize:22,
        textAlign:'center'
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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);