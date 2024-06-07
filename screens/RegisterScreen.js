import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Pressable,
    Image,
    KeyboardAvoidingView,
    TextInput,
    Alert,
  } from "react-native";
  import React, { useState } from "react";
  import { MaterialIcons } from "@expo/vector-icons";
  import { AntDesign } from "@expo/vector-icons";
  import { Ionicons } from "@expo/vector-icons";
  import { useNavigation } from "@react-navigation/native";
  import axios from "axios";
  import { getIpAddress } from '../IpAddressUtils';

  
  const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigation = useNavigation();
    const ipAddress = getIpAddress(); // Get the IP address
    const handleRegister = async () => {
      const user = {
        name: name,
        email: email,
        password: password,
      };
      console.log(user);
      // send a POST  request to the backend API to register the user
      axios
        .post("http://${ipAddress}:8000/register", user)
        .then((response) => {
          console.log(response);
          Alert.alert(
            "Registration successful",
            "You have been registered Successfully"
          );
          setName("");
          setEmail("");
          setPassword("");
        })
        .catch((error) => {
          Alert.alert(
            "Registration Error",
            "An error occurred while registering"
          );
          console.log("registration failed", error);
        });
    };
  
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
      >
        {/* <Text>LoginScreen</Text> */}
        <View>
          <Image
            style={{ width: 300, height: 170 }}
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj0IU2sjKXwBONkiU_-d4iAx14GLgZp5Mm7w&s,size=(826,465)",
            }}
          />
        </View>
        <KeyboardAvoidingView>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                marginTop: 12,
                color: "#041E42",
              }}
            >
              Register to your Account
            </Text>
          </View>
  
          <View>
            <View style={{ marginTop: 35 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  backgroundColor: "#D0D0D0",
                  padding: 7,
                  borderRadius: 5,
                  marginTop: 30,
                }}
              >
                <Ionicons
                  style={{ marginLeft: 8 }}
                  name="person"
                  size={24}
                  color="gray"
                />
                <TextInput
                  value={name}
                  onChangeText={(text) => setName(text)}
                  style={{
                    color: "gray",
                    marginVertical: 10,
                    width: 300,
                    fontSize: name ? 16 : 16,
                  }}
                  placeholder="Enter Your Name"
                />
              </View>
            </View>
          </View>
  
          <View>
            <View style={{ marginTop: 0 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  backgroundColor: "#D0D0D0",
                  padding: 7,
                  borderRadius: 5,
                  marginTop: 30,
                }}
              >
                <MaterialIcons
                  style={{ marginLeft: 8 }}
                  name="email"
                  size={24}
                  color="gray"
                />
                <TextInput
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  style={{
                    color: "gray",
                    marginVertical: 10,
                    width: 300,
                    fontSize: email ? 16 : 16,
                  }}
                  placeholder="Enter Your Email"
                />
              </View>
            </View>
          </View>
  
          <View style={{ marginTop: 0 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#D0D0D0",
                padding: 7,
                borderRadius: 5,
                marginTop: 30,
              }}
            >
              <AntDesign
                style={{ marginLeft: 8 }}
                name="lock1"
                size={24}
                color="gray"
              />
              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: password ? 16 : 16,
                }}
                placeholder="Enter Your Password"
              />
            </View>
          </View>
  
          <View
            style={{
              marginTop: 12,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text>Keep me logged in</Text>
  
            <Text
              style={{
                color: "#007FFF",
                fontWeight: 500,
              }}
            >
              Forgot Password
            </Text>
          </View>
          <View
            style={{
              marginTop: 80,
            }}
          />
          <Pressable
            onPress={handleRegister}
            style={{
              width: 200,
              backgroundColor: "#FEBE10",
              marginLeft: "auto",
              marginRight: "auto",
              padding: 15,
              borderRadius: 6,
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
              Register
            </Text>
          </Pressable>
  
          <Pressable
            onPress={() => navigation.goBack()}
            style={{ marginTop: 12 }}
          >
            <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
              {" "}
              Already have an account? Sign In
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };
  
  export default RegisterScreen;
  
  const styles = StyleSheet.create({});
  