import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { db } from "../config/firebase";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { SafeAreaView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
const HomeScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogOut = async ()=>{
    try{
        await signOut(auth);
        console.log("User signed out!");
        navigation.navigate("SignIn"); 
    }catch (error){ 
        console.log("Error signing out: ", error);
    }
  }

  const fetchData = async () => {
    try {
      const query = await getDocs(collection(db, "users"));
      const items = [];
      query.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() }); 
      });
      setData(items);
    } catch (error) {
      console.error("Error getting documents: ", error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={()=>{navigation.navigate("UserScreen",{id: item.id})}}>
      <Text style={styles.itemTitle}>{item.name || "Unknown Name"}</Text>
      <Text style={styles.itemSubtitle}>{item.email || "No Email"}</Text>
      <Text style= {styles.itemSubtitle}>{item.phone || "No Phone"} </Text>
    </TouchableOpacity>
  );
  useFocusEffect(
    React.useCallback(() => {fetchData()
    }));



  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#006BFF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Home Screen</Text>
      </View>
      {data.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No data available</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          style={styles.list}
        />
      )}


<TouchableOpacity style={styles.addButton} onPress={()=>{navigation.navigate("Add User")}}>
        <Text style={styles.addUserText}>Add User</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.logOutButton} onPress={()=>{handleLogOut()}}>
        <Text style = {styles.logOutText}>Log out</Text>
      </TouchableOpacity>

     
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 20,
    backgroundColor: "#006BFF",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  item: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  itemSubtitle: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
  },
  list: {
    paddingBottom: 20,
  },
  logOutButton:{
    
    backgroundColor:"red",
    paddingHorizontal:10,
    paddingVertical:10,
    borderRadius:8,
    justifyContent:"center",
    alignItems:"center",
    width:200,
    alignSelf:"center",

  },
  logOutText:{
    fontSize:20,
    fontWeight:"bold",
    color:"white"
  },
  addButton:{
    marginBottom: 40,
    backgroundColor:"#006BFF",
    paddingHorizontal:10,
    paddingVertical:10,
    borderRadius:8,
    justifyContent:"center",
    alignItems:"center",
    width:200,
    alignSelf:"center",
    marginTop: 20,
    marginBottom: 20,
  },
  addUserText:{
    fontSize:20,
    fontWeight:"bold",
    color:"white"
  }
});
