import React , { Component } from 'react'
import {
View,Text,TouchableOpacity,ScrollView,StyleSheet,Picker
} from 'react-native'

import {  Form, Item, Input, Label, Toast } from 'native-base';
import { update_user } from '../store/actions/action'
import { connect } from 'react-redux'
import ip from './ip'

import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage'

class SignUp extends Component {
    constructor(){
        super()
        this.state = {
           
                fName:'',
                lName:'',
                email:'',
                bloodGroup:'A+',
                password:'',
                error:'',
                email_errorr:'',
                fcmToken:'',
            
        }
    }

    
  //1
async checkPermission() {
    console.log('aijaz')
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
        this.getToken();
    } else {
        this.requestPermission();
    }
  }
  
    //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    this.setState({fcmToken})
     console.log('<<<token>>>',fcmToken)
    if (!fcmToken) {
        fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
            // user has a device token
            console.log('token>>>',fcmToken)
            this.setState({fcmToken})
            await AsyncStorage.setItem('fcmToken', fcmToken);
        }
    }
  }
  
    //2
  async requestPermission() {
    try {
        await firebase.messaging().requestPermission();
        // User has authorised
        this.getToken();
    } catch (error) {
        // User has rejected permissions
        console.log('permission rejected');
    }
  }
  componentDidMount(){
      this.requestPermission()
  }
  

     _signup(){
          console.log('chala')
          
          let {fName,lName,email,bloodGroup,password, email_errorr, password_error,fcmToken:fcmToken} = this.state
          if(!email_errorr && !password_error){

              fetch(`http://${ip}:3000/users/register`, {
                  method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
    body: JSON.stringify({fName,lName,email,bloodGroup,password,fcmToken,notification:false})
}).then(user=>user.json())
.then(data=>{
    console.log('data~~~!!!~~~~~~!!!!~~~',data)
    if(data.result){
        
        Toast.show({ text: "Registration successful..",
                position: "top", type: "success"})

                setTimeout(()=>{

                    this.props.navigation.navigate('SignIn')
                },2000)
    }
    else if(data.message){
        this.setState({error:data.message})
    }
})
}else{
    this.setState({error:'Registration not successful. Please fill the form correctly.'})
}

      }

    //   Form ____ Validation .........

    _email(value){
        let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let test = emailRegex.test(value)
        if(test){
            this.setState({email:value,email_errorr:'',error:''})
        }else{
            this.setState({email_errorr:'Email is not correct..',error:''})
        }
    }

    _password(value){
        if(value && value.length > 5){
            this.setState({password:value,password_error:'',error:''})
        }else{
            this.setState({password_error:'Password should be atleast 6 characters',error:''})
        }
    }

    render(){
        let { email_errorr, error, password_error } = this.state;
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
              <Label style={styles.label}>First Name</Label>
              <Input onChangeText={(text)=>this.setState({fName:text,error:''})} />
            </Item>

            <Item floatingLabel>
              <Label style={styles.label}>Last Name</Label>
              <Input onChangeText={(text)=>this.setState({lName:text,error:''})} />
            </Item>

            <Item floatingLabel>
                {email_errorr
              ?<Label style={styles.error}>{email_errorr}</Label>
              :<Label style={styles.label}>Email</Label>
                }
              <Input onChangeText={(text)=>this._email(text)} />
            </Item>

            <Item  >
                {/* <Label style={styles.label}>Blood Group</Label> */}
              <Picker
  selectedValue={this.state.bloodGroup}
  style={{height: 50, width: 200,color:'white',backgroundColor:'teal'}}
  onValueChange={(itemValue, itemIndex) =>
    this.setState({bloodGroup: itemValue,error:''})
  }>
      
  <Picker.Item label="A+" value="A+" />
  <Picker.Item label="A-" value="A-" />
   <Picker.Item label="B+" value="B+" />
  <Picker.Item label="B-" value="B-" />
  <Picker.Item label="AB+" value="AB+" />
  <Picker.Item label="AB-" value="AB-" />
   <Picker.Item label="O+" value="O+" />
  <Picker.Item label="O-" value="O-" />
</Picker>

            </Item>

            <Item floatingLabel >
                {password_error
              ?<Label style={styles.error}>{password_error}</Label>
              :<Label style={styles.label}>Password</Label>
                }
              <Input onChangeText={(text)=>this._password(text)}  secureTextEntry/>
            </Item>

           
           
            <Text style={{width:250,color:'yellow',marginTop:10,}}>{error?error:''}</Text>
      

            <TouchableOpacity onPress={()=>this._signup()} style={styles.button}>
                <Text style={styles.bText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={{display:'flex',flexDirection:'row',justifyContent:'center',marginTop:20}}>
                <Text style={{color:'white',fontSize:16,marginRight:5}}>Already have an account? </Text>
                <TouchableOpacity onPress={()=> this.props.navigation.navigate('SignIn')}>
                    <Text style={{color:'#00FFFF',fontSize:18,}}>Sign In</Text>
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
        minWidth:300,
        marginBottom:30,
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
    error:{
        color:'yellow'
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);