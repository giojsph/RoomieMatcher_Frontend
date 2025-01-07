import React from "react";
import { StyleSheet, Text, SafeAreaView, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";

const Startup = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../assets/RoomieMatcher_Logo.png")}
      />
      <Text style={styles.appName}>Roomie Matcher</Text>
      <Pressable
        onPress={() => router.replace("/login")}
        style={styles.startButton}
      >
        <Text style={styles.startButtonText}>Start Now</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Startup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 150,
    height: 100,
    resizeMode: "contain",
  },
  appName: {
    marginTop: 20,
    fontSize: 35,
    fontWeight: "bold",
    color: "#7ec6e4",
    textShadowColor: "#a7abad",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  startButton: {
    marginTop: 30,
    backgroundColor: "#87CEEB",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});
