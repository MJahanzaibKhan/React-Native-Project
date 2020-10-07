import React , { Component } from 'react'
import {
View,Text,TouchableOpacity,ScrollView,StyleSheet,Picker,TextInput,
} from 'react-native'

import { Content, Button, Toast, Form, Item, Input, Label, Textarea } from 'native-base';

import { Container, Header, } from "native-base";
import { update_user } from '../store/actions/action'
import { connect } from 'react-redux'
import ip from './ip'
import  csc from 'country-state-city'
import { DrawerActions } from 'react-navigation-drawer'

class AddRequest extends Component {
    constructor(){
        super()
       this.countries=csc.getAllCountries();
    this.state={
      country:'Country',
      countryState:'state',
      descriptionLen:0,
      city:'city',
      flag:false,
      countries:this.countries,
      countryId:null,
      states:[],
      selectedState:null,
      cities:[],
      selectedCity:null,
      bloodGroup:'', nUnits:'',urgency:'2 days',
      hospital:'',relation:"cousin",contact:1233,detail:'abc',selectedCountry:'',
      showToast: false
    }
    }
    
    //  CUSTOMIZATION OF STACK HEADER
    static navigationOptions = ({navigation}) => {
        return{

            title: 'Post Request',

                //  toggle
            headerLeft: 
            <TouchableOpacity onPress={()=>navigation.dispatch(DrawerActions.toggleDrawer())}
             style={{ display:'flex',flexDirection:'column',marginLeft:10,alignSelf:"center",}}>

        <Text style={{  width:30,height:2,backgroundColor:'white',alignSelf:"center", marginBottom:6}}></Text>
        <Text style={{  width:30,height:2,backgroundColor:'white',alignSelf:"center", marginBottom:6}}></Text>
        <Text style={{  width:30,height:2,backgroundColor:'white',alignSelf:"center", marginBottom:6}}></Text>

         </TouchableOpacity>,
    //   toggle end

        headerStyle: {
            backgroundColor:'#20B2AA',
            // backgroundColor: '#946638',
            
        },
        headerTintColor: 'red',
        headerTitleStyle: {
            fontWeight: 'bold',
            color:'white',
            
        },
    }
 };


