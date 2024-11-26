import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ImageBackground,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView, Platform
  } from "react-native";
  import Feather from "@expo/vector-icons/Feather";
  import { auth } from "../config/firebase";
  import { signInWithEmailAndPassword } from "firebase/auth";
  import background from "../assets/back_ground2.png";
  import React, { useState } from "react";
  
  const SignIn = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isValid, setIsValid] = useState(true);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
  
    const validateEmail = (text) => {
      setEmail(text);
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsValid(emailRegex.test(text));
    };
  
    const onHandleLogin = async () => {
      if (email === "" || password === "") {
        Alert.alert("Lỗi","Vui lòng nhập đầy đủ thông tin!");
        return;
      }
      if (!isValid) {
        Alert.alert("Lỗi","Email không hợp lệ!");
        return;
      }
  
      setIsLoading(true);
      try {
        await signInWithEmailAndPassword(auth, email, password);
        Alert.alert("Đăng nhập thành công!");
        navigation.navigate("HomeScreen");
        setIsLoading(false);
      } catch (error) {
        console.log("Đăng nhập thất bại: ", error.message);
        setIsValid(false);
        setMessage("Email hoặc mật khẩu không đúng");
        setIsLoading(false);
      }
    };
  
    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
        <ImageBackground source={background} style={styles.background}>
          <View style={styles.header}>
            <Text style={styles.title}>Đăng nhập</Text>
          </View>
          <View style={styles.inputContainer}>
            {!isValid && <Text style={styles.errorText}>{message}</Text>}
            <View style={styles.input}>
              <Feather name="user" size={20} color="#aaa" />
              <TextInput
                style={styles.inputField}
                placeholder="Email"
                placeholderTextColor="#aaa"
                keyboardType="email-address"
                onChangeText={validateEmail}
              />
            </View>
  
            <View style={styles.input}>
              <Feather name="lock" size={20} color="#aaa" />
              <TextInput
                style={styles.inputField}
                placeholder="Mật khẩu"
                placeholderTextColor="#aaa"
                secureTextEntry
                onChangeText={(text) => {
                  setPassword(text);
                }}
              />
            </View>
          </View>
  
          {isLoading ? (
            <ActivityIndicator size="large" color="#006BFF" />
          ) : (
            <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
              <Text style={styles.buttonText}>Đăng nhập</Text>
            </TouchableOpacity>
          )}
  
          <View style={styles.haveAccountContainer}>
            <Text style={styles.haveAccountText}>Bạn chưa có tài khoản ?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.signUpLink}>Đăng ký ngay</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  };
  
  export default SignIn;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    background: {
      flex: 1,
      resizeMode: "repeat",
      justifyContent: "center",
      alignItems: "center",
    },
    header: {
      marginBottom: 230,
      alignItems: "center",
    },
    title: {
      fontSize: 50,
      fontWeight: "bold",
      color: "#fff",
    },
    inputContainer: {
      width: "90%",
      marginBottom: 20,
    },
    input: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#fff",
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 10,
      marginBottom: 25,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    inputField: {
      flex: 1,
      fontSize: 16,
      color: "#333",
      marginLeft: 10,
    },
    button: {
      width: "80%",
      backgroundColor: "#006BFF",
      paddingVertical: 12,
      borderRadius: 20,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 3,
      marginBottom: 20,
    },
    buttonText: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#fff",
    },
    haveAccountContainer: {
      flexDirection: "row",
      marginBottom: 20,
    },
    haveAccountText: {
      fontSize: 16,
    },
    signUpLink: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#006BFF",
      marginLeft: 5,
      textDecorationLine: "underline",
    },
    errorText: {
      color: "red",
      marginBottom: 10,
      textAlign: "center",
    },
  });
  