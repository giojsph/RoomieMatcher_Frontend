import { StyleSheet, Text, View, ScrollView, SafeAreaView, Image, KeyboardAvoidingView, TextInput, Pressable } from 'react-native'; 
import React, { useState, useEffect } from "react";
import { useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonColor, setButtonColor] = useState("#87CEEB");
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("auth");
        if (token) {
          router.replace("/(tabs)/profile");
        }
      } catch (error) {
        console.log("Error", error);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    try {
      const user = { email, password };
      const response = await axios.post("https://roomiematcherbackend-production.up.railway.app/login", user);

      if (response.data?.token) {
        await AsyncStorage.setItem("auth", response.data.token);
        router.replace("/(authenticate)/select");
      } else {
        console.log("Login failed: Invalid response");
      }
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  const handlePressIn = () => {
    setButtonColor("#53a8cb"); 
  };

  const handlePressOut = () => {
    setButtonColor("#87CEEB");  
  };


  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        style={{
          width: 150,
          height: 80,
          resizeMode: "contain",
        }}
        source={require('../../assets/RoomieMatcher_Logo.png')}
      />

      <Text
        style={{
          marginTop: 20,
          textAlign: "center",
          fontSize: 25,
          color: '#7ec6e4',
          fontWeight: "bold",
          textShadowColor: '#a7abad',
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 3,
        }}
      >
        Roomie Matcher
      </Text>

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 700,
              marginTop: 50,
              color: "#3A7CA5",
            }}
          >
            Log in to your Account
          </Text>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
        </View>

        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#87CEEB",
              paddingVertical: 5,
              borderRadius: 10,
            }}
          >
            <MaterialIcons style={{ marginLeft: 8 }} name="email" size={24} color="white" />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Enter your email"
              placeholderTextColor={"white"}
              style={{
                color: "white",
                marginVertical: 10,
                width: 300,
                fontSize: 17,
              }}
            />
          </View>

          <View style={{ marginTop: 20 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#87CEEB",
                paddingVertical: 5,
                borderRadius: 10,
              }}
            >
              <AntDesign style={{ marginLeft: 7 }} name="lock" size={24} color="white" />
              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                placeholder="Enter your password"
                placeholderTextColor={"white"}
                style={{
                  color: "white",
                  marginVertical: 10,
                  width: 300,
                  fontSize: 17,
                }}
              />
            </View>
          </View>

          <View style={{ fontSize: 10, marginTop: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text>Keep me logged in</Text>
            <Text style={{ color: "#3A7CA5" }}>Forgot Password</Text>
          </View>

          <View style={{ marginTop: 35 }} />

          <Pressable
            onPressIn={handlePressIn} 
            onPressOut={handlePressOut}
            onPress={() => {
              console.log("Login button pressed!");
              handleLogin();
            }}
            style={{
              width: 200,
              backgroundColor: buttonColor,
              borderRadius: 10,
              marginLeft: "auto",
              marginRight: "auto",
              padding: 15,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Login
            </Text>
          </Pressable>

          <Pressable onPress={() => router.replace("/register")} style={{ marginTop: 12 }}>
            <Text
              style={{
                textAlign: "center",
                color: "gray",
                fontSize: 16,
              }}
            >
              Don't have an account? Sign Up
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
