import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../UserContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { getIpAddress } from "../IpAddressUtils";

const AddressScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const ipAddress = getIpAddress(); // Get the IP address
  const { userId, setUserId } = useContext(UserType);
  const [mobileError, setMobileError] = useState("");
  const [pincodeError, setPincodeError] = useState("");

  const validateMobileNo = (number) => {
    if (number.length === 0) {
      setMobileError("");
    } else if (!/^\d{10}$/.test(number)) {
      setMobileError("Invalid input, please enter 10 digits");
    } else {
      setMobileError("");
    }
  };

  const validatePincode = (code) => {
    if (code.length === 0) {
      setPincodeError("");
    } else if (!/^\d{5}$/.test(code)) {
      setPincodeError("Invalid input, please enter 5 digits");
    } else {
      setPincodeError("");
    }
  };

  const handleAddAddress = async () => {
    if (mobileError || pincodeError) {
      Alert.alert("Error", "Please correct the errors before submitting.");
      return;
    }

    const address = {
      name,
      mobileNo,
      houseNo,
      street,
      landmark,
      postalCode,
    };

    const token = await AsyncStorage.getItem("authToken");

    axios
      .post(`http://${ipAddress}:8000/addresses`, { token, address })
      .then((response) => {
        Alert.alert("Success", "Address added successfully");
        setName("");
        setMobileNo("");
        setHouseNo("");
        setStreet("");
        setLandmark("");
        setPostalCode("");

        setTimeout(() => {
          navigation.goBack();
        }, 500);
      })
      .catch((error) => {
        Alert.alert("Error", "Failed to add address");
        console.log("Error:", error);
      });
  };

  return (
    <ScrollView style={{ marginTop: 50 }}>
      <View style={{ height: 50, backgroundColor: "#FFAD33" }} />

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>
          Add a new Address
        </Text>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Full name (First and last name)
          </Text>
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            placeholderTextColor={"black"}
            style={styles.input}
            placeholder="Enter your name"
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Mobile Number
          </Text>
          <TextInput
            value={mobileNo}
            onChangeText={(text) => {
              setMobileNo(text);
              validateMobileNo(text);
            }}
            placeholderTextColor={"black"}
            style={[
              styles.input,
              { borderColor: mobileError ? "red" : "#D0D0D0" },
            ]}
            placeholder="Mobile No"
            keyboardType="numeric"
          />
          {mobileError ? (
            <Text style={{ color: "red" }}>{mobileError}</Text>
          ) : null}
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Flat, House No, Building, Company
          </Text>
          <TextInput
            value={houseNo}
            onChangeText={(text) => setHouseNo(text)}
            placeholderTextColor={"black"}
            style={styles.input}
            placeholder=""
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Area, Street, Sector, Village
          </Text>
          <TextInput
            value={street}
            onChangeText={(text) => setStreet(text)}
            placeholderTextColor={"black"}
            style={styles.input}
            placeholder=""
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Landmark</Text>
          <TextInput
            value={landmark}
            onChangeText={(text) => setLandmark(text)}
            placeholderTextColor={"black"}
            style={styles.input}
            placeholder="Eg. near Apollo Hospital"
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Pincode</Text>
          <TextInput
            value={postalCode}
            onChangeText={(text) => {
              setPostalCode(text);
              validatePincode(text);
            }}
            placeholderTextColor={"black"}
            style={[
              styles.input,
              { borderColor: pincodeError ? "red" : "#D0D0D0" },
            ]}
            placeholder="Enter Pincode"
            keyboardType="numeric"
          />
          {pincodeError ? (
            <Text style={{ color: "red" }}>{pincodeError}</Text>
          ) : null}
        </View>

        <Pressable
          onPress={handleAddAddress}
          style={{
            backgroundColor: "#FFAD33",
            padding: 19,
            borderRadius: 6,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Add Address</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderColor: "#D0D0D0",
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 5,
  },
});

export default AddressScreen;