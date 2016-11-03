/**
 * login screen
 */
import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  StatusBar,
  StyleSheet
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'
import * as Animatable from 'react-native-animatable'
import { getColor } from '../components/config'
import { signedIn } from '../actions'
import HomeScreen from './home_screen'
import Background from '../components/background'
import LogoCircle from '../components/login_screen/logo_circle'
import InitialView from '../components/login_screen/initial_view'
import SignInForm from '../components/login_screen/signIn_form'
import SignUpForm from '../components/login_screen/signUp_form'
import ForgotPassForm from '../components/login_screen/forgotPassword_form'

class LoginScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      initialRun: true,
      initialScreen: true,
      signIn: false,
      signUp: false,
      forgotPass: false
    }

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }
  }

  componentDidMount() {
    this.setState({initialRun: false})
  }

  componentDidUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
  }

  render() {
    const animationDelay = this.state.initialRun ? 500 : 0

    const initialView = this.state.initialScreen ?
      <InitialView
      onSignIn={this._onSignIn}
      onSignUp={this._onSignUp}
      animDelay={animationDelay}/>
    : null

    const signIn = this.state.signIn ?
      <SignInForm
      goToHomeScreen={this._onSignInSuccess}
      onBackFromSignIn={this._onBackFromSignIn}
      onForgotPass = {this._onForgotPass} />
    : null

    const signUp = this.state.signUp ?
      <SignUpForm
      goToHomeScreen={this._onSignInSuccess}
      onBackFromSignUp={this._onBackFromSignUp} />
    : null

    const fogotPass = this.state.forgotPass ?
      <ForgotPassForm
      onBackFromForgotPass={this._onBackFromForgotPass} />
    : null

    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={getColor('googleBlue700')}
          barStyle='light-content'
          animated={true}
        />

        <Background imgSrouce={require('../assets/images/surface-of-ocean-7.jpeg')}/>

        <Animatable.View
        animation="bounceInDown"
        style={styles.logoContainer}
        delay={animationDelay}>
          <TouchableOpacity onPress={this._onLogoClicked}>
            <LogoCircle />
          </TouchableOpacity>
        </Animatable.View>
        <KeyboardAwareScrollView>
          { initialView }
          { signIn }
          { signUp }
          { fogotPass }
        </KeyboardAwareScrollView>
      </View>
    )
  }

  _onLogoClicked = () => {
    this.setState({
      initialScreen: true,
      signIn: false,
      signUp: false,
      forgotPass: false
    })
  }

  _onSignIn = () => {
    this.setState({
      initialScreen: false,
      signIn: true
    })
  }

  _onBackFromSignIn = () => {
    this.setState({
      initialScreen: true,
      signIn: false
    })
  }

  _onSignUp = () => {
    this.setState({
      initialScreen: false,
      signUp: true
    })
  }

  _onBackFromSignUp = () => {
    this.setState({
      initialScreen: true,
      signUp: false
    })
  }

  _onForgotPass = () => {
    this.setState({
      initialScreen: false,
      signIn: false,
      signUp: false,
      forgotPass: true
    })
  }

  _onBackFromForgotPass = () => {
    this.setState({
      initialScreen: true,
      forgotPass: false
    })
  }

  _onSignInSuccess = (name, email, uid) => {
    this.props.signedIn(name, email, uid)
    //this.props.navigator.push({ view: HomeScreen })
    this.props.navigator.resetTo({ view: HomeScreen })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch'
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 260,
  }
})

export default connect(null,{signedIn})(LoginScreen)
