import { View, Text, StyleSheet, ScrollView, Pressable, ToastAndroid, Alert, Share, Platform } from 'react-native'
import React, { useState, useEffect } from "react";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { Ionicons } from '@expo/vector-icons';
import { getData, storeData } from '../utils/storage';
import * as Clipboard from 'expo-clipboard';
import { useNavigation } from '@react-navigation/native';
import { useGlobalContext } from '../context/context';
import NoteReminderModal from './NoteReminderModal';
import theme from '../style/theme';

const NoteOptionsActionSheet = ({ noteId, formData }) => {
  const navigation = useNavigation();
  const { notes, setNotes } = useGlobalContext();
  const [noteReminderModal, setNoteReminderModal] = useState(false);

  const note = notes.find(n => n.id === noteId);

  const noteColors = theme.NOTE_COLORS;
  const newOrEditMode = note?.reminder?.dateTime ? "edit" : "new";

  const changeNoteColor = async color => {
    try {
      const newNotesArr = notes.map(note => {
        if (note.id !== noteId) return note;
        return { ...note, color };
      })
      await storeData("notes", newNotesArr);
      setNotes(newNotesArr);
    }
    catch (err) {
      Alert.alert("Error", "Some error is there!!");
    }
  }

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(formData.text);
    ToastAndroid.show("Note's text copied", ToastAndroid.SHORT);
  }

  const shareNote = async () => {
    await Share.share({ message: formData.text });
  }

  const restoreNote = async () => {
    try {
      const trashNotes = await getData("trashNotes");
      const note = trashNotes.find(note => note.id === noteId);
      const newNotesArr = [...notes];
      await storeData("notes", newNotesArr);

      const newTrashNotesArr = trashNotes.filter(trashNote => trashNote.id !== note.id);
      await storeData("trashNotes", newTrashNotesArr);
      setNotes(newNotesArr);
    }
    catch (err) {
      Alert.alert("Error", "Some error is there!!");
    }
  }


  const moveNoteToTrash = async () => {
  try {
    const trashNotes = (await getData("trashNotes")) || [];
    const newTrashNotesArr = [...trashNotes, note];
    await storeData("trashNotes", newTrashNotesArr);

    const newNotesArr = notes.filter(n => n.id !== noteId);
    await storeData("notes", newNotesArr);
    setNotes(newNotesArr);

    // ✅ Close sheet first
    SheetManager.hide("noteOptionsActionSheet");

    // ✅ Navigate to Home
    navigation.navigate("Home");

    // ✅ Feedback
    if (Platform.OS === "android") {
      ToastAndroid.show("Note moved to trash", ToastAndroid.SHORT);
    } else {
      Alert.alert("Success", "Note moved to trash");
    }
  } catch (err) {
    Alert.alert("Error", "Some error is there!!");
  }
};

 

  const cloneNote = async () => {
    try {
      const newNote = {
        ...note,
        id: Math.floor(Math.random() * 10000),
        text: formData.text,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      const newNotesArr = [newNote, ...notes];
      await storeData("notes", newNotesArr);
      setNotes(newNotesArr);
      navigation.navigate("Home");
      ToastAndroid.show("Note cloned successfully", ToastAndroid.SHORT);
    }
    catch (err) {
      Alert.alert("Error", "Some error is there!!");
    }
  }

  const togglePin = async () => {
    try {
      const newNotesArr = notes.map(note => {
        if (note.id !== noteId) return note;
        return { ...note, isPinned: !note.isPinned };
      })
      await storeData("notes", newNotesArr);
      setNotes(newNotesArr);
    }
    catch (err) {
      Alert.alert("Error", "Some error is there!!");
    }
  }

  const showAddReminderModal = () => {
    SheetManager.hide("noteOptionsActionSheet");
    setNoteReminderModal(true);
  }
  useEffect(() => {
    if (!note) {
      // If note doesn't exist, navigate away
      navigation.navigate("Home");
    }
  }, [note, navigation]);

  if (!note) {
    // Render a safe placeholder instead of null to avoid crash
    return <View style={{ height: 1, backgroundColor: "transparent" }} />;
  }


  return (
    <>
      <ActionSheet containerStyle={{ padding: 0 }} id="noteOptionsActionSheet" useBottomSafeAreaPadding={false} defaultOverlayOpacity={0.1} openAnimationConfig={{ friction: 20, tension: 250 }} gestureEnabled indicatorStyle={{ height: 5 }}>
        <View>

          {/* Colors */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ 
              paddingVertical: theme.SPACING.LG, 
              paddingHorizontal: theme.SPACING.MD 
            }}
          >
            <Pressable 
              onPress={() => changeNoteColor(null)} 
              style={{ 
                marginHorizontal: theme.SPACING.SM, 
                borderRadius: theme.RADIUS.FULL, 
                width: 44, 
                height: 44, 
                backgroundColor: theme.BACKGROUND_PRIMARY, 
                justifyContent: "center", 
                alignItems: "center", 
                borderWidth: 2, 
                borderColor: theme.BORDER_MEDIUM,
                ...theme.ELEVATION.SMALL
              }}
            >
              <View style={{ 
                position: "absolute", 
                height: "60%", 
                width: 2, 
                backgroundColor: theme.ERROR, 
                transform: [{ rotate: "-45deg" }] 
              }}></View>
              {!note.color && (
                <Ionicons name="checkmark" size={24} color={theme.SUCCESS} />
              )}
            </Pressable>

            {noteColors.map(color => (
              <Pressable 
                onPress={() => changeNoteColor(color)} 
                key={color} 
                style={{ 
                  marginHorizontal: theme.SPACING.SM, 
                  borderRadius: theme.RADIUS.FULL, 
                  width: 44, 
                  height: 44, 
                  backgroundColor: color, 
                  justifyContent: "center", 
                  alignItems: "center",
                  borderWidth: note.color === color ? 3 : 0,
                  borderColor: theme.BACKGROUND_PRIMARY,
                  ...theme.ELEVATION.SMALL
                }}
              >
                {note.color === color && (
                  <Ionicons name="checkmark" size={24} color="white" />
                )}
              </Pressable>
            ))}
          </ScrollView>

          <View style={{ borderColor: "#eee", borderBottomWidth: 1 }} />

          {/* Labels */}
          <ScrollView horizontal contentContainerStyle={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 5, paddingVertical: 10 }}>
            {note.labels?.map(label => (
              <Text key={label} style={{ margin: 5, padding: 5, backgroundColor: "#eee", color: "#666", borderRadius: 3, fontSize: 15 }}>{label}</Text>
            ))}
            <Pressable onPress={() => { SheetManager.hide("noteOptionsActionSheet"); navigation.navigate("NoteLabels", { noteId }); }} style={{ marginLeft: 14, backgroundColor: "#eee", paddingVertical: 5, paddingHorizontal: 8, borderRadius: 3 }} android_ripple={{ color: "#bbb", radius: 200 }} >
              <Text style={{ fontWeight: "500", color: "#666", fontSize: 15 }}>+ Manage labels</Text>
            </Pressable>
          </ScrollView>

          <View style={{ borderColor: "#eee", borderBottomWidth: 1 }} />

          {[
            { onPress: copyToClipboard, iconName: "clipboard-outline", title: "Copy to Clipboard" },
            { onPress: shareNote, iconName: "share-social-outline", title: "Share" },
            { onPress: moveNoteToTrash, iconName: "trash-outline", title: "Delete" },
            { onPress: cloneNote, iconName: "copy-outline", title: "Make a copy" },
            { onPress: togglePin, iconName: note.isPinned ? "pin" : "pin-outline", title: note.isPinned ? "Unpin" : "Pin" },
            { onPress: showAddReminderModal, iconName: "alarm-outline", title: newOrEditMode === "edit" ? "Edit reminder" : "Add a reminder" },
          ]
            .map(({ onPress, iconName, title }) => (
              <Pressable key={title} onPress={onPress} style={styles.sheetItem} android_ripple={{ color: "#999", radius: 200 }}>
                <Ionicons name={iconName} size={25} color="gray" style={{ marginRight: 15 }} />
                <Text color="gray">{title}</Text>
              </Pressable>
            ))}
        </View>
      </ActionSheet>

      <NoteReminderModal {...{ noteReminderModal, setNoteReminderModal, noteId }} />
    </>
  )
}

export default NoteOptionsActionSheet

const styles = StyleSheet.create({
  sheetItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  }
});
