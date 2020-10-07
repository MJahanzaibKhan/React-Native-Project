import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createStackNavigator } from 'react-navigation-stack'
import * as Routes from '../screens/index'

const Auth = createStackNavigator({
    SignIn:Routes.SignIn,
    SignUp:Routes.SignUp,
},{
    headerMode:'none'
})

const Home = createStackNavigator({
 Home:Routes.Home,
 Detail:Routes.DetailScreen
})

const Blood_Request = createStackNavigator({
    Blood_Request : Routes.AddRequest
})
const MyPosts = createStackNavigator({
    MyPosts:Routes.MyPosts,
    MyPostDetail:Routes.MyPostDetail
})

const drawer = createDrawerNavigator(
    {
        MyPosts:{screen:MyPosts},
        Home:{screen:Home},
        SignUp:{screen:Auth},
        PostR:{screen:Blood_Request},
},
{
    initialRouteName:'',
    contentComponent:Routes.Drawer,
    drawerPosition:'left'
}
)

const AppContainer =  createAppContainer(drawer)

export default class Nav extends React.Component{
    render(){
        return<AppContainer/>
    }
}