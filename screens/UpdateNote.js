import { Alert, Pressable, Text, TextInput, View, ToastAndroid, BackHandler } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { storeData } from '../utils/storage';
import { useGlobalContext } from '../context/context';
import { Ionicons } from '@expo/vector-icons';
import { convertToXTimeAgo } from '../utils/dateformat';
import { SheetManager } from "react-native-actions-sheet";
import NoteOptionsActionSheet from '../components/NoteOptionsActionSheet';
import moment from 'moment';
import NoteReminderModal from '../components/NoteReminderModal';
import ActionButton from '../components/ActionButton';
import theme from '../style/theme';

const UpdateNote = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocussed = useIsFocused();
  const { notes, setNotes } = useGlobalContext();
  const [noteReminderModal, setNoteReminderModal] = useState(false);

  const noteId = route.params.id;
  const note = notes.find(note => note.id === noteId);
  const [formData, setFormData] = useState({ text: note?.text || '' });

  // Navigate back if note is deleted
  useEffect(() => {
    if (!note) {
      navigation.navigate("Home");
      return;
    }
  }, [note, navigation]);

  // Update formData when note changes
  useEffect(() => {
    if (note) {
      setFormData({ text: note.text });
    }
  }, [note?.color, note?.text]); // Re-run when color or text changes

  // Early return if note doesn't exist
  if (!note) {
    return null;
  }

  useEffect(() => {
    const backAction = () => {
      if (!isFocussed) return false;
      if (formData.text === "" || formData.text === note?.text) return false;
      Alert.alert(
        "Your changes have not been saved.",
        "Do you want to save it?",
        [
          { text: "Yes", onPress: updateNote },
          { text: "No", onPress: navigation.goBack }
        ],
        { cancelable: true }
      );
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, [isFocussed, formData, navigation, updateNote, note?.text]);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const updateNote = useCallback(async () => {
    try {
      if (formData.text === "") return;
      const newNotesArr = notes.map(note => {
        if (note.id !== noteId) return note;
        return { ...note, text: formData.text, updatedAt: new Date() };
      });
      await storeData("notes", newNotesArr);
      setNotes(newNotesArr);
      navigation.navigate("Home");
      ToastAndroid.show("Note saved", ToastAndroid.SHORT);
    } catch (err) {
      Alert.alert("Error", "Some error is there!!");
    }
  }, [formData, notes, setNotes, navigation, noteId]);

  const toggleBookmark = async () => {
    try {
      const newNotesArr = notes.map(note => {
        if (note.id !== noteId) return note;
        return { ...note, isBookmarked: !note.isBookmarked };
      });
      await storeData("notes", newNotesArr);
      setNotes(newNotesArr);
    } catch (err) {
      Alert.alert("Error", "Some error is there!!");
    }
  };

  const updatedAt = convertToXTimeAgo(note?.updatedAt);
  const isReminderTimePassed =
    new Date(note?.reminder?.dateTime).getTime() < new Date().getTime();

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={note?.color ? [note.color, note.color + 'AA', note.color + '66'] : ['#f8fafc', '#f1f5f9', '#e2e8f0']}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        {/* Header Bar */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: 50,
          paddingBottom: theme.SPACING.MD,
          paddingHorizontal: theme.SPACING.LG,
          backgroundColor: 'rgba(255,255,255,0.1)',
        }}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={{
              padding: theme.SPACING.SM,
              borderRadius: theme.RADIUS.MD,
              backgroundColor: 'rgba(255,255,255,0.2)',
              marginRight: theme.SPACING.MD,
            }}
            android_ripple={{ color: 'rgba(255,255,255,0.3)', radius: 20 }}
          >
            <Ionicons name="arrow-back" size={24} color={theme.TEXT_PRIMARY} />
          </Pressable>
          <Text style={{
            flex: 1,
            fontSize: theme.FONT_SIZES.LG,
            fontWeight: theme.FONT_WEIGHTS.SEMIBOLD,
            color: theme.TEXT_PRIMARY,
          }}>Edit Note</Text>
        </View>

        {/* Labels */}
        {note?.labels && note.labels.length > 0 && (
          <View style={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            paddingHorizontal: theme.SPACING.LG,
            paddingVertical: theme.SPACING.SM,
          }}>
            {note.labels.map(label => (
              <View
                key={label}
                style={{
                  margin: theme.SPACING.XS,
                  paddingVertical: theme.SPACING.XS,
                  paddingHorizontal: theme.SPACING.SM,
                  backgroundColor: 'rgba(102, 126, 234, 0.2)',
                  borderRadius: theme.RADIUS.SM,
                }}
              >
                <Text style={{
                  color: theme.PRIMARY_COLOR,
                  fontSize: theme.FONT_SIZES.XS,
                  fontWeight: theme.FONT_WEIGHTS.MEDIUM,
                }}>
                  {label}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Reminder */}
        {note?.reminder?.dateTime && (
          <View style={{
            paddingHorizontal: theme.SPACING.LG,
            paddingBottom: theme.SPACING.SM,
          }}>
            <Pressable
              onPress={() => setNoteReminderModal(true)}
              style={{
                flexDirection: "row",
                alignSelf: "flex-start",
                paddingVertical: theme.SPACING.XS,
                paddingHorizontal: theme.SPACING.SM,
                backgroundColor: 'rgba(237, 137, 54, 0.2)',
                borderRadius: theme.RADIUS.SM,
              }}
              android_ripple={{ color: theme.WARNING + '20', radius: 100 }}
            >
              <Ionicons
                name="alarm-outline"
                size={16}
                color={theme.WARNING}
                style={{ marginRight: theme.SPACING.XS }}
              />
              <Text style={[
                {
                  color: theme.WARNING,
                  fontSize: theme.FONT_SIZES.XS,
                  fontWeight: theme.FONT_WEIGHTS.MEDIUM,
                },
                isReminderTimePassed && { textDecorationLine: "line-through" },
              ]}>
                {moment(note.reminder.dateTime).format("MMM DD, h:mm A")}
              </Text>
            </Pressable>
          </View>
        )}

        {/* Note input - FULL SCREEN */}
        <TextInput
          value={formData.text}
          onChangeText={text => handleChange("text", text)}
          multiline={true}
          style={{
            flex: 1,
            paddingHorizontal: theme.SPACING.LG,
            paddingTop: theme.SPACING.MD,
            paddingBottom: 100, // Space for bottom bar
            fontSize: theme.FONT_SIZES.MD,
            color: theme.TEXT_PRIMARY,
            lineHeight: 24,
            textAlignVertical: "top",
          }}
          placeholder="Write your note here..."
          placeholderTextColor={theme.TEXT_MUTED}
        />      {/* ✅ Bottom bar */}
      <LinearGradient
        colors={['rgba(255,255,255,0.95)', 'rgba(248,250,252,0.9)']}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: theme.SPACING.MD,
          paddingHorizontal: theme.SPACING.LG,
          borderTopWidth: 1,
          borderTopColor: 'rgba(226, 232, 240, 0.5)',
          ...theme.ELEVATION.SMALL,
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <Text
          style={{
            color: theme.TEXT_MUTED,
            fontSize: theme.FONT_SIZES.SM,
            fontWeight: theme.FONT_WEIGHTS.MEDIUM,
          }}
        >
          Edited {updatedAt}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Pressable
            onPress={toggleBookmark}
            style={{
              padding: theme.SPACING.SM,
              borderRadius: theme.RADIUS.MD,
              backgroundColor: note?.isBookmarked
                ? "rgba(102, 126, 234, 0.1)"
                : "transparent",
              marginRight: theme.SPACING.SM,
            }}
            android_ripple={{ color: theme.PRIMARY_COLOR + "20", radius: 25 }}
          >
            <Ionicons
              name={note?.isBookmarked ? "bookmark" : "bookmark-outline"}
              size={24}
              color={
                note?.isBookmarked ? theme.PRIMARY_COLOR : theme.TEXT_MUTED
              }
            />
          </Pressable>
          <Pressable
            onPress={() => SheetManager.show("noteOptionsActionSheet")}
            style={{
              padding: theme.SPACING.SM,
              borderRadius: theme.RADIUS.MD,
              backgroundColor: "transparent",
            }}
            android_ripple={{ color: theme.TEXT_MUTED + "20", radius: 25 }}
          >
            <Ionicons
              name="ellipsis-vertical"
              size={24}
              color={theme.TEXT_MUTED}
            />
          </Pressable>
        </View>
      </LinearGradient>

      {/* ✅ Floating save button */}
      <ActionButton
        iconName="checkmark"
        onPress={updateNote}
        style={{ bottom: 50 }}
        isVisible={formData.text !== note?.text}
      />

      {/* ✅ Action sheet */}
      <NoteOptionsActionSheet {...{ noteId, formData }} />

      {/* ✅ Reminder modal */}
      {note?.reminder?.dateTime && (
        <NoteReminderModal
          {...{ noteReminderModal, setNoteReminderModal, noteId }}
        />
      )}
      </LinearGradient>
    </View>
  );
};

UpdateNote.sharedElements = route => {
  return [
    {
      id: `note.${route.params.id}`,
      animation: "fade",
    },
  ];
};

export default UpdateNote;