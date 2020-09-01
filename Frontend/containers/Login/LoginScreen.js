// Login Screen.js
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Recaptcha from "react-grecaptcha";

import { connect } from "react-redux";
import styles from "./LoginScreenStyle";
import { auth1 } from "../../store/user";
import { me } from "../../store/user";
import { getAllInterests } from "../../store/interest";
import { ApplicationStyles, Helpers, Metrics, Fonts } from "../../themes";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";

const IOS_CLIENT_ID =
  "723742203171-lvu807oei4vau5kbp3cisp8b8gb0lnmb.apps.googleusercontent.com";
console.disableYellowBox = true;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }
  handleLogin = async () => {
    if (this.state.email.length && this.state.password.length) {
      await this.props.auth1(this.state.email, this.state.password);
      await this.props.me();
      await this.props.getAllInterests(this.props.user.id);
      this.props.navigation.navigate("RECOMMENDEDEVENTS");
    }
  };

  handleSignup = () => {
    this.props.navigation.navigate("SIGNUP");
  };

  logInFb = async () => {
    if (this.state.email.length && this.state.password.length) {
      try {
        await Facebook.initializeAsync("1194639730905892");
        const {
          type,
          token,
          expires,
          permissions,
          declinedPermissions,
        } = await Facebook.logInWithReadPermissionsAsync({
          permissions: ["public_profile"],
        });
        if (type === "success") {
          // Get the user's name using Facebook's Graph API
          const response = await fetch(
            `https://graph.facebook.com/me?access_token=${token}`
          );
          alert("Logged in!", `Hi ${(await response.json()).name}!`);
        } else {
          // type === 'cancel'
        }
      } catch ({ message }) {
        alert(`Facebook Login Error: ${message}`);
      }
    }
  };

  signInWithGoogle = async () => {
    if (this.state.email.length && this.state.password.length) {
      try {
        const result = await Google.logInAsync({
          iosClientId: IOS_CLIENT_ID,
          scopes: ["profile", "email"],
        });
        if (result.type === "success") {
          return result.accessToken;
        } else {
          return { cancelled: true };
        }
      } catch (e) {
        return { error: true };
      }
    }
  };
  verifyCallback = (response) => console.log(response);
  expiredCallback = () => {
    console.log("hi");
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.background}>
          {this.state.email.length === 0 && (
            <Text style={{ color: "red" }}>Email is Required</Text>
          )}
          <TextInput
            style={{
              ...Fonts.normal,
              height: 50,
              backgroundColor: "rgb(235, 233, 233)",
              borderBottomWidth: 0.5,
              borderBottomColor: "rgba(38,153,251,1)",
              marginHorizontal: 40,
              marginBottom: 40,
              color: "rgba(38,153,251,1)",
              paddingHorizontal: 10,
            }}
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
            ref={(input) => {
              this.textInput = input;
            }}
            returnKeyType="go"
            placeholder="Email Address"
            placeholderTextColor="rgba(38,153,251,1)"
            keyboardType="email-address"
          />
          {this.state.password.length === 0 && (
            <Text style={{ color: "red" }}>Password is Required</Text>
          )}
          <TextInput
            style={{
              ...Fonts.normal,
              height: 50,
              backgroundColor: "rgb(235, 233, 233)",
              borderBottomWidth: 0.5,
              borderBottomColor: "rgba(38,153,251,1)",
              marginHorizontal: 40,
              marginBottom: 40,
              color: "rgba(38,153,251,1)",
              paddingHorizontal: 10,
            }}
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            ref={(input) => {
              this.textInput = input;
            }}
            returnKeyType="go"
            placeholder="Enter Password"
            placeholderTextColor="rgba(38,153,251,1)"
            secureTextEntry
          />
          <View style={styles.button}>
            <Button
              onPress={this.handleLogin}
              color="white"
              style={{ ...Fonts.normal, textAlign: "center" }}
              title="CONTINUE"
            >
              CONTINUE
            </Button>
          </View>
          <View style={styles.containerFb}>
            <TouchableOpacity style={styles.loginBtn} onPress={this.logInFb}>
              <Text
                style={{
                  position: "relative",
                  top: "20%",
                  color: "#fff",
                  fontSize: 16,
                }}
              >
                Login with Facebook
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.containerG}>
            <TouchableOpacity
              style={styles.loginBtn2}
              onPress={() => this.signInWithGoogle()}
            >
              <Text
                style={{
                  position: "relative",
                  top: "20%",
                  color: "red",
                  fontSize: 16,
                }}
              >
                Login with Google
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.account}>
            <Button
              color="rgba(38,153,251,1)"
              style={{ ...Fonts.small }}
              title="Don't have an account?"
            />
          </View>
          <View style={styles.login}>
            <Button
              color="rgba(38,153,251,1)"
              style={{ ...Fonts.small }}
              title="SIGN UP"
              onPress={this.handleSignup}
            />
          </View>
        </View>
      </View>
    );
  }
}
const mapToState = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  auth1: (email, password) => dispatch(auth1(email, password)),
  me: () => dispatch(me()),
  getAllInterests: (userId) => dispatch(getAllInterests(userId)),
});

export default connect(mapToState, mapDispatchToProps)(Login);