 async addPost(){
    let { user } = this.props
    let timeStamp = new Date().getTime()
    let { bloodGroup, nUnits,urgency,country,selectedCity,selectedState,hospital,relation,contact,detail,selectedCountry } = this.state
    fetch(`http://${ip}:3000/posts/addPost`, {
        method:"POST",
            headers:{
                "Content-Type":"application/json",
                "authorization":`Bearer ${user.token}`
            },
            body:JSON.stringify({userId:user._id,name:user.name,timeStamp:timeStamp, bloodGroup, nUnits,urgency,selectedCountry,selectedCity,selectedState,hospital,relation,contact,detail})
        }).then(data => data.json())
        .then(data=>{
            Toast.show({ text: "Post added successfully..",
                buttonText: "Okay",
                position: "top", type: "success"})
            })
                .catch(err=>{
            console.log('error',err)
        })
}

componentDidMount(){
    console.log('_________',this.props.user)
}
    render(){
        return(
           



            <View style={styles.container}>
                
{/* Form */}

                <ScrollView>

                  <Form style={styles.form}>
           
           <Item  >
              <Picker
  selectedValue={this.state.bloodGroup}
  style={{height: 50, width: 290,color:'white',backgroundColor:'teal',marginTop:18,}}
  onValueChange={(itemValue, itemIndex) =>
    this.setState({bloodGroup: itemValue})
  }>
       <Picker.Item label="Blood Group" value="" />
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


            <Item  >
              <Picker
  selectedValue={this.state.nUnits}
  style={{height: 50, width: 290,color:'white',backgroundColor:'teal',marginTop:8,}}
  onValueChange={(itemValue, itemIndex) =>
    this.setState({nUnits: itemValue})
  }>
       <Picker.Item label="Number of Units Required" value="" />
  <Picker.Item label="1" value="1" />
  <Picker.Item label="2" value="2" />
   <Picker.Item label="3" value="3" />
  <Picker.Item label="4" value="4" />
  <Picker.Item label="5" value="5" />
  <Picker.Item label="6" value="6" />
   <Picker.Item label="7" value="7" />
  <Picker.Item label="8" value="8" />
</Picker>
            </Item>


                     <Item  >
              <Picker
  selectedValue={this.state.urgency}
  style={{height: 50, width: 290,color:'white',backgroundColor:'teal',marginTop:8,}}
  onValueChange={(itemValue, itemIndex) =>
    this.setState({urgency: itemValue})
  }>
       <Picker.Item label="Urgency" value="" />
  <Picker.Item label="1 Hour" value="1 Hour" />
  <Picker.Item label="2 Hour" value="2 Hour" />
   <Picker.Item label="3 Hour" value="3 Hour" />
  <Picker.Item label="4 Hour" value="4 Hour" />
  <Picker.Item label="5 Hour" value="5 Hour" />
  <Picker.Item label="6 Hour" value="6 Hour" />
   <Picker.Item label="8 Hour" value="7 Hour" />
  <Picker.Item label="12 Hour" value="8 Hour" />
</Picker>
            </Item>


            
            <Item>
          <Picker
            selectedValue={this.state.selectedCountry}
            style={{ height: 40, width: 290,color:'white',marginTop:8, }}
            onValueChange={(itemValue, itemIndex) =>{
                console.log(itemValue,'item Value')
                this.setState({ selectedCountry: itemValue,states:csc.getStatesOfCountry(itemValue.id) });
            }
        }>
            <Picker.Item label="Country" value="Country" />
            {this.state.countries.map((e,i)=>{
                return <Picker.Item key={i} label={e.name} value={e} />
            })}
          </Picker>
                </Item>
          
            
            <Item>
            <Picker
            selectedValue={this.state.selectedState}
            style={{ height: 40, width: 290,color:'white',marginTop:8, }}
            onValueChange={(itemValue, itemIndex) =>
                this.setState({ selectedState: itemValue, cities:csc.getCitiesOfState(itemValue.id) })
            }>
            <Picker.Item label="State" value="State" />
            {this.state.states.map((e,i)=>{
                return <Picker.Item key={i} label={e.name} value={e} />
            })}
          </Picker>
            </Item>


           <Item>

            <Picker
            selectedValue={this.state.selectedCity}
            style={{ height: 40, width: 290,color:'white',marginTop:8, }}
            onValueChange={(itemValue, itemIndex) =>
                this.setState({ selectedCity: itemValue })
            }>
            <Picker.Item label="City" value="City" />
            {this.state.cities.map((e,i)=>{
                return <Picker.Item key={i} label={e.name} value={e} />
            })}
          </Picker>
            </Item>


            <Item  >
              <Picker
  selectedValue={this.state.hospital}
  style={{height: 50, width: 290,color:'white',backgroundColor:'teal',marginTop:8,}}
  onValueChange={(itemValue, itemIndex) =>
    this.setState({hospital: itemValue})
  }>
       <Picker.Item label="Hospital" value="" />
  <Picker.Item label="JPMC" value="JPMC" />
  <Picker.Item label="NMC" value="NMC" />
   <Picker.Item label="Agha Khan" value="Agha Khan" />
  <Picker.Item label="Indus" value="Indus" />
  <Picker.Item label="Civil" value="Civil" />
  <Picker.Item label="Other" value="Other" />
</Picker>
            </Item>

            <Item  >
              <Picker
  selectedValue={this.state.blood}
  style={{height: 50, width: 290,color:'white',backgroundColor:'teal',marginTop:8,}}
  onValueChange={(itemValue, itemIndex) =>
    this.setState({blood: itemValue})
  }>
       <Picker.Item label="Relation with patient" value="" />
  <Picker.Item label="Father" value="Father" />
  <Picker.Item label="Mother" value="Mother" />
   <Picker.Item label="Friend" value="Friend" />
  <Picker.Item label="Cousin" value="Cousin" />
  <Picker.Item label="Other" value="Other" />
</Picker>
            </Item>

           
            <Item floatingLabel>
              <Label style={styles.label}>Contact Number</Label>
              <Input maxLength={11} onChangeText={(text)=>this.setState({contact:text})} keyboardType='numeric' onChangeText={(text)=>this.setState({email:text})} />
            </Item>

            <Textarea onChangeText={(text)=>this.setState({detail:text})} rowSpan={5} style={{marginTop:10}} bordered placeholder="Additional detail" />

            <TouchableOpacity  onPress={()=>this.addPost()} style={styles.button}>
                <Text style={styles.bText}>Submit</Text>
            </TouchableOpacity>

           
          </Form>

            </ScrollView>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'teal',
        
    },
    form:{
        marginLeft:5,
        marginRight:5,
        maxWidth:350,
        alignSelf:'center',
        minWidth:300,
        flex:1,
        paddingBottom:30,
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
        fontSize:18,
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

export default connect(mapStateToProps, mapDispatchToProps)(AddRequest);