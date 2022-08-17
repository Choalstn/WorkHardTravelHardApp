import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { theme } from './color';

export default function App() {
  const [working, setWorking] = useState(true);
  const travel = () => setWorking(false);
  const work = () => setWorking(true);

  const color = {
    work : ""
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
  }
});
