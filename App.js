import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert} from 'react-native';
import { theme } from './color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function App() {
  useEffect(() => {loadToDos();}, []);

  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const [edit, setEdit] = useState(false);
  const [newText, setNewText] = useState('');


  const STORAGE_KEY = '@toDos';
   
  const travel = () => setWorking(false);
  const work = () => setWorking(true);

  const onChangeText = (payload) => setText(payload);

  const saveToDos = async (value) => {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue)
  };

  const loadToDos = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY)
      setToDos(JSON.parse(jsonValue));
    } catch (e) {console.log("err")}
  };

  const addToDo = async () => {
    if(text === "") {
      return
    }
    const newToDos = Object.assign({}, toDos, {[Date.now()] : {text, work:working, isdone:false, editMode:false}}); //target, source 순 key는 현재시간
    //const newToDos = {...toDos, {[Date.now()] : {text, work:working}}}; 
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  }

  const deleteToDo = (key) => {
    Alert.alert("Delete", "Do you wanna delete?",
    [
      {text : "NO"},
      {
        text : "DELETE",
        style : 'destructive',
        onPress : () => {
          const newToDos = {...toDos};
          delete newToDos[key];
          setToDos(newToDos);
          saveToDos(newToDos);
        },
      },
    ])
  }

  const doneToDo = (key) => {
    const newToDos = {...toDos};
  
    if(newToDos[key].isdone == false) {
      newToDos[key].isdone = true
    } else {
      newToDos[key].isdone = false
    };
  
    setToDos(newToDos);
    saveToDos(newToDos);
  }

  const editToDo = async(key) => {
    const newToDos = {...toDos};

    if(newToDos[key].editMode == false) {
      newToDos[key].editMode = true
    } else {
      newToDos[key].editMode = false
    }

    Alert.prompt('Edit Mode', 'Enter the change ', editText); 
  }

  const editText = (e) => {
    const newToDos = {...toDos};
    console.log(newToDos);
  
  }


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
        <Text style={{...styles.btnText, color: working ? theme.white : theme.grey}}>Work</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={travel}>
        <Text style={{...styles.btnText, color : working ? theme.grey : theme.white}}>Travel</Text>
        </TouchableOpacity>
      </View>

      <TextInput 
      placeholder={working ? "Add Todo" : "Plan the Travel !!"} 
      onSubmitEditing = {addToDo}
      onChangeText={onChangeText} 
      returnKeyType = "done"
      value ={text}
      style={styles.input}
      />

      <ScrollView>
        {Object.keys(toDos).map((key) =>
        toDos[key].work === working ? (
        <View key={key} style={styles.toDo}>
          <View style={styles.check}>

          <TouchableOpacity onPress={() => doneToDo(key)}> 
          <Text style={{marginRight:5}}> <Ionicons name="md-checkmark-circle" size={20} style={{color : toDos[key].isdone === true ? "#666666" : "white"}} /> </Text>
          </TouchableOpacity>
          <Text style={{
            ...styles.toDoText, 
            color : toDos[key].isdone == true ? "#666666" : "white", 
            textDecorationLine :  toDos[key].isdone == true ? 'line-through' : null,
            textDecorationColor : '#999999'
            }}>
              {toDos[key].text}
          </Text>
          
          </View>
        

          <View style={styles.editWithtrash}>
            <TouchableOpacity onPress={() => editToDo(key)}>
            <Text style={{marginRight:7, marginTop:2, color : toDos[key].isdone == true ? "#666666" : "white"}}> <MaterialIcons name="edit" size={20} /> </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => deleteToDo(key)}>
              <Text style={{color : toDos[key].isdone == true ? "#666666" : "white"}}> <FontAwesome5 name="trash" size={15} /> </Text>
              </TouchableOpacity>
          </View>
        </View>) : null
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal : 20,
  },

  header : {
    justifyContent : 'space-between', //양쪽 정렬
    flexDirection : 'row',
    marginTop : 100,
  },

  btnText : {
    fontSize : 38,
    fontWeight : "600",
    color : 'white'
  },

  input : {
    marginVertical: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius : 30,
    backgroundColor : theme.white,
    fontSize : 17,
  },

  check : {
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-evenly'
  },

  toDo : {
    backgroundColor : theme.grey,
    marginBottom : 10,
    paddingVertical : 18,
    paddingHorizontal : 20,
    borderRadius : 15,
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems : 'center',
  },

  toDoText : {
    color : theme.white,
    fontSize : 16,
    fontWeight : "500"
  },

  editWithtrash : {
    flexDirection : 'row',
    alignItems : 'center'
  }
});
