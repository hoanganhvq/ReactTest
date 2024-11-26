import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, FlatList, TextInput, ActivityIndicator, TouchableOpacity , Alert} from 'react-native'
import { db } from '../config/firebase';
import { deleteDoc, doc, getDoc,updateDoc , collection} from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
const UserScreen = ({ navigation, route }) => {

    const { id } = route.params;
    const[name,setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const fetchUser = async () => {
        try {
            const docRef = doc(db, "users", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUser(docSnap.data());
            } else {
                console.log("No such document!");
            }
           
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    const deleteUser = async ()=>{
        try{
            const docRef = doc(db,"users", id);
           await deleteDoc(docRef);
            console.log("Document successfully deleted!");
            Alert.alert("Xóa thành công!");
            navigation.goBack();
        } catch(error){
            console.error("Error deleting document: ", error);
        }
    }

    const updateUser = async () => {
        const updatedData = {};
    
        if (name) {
            updatedData.name = name;
        }
        if (email) {
            updatedData.email = email;
        }
        if (phone) {
            updatedData.phone = phone;
        }
    
        try {
            const docRef = doc(db, "users", id); 
            if (Object.keys(updatedData).length > 0) {
                await updateDoc(docRef, updatedData);
                console.log("User updated successfully");
                Alert.alert("Cập nhật thành công ");
                navigation.goBack();
            } else {
                console.log("No fields to update");
            }
        } catch (error) {
            console.error("Error updating user: ", error);
        }
    };
    
    useEffect(() => {
        fetchUser();
        console.log("user", user);
    }, [])
    
    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#006BFF" />
            </View>
        );
    }
    return (
        <SafeAreaView style={styles.container}>
             <View style={styles.inputContainer}>
                <Text style={styles.label}>Name:</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder={user?.name} 
                    onChangeText={(text)=>setName(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email:</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder={user?.email} 
                    onChangeText={(text)=>setEmail(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Phone:</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder={user?.phone} 
                    onChangeText={(text)=>setPhone(text)}
                />
            </View>

            <TouchableOpacity style={styles.updateButton} onPress={()=>{updateUser()}}>
                <Text style={styles.updateText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={()=>{deleteUser()}}>
                <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default UserScreen;


const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f5f5f5",
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
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
    updateButton:{
        width:140,
        backgroundColor: '#006BFF',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
        alignSelf:'center', 
    },
    updateText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    deleteButton:{
        width:140,
        backgroundColor: '#FF0000',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
        alignSelf:'center',
    },
    deleteText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});