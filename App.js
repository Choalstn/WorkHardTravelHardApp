import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import { theme } from './color';

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
   
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload);
  const addToDo = () => {
    if(text === "") {
      return
    }
    const newToDos = Object.assign({}, toDos, {[Date.now()] : {text, work:working}}); //target, source 순 key는 현재시간
    //const newToDos = {...toDos, {[Date.now()] : {text, work:working}}}; 
    setToDos(newToDos);
    setText("");
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
      style={styles.input}/>

      <ScrollView>
        {Object.keys(toDos).map(key =>
        <View key={key} style={styles.toDo}>
          <Text style={styles.toDoText}>{toDos[key].text}</Text>
        </View>
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

  toDo : {
    backgroundColor : theme.grey,
    marginBottom : 10,
    paddingVertical : 20,
    paddingHorizontal : 20,
    borderRadius : 15,
  },

  toDoText : {
    color : theme.white,
    fontSize : 16,
    fontWeight : "500"
  }
});
