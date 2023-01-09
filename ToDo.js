import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';

export default function ToDo() {
  let [txt, setTxt] = useState('');
  let [notes, setNotes] = useState([]);
  let [isEditing, setIsEditing] = useState(false);
  let [currentIndex, setCurrentIndex] = useState();

  const addNote = () => {
    if (txt) {
      setNotes([...notes, txt]);
      setTxt('');
    } else {
      alert('Enter some text');
    }
  };

  const del = index => {
    notes.splice(index, 1);
    setNotes([...notes]);
  };

  const delAll = () => {
    notes.length = 0;
    setNotes([...notes]);
  };

  const edit = index => {
    setIsEditing(true);
    setCurrentIndex(index);
    setTxt(notes[index]);
  };

  const saveChanges = () => {
    if (txt) {
      notes[currentIndex] = txt;
      setNotes([...notes]);
      setTxt('');
      setIsEditing(false);
    } else {
      alert('Enter some text');
    }
  };

  return (
    <View>
      <Text style={styles.heading}>To Do App</Text>

      <View style={{margin: 20}}>
        <View style={styles.flexDbba}>
          <TextInput
            value={txt}
            onChangeText={val => setTxt(val)}
            style={styles.inputField}
          />
          <Button
            onPress={isEditing ? saveChanges : addNote}
            title={isEditing ? ' Save ' : ' Add '}
            color="cornflowerblue"
          />
        </View>

        {notes.length > 0 ? (
          notes.map((e, i) => {
            return (
              <View key={i} style={styles.parent}>
                <Text key={i} style={styles.noteText}>
                  {e}
                </Text>

                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() => edit(i)}
                    style={styles.customBtn}>
                    <Text style={styles.edit}>Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => del(i)}
                    style={styles.customBtn}>
                    <Text style={styles.delete}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        ) : (
          <Text style={styles.notToDo}>Nothing To Do</Text>
        )}

        {notes.length > 0 && (
          <TouchableOpacity
            onPress={delAll}
            style={[styles.customBtn, styles.deleteAll]}>
            <Text style={styles.delete}>Delete All</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    backgroundColor: 'cornflowerblue',
    fontSize: 30,
    padding: 10,
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
  },
  inputField: {
    borderWidth: 1,
    borderColor: 'cornflowerblue',
    paddingHorizontal: 20,
    paddingVertical: 5,
    flex: 3,
  },
  flexDbba: {
    flexDirection: 'row',
    marginVertical: 50,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'cornflowerblue',
  },
  Btn: {
    flex: 1,
  },

  parent: {flexDirection: 'row', marginVertical: 10},

  noteText: {
    backgroundColor: 'black',
    color: 'white',
    padding: 10,
    flex: 4,
    marginRight: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },

  customBtn: {marginRight: 10, borderRadius: 12, overflow: 'hidden'},

  edit: {color: 'white', backgroundColor: 'purple', padding: 10},

  delete: {color: 'white', backgroundColor: 'red', padding: 10},

  notToDo: {textAlign: 'center', fontSize: 30, color: 'red'},

  deleteAll: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
});
