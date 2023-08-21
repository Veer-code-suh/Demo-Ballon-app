import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BalloonPage = () => {
  const [animation] = useState(new Animated.Value(0));

  const [userData, setUserData] = useState({ name: "", email: "" });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const savedName = await AsyncStorage.getItem("name");
        const savedEmail = await AsyncStorage.getItem("email");

        setUserData({ name: savedName, email: savedEmail });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const inflateBalloon = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const balloonHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "60%"],
  });

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={styles.name}> {userData.name}</Text>
      <Text style={styles.email}> {userData.email}</Text>
      <Animated.View
        style={{
          width: "95%",
          borderTopRightRadius: 300,
          borderTopLeftRadius: 300,
          borderBottomRightRadius: 300,
          borderBottomLeftRadius: 300,
          height: balloonHeight,
          backgroundColor: "orange",
        }}
      />
      <TouchableOpacity style={styles.btn} onPress={inflateBalloon}>
        <Text style={styles.btntxt}>Inflate Balloon</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BalloonPage;

const styles = StyleSheet.create({
  btn: {
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 8,
    color: "white",
    marginTop: 40,
  },
  btntxt: {
    fontSize: 20,
    fontWeight: "500",
    color: "white",
  },
  name: {
    fontSize: 15,
    fontWeight: "800",
  },
  email: {
    height: 27,
    fontSize: 14,
    fontWeight: "500",
  },
});
