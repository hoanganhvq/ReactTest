import { Image, SafeAreaView, StyleSheet, Text, ActivityIndicator, TextInput, Platform, TouchableOpacity, View, ImageBackground, KeyboardAvoidingView, Alert } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Fontisto from '@expo/vector-icons/Fontisto';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from "../config/firebase";
import LoginImage from "../assets/Login.png";
import background from '../assets/back_ground2.png';
import color from "../assets/color.json"
import { useState } from 'react';
const SignUp = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [isValid, setIsValid] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");


    const validateEmail = (text) => {
        setEmail(text);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValid(emailRegex.test(text));
    };

    const onHandleSignUp = async () => {
        if (!email || !password || !phone || !name) {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin!");
            return;
        }
        if (!isValid) {
            Alert.alert("Lỗi", "Email không hợp lệ");
            return;
        }
        if (password.length < 6) {
            Alert.alert("Lỗi", "Mật khẩu phải có ít nhất 6 ký tự!");
            return;
        }
        try {
            setIsLoading(true);
            const response = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, 'users', response.user.uid), {
                email: email,
                phone: phone,
                name:name,
            });
            setIsLoading(false);
            Alert.alert("Đăng ký thành công!");
            navigation.goBack();
        } catch (error) {
            console.log("Error ", error.message);
            setIsValid(false);
            setMessage("Tài khoản đã được đăng kí");
            setIsLoading(false);
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ImageBackground source={background} style={styles.background}>
                <View style={styles.header}>
                    <Text style={styles.title}>Đăng ký</Text>
                </View>
                {!isValid ? <Text style={{ color: 'red', marginBottom: 10 }}>{message}</Text> : null}
                <View style={styles.inputContainer}>

                    <View style={styles.input}>
                        <Feather name="user" size={20} color="#aaa" />
                        <TextInput
                            style={styles.inputField}
                            placeholder="Họ và tên"
                            placeholderTextColor="#aaa"
                            keyboardType="default"
                            onChangeText={(text) => setName(text)}
                        />
                    </View>
                    <View style={styles.input}>
                        <Fontisto name="email" size={24} color="#aaa" />
                        <TextInput
                            style={styles.inputField}
                            placeholder="Email"
                            placeholderTextColor="#aaa"
                            keyboardType="email-address"
                            onChangeText={(text) => {
                                validateEmail(text)
                            }}
                        />
                    </View>

                    <View style={styles.input}>
                        <Feather name="phone" size={24} color="#aaa" />
                        <TextInput
                            style={styles.inputField}
                            placeholder="Số điện thoại"
                            placeholderTextColor="#aaa"
                            keyboardType="phone-pad"
                            onChangeText={(text) => setPhone(text)}
                        />
                    </View>

                    <View style={styles.input}>
                        <Feather name="lock" size={20} color="#aaa" />
                        <TextInput
                            style={styles.inputField}
                            placeholder="Mật khẩu"
                            placeholderTextColor="#aaa"
                            secureTextEntry
                            onChangeText={(text) => setPassword(text)}
                        />
                    </View>
                </View>

                {isLoading ? (
                    <ActivityIndicator size="large" color="#006BFF" />
                ) : (<TouchableOpacity style={styles.button} onPress={() => { onHandleSignUp() }}>
                    <Text style={styles.buttonText}>Đăng ký</Text>
                </TouchableOpacity>)}

                <View style={styles.haveAccountContainer}>
                    <Text style={styles.haveAccountText}>Bạn đã có tài khoản?</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.signInLink}>Đăng nhập</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>

    );
};

export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        resizeMode: 'repeat',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        marginBottom: 270,
        alignItems: 'center',
        justifyContent: 'center',
        top: 40,
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#fff',
    },
    inputContainer: {
        width: '90%',
        marginBottom: 20,
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    inputField: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        marginLeft: 10,
    },
    button: {
        width: '80%',
        backgroundColor: color.button,
        paddingVertical: 12,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 3,
        marginBottom: 20
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "white",
    },
    haveAccountContainer: {
        flexDirection: "row",
        marginBottom: 20
    },
    haveAccountText: {
        fontSize: 16,

    },
    signInLink: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#006BFF',
        marginLeft: 5,
        textDecorationLine: 'underline'
    }

});
