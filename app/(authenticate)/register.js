import { StyleSheet, Text, View, SafeAreaView, Image, Pressable, TextInput, KeyboardAvoidingView, Alert, } from 'react-native';
import React, { useState } from "react";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import axios from "axios";

const register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonColor, setButtonColor] = useState("#87CEEB"); 
  const router = useRouter();

  const handlePressIn = () => {
    setButtonColor("#53a8cb"); 
  };

  const handlePressOut = () => {
    setButtonColor("#87CEEB");  
  };

  const handleRegister = () => {
    if (!name || !email || !password) {
      Alert.alert("All fields are required", "Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Weak Password", "Password must be at least 6 characters long.");
      return;
    }

    const user = {
      name: name,
      email: email,
      password: password,
    };
    axios
    .post("https://roomiematcher-backend.onrender.com/register", user)
    .then((response) => {
      console.log(response);
      Alert.alert(
        "Registration Successful", 
        "You have been registered successfully", 
        [
          {
            text: "OK",
            onPress: () => {
              // Reset form after successful registrati
              setEmail("");
              setName("");
              setPassword("");
              router.replace("/login");  // Optionally navigate to login page
            },
          },
        ]
      );
    })
    .catch((error) => {
      console.log("Error registering user:", error.response ? error.response.data : error.message);
      const errorMsg = error.response?.data || "An error occurred during registration.";
      Alert.alert("Registration failed", errorMsg);
    });
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
            Register your Account
          </Text>
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
            <Ionicons style={{ marginLeft: 8 }} name="person-sharp" size={24} color="white" />
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              placeholder="Enter your name"
              placeholderTextColor={"white"}
              style={{
                color: "white",
                marginVertical: 10,
                width: 300,
                fontSize: 17,
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#87CEEB",
              paddingVertical: 5,
              marginTop: 20,
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

          <View style={{ marginTop: 35 }} />

          <Pressable
            onPressIn={handlePressIn}  // Change color on press start
            onPressOut={handlePressOut}  // Reset color on press end
            onPress={handleRegister}
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
                fontWeight: "bold"
              }}
            >
              Register
            </Text>
          </Pressable>
          <Pressable onPress={() => router.replace("/login")} style={{ marginTop: 12 }}>
            <Text
              style={{
                textAlign: "center",
                color: "gray",
                fontSize: 16
              }}
            >
              already have an account? Sign in
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default register;

const styles = StyleSheet.create({});
