import { Alert, Pressable, Text, View, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import scheduleReminderNotification from '../Notifications/scheduleReminderNotification';
import moment from 'moment/moment';
import { useGlobalContext } from '../context/context';
import { storeData } from '../utils/storage';
import { cancelNotification } from '../Notifications/cancelNotification';
import Modal from './Modal';

const NoteReminderModal = ({ noteReminderModal, setNoteReminderModal, noteId }) => {
  const { notes, setNotes } = useGlobalContext();
  const [dateTimePickerMode, setDateTimePickerMode] = useState(null);
  const [inputDateTime, setInputDateTime] = useState(new Date());
  const note = notes.find(note => note.id === noteId);
  const newOrEditMode = note.reminder?.dateTime ? "edit" : "new";

  useEffect(() => {
    if (!noteReminderModal) return;
    if (newOrEditMode === "edit") {
      setInputDateTime(new Date(note.reminder?.dateTime));
    }
    else {
      setInputDateTime(new Date());
    }
  }, [noteReminderModal, note, newOrEditMode]);


  const onDateTimeInputChange = (event, mode) => {
    const value = event.target ? event.target.value : event.nativeEvent?.timestamp;
    if (!value) return;
    
    let newDate = new Date(inputDateTime);
    if (mode === 'date') {
      if (typeof value === 'string') {
        // Web input
        const [year, month, day] = value.split('-');
        newDate.setFullYear(parseInt(year), parseInt(month) - 1, parseInt(day));
      } else {
        // Native picker
        newDate = new Date(value);
      }
    } else if (mode === 'time') {
      if (typeof value === 'string') {
        // Web input
        const [hours, minutes] = value.split(':');
        newDate.setHours(parseInt(hours), parseInt(minutes));
      } else {
        // Native picker
        newDate = new Date(value);
      }
    }
    setInputDateTime(newDate);
    setDateTimePickerMode(null);
  };

  const setOrChangeReminderForNote = async () => {
    try {
      if (newOrEditMode === "edit") {
        await cancelNotification(note.reminder.notifId);
      }
      const notifId = await scheduleReminderNotification({ note, dateTime: inputDateTime });
      const newNotesArr = notes.map(note => {
        if (note.id !== noteId) return note;
        return { ...note, reminder: { dateTime: inputDateTime, notifId } };
      });
      await storeData("notes", newNotesArr);
      setNotes(newNotesArr);
      setNoteReminderModal(false);
    }
    catch (err) {
      Alert.alert("Error", "Some error is there!!");
    }
  }

  const deleteReminderForNote = async () => {
    try {
      await cancelNotification(note.reminder.notifId);
      const newNotesArr = notes.map(note => {
        if (note.id !== noteId) return note;
        return { ...note, reminder: undefined };
      });
      await storeData("notes", newNotesArr);
      setNotes(newNotesArr);
      setNoteReminderModal(false);
    }
    catch (err) {
      Alert.alert("Error", "Some error is there!!");
    }
  }


  return (
    <>
      <Modal visible={noteReminderModal} onRequestClose={() => setNoteReminderModal(false)}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ marginVertical: 10, fontSize: 20, color: "#666" }}>Set Reminder</Text>

          <Pressable onPress={() => setDateTimePickerMode("date")} style={{ width: "90%", paddingVertical: 15, paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" }} android_ripple={{ color: "#bbb", radius: 150 }}>
            <Text>{moment(inputDateTime).format("LL")}</Text>
          </Pressable>

          <Pressable onPress={() => setDateTimePickerMode("time")} style={{ width: "90%", paddingVertical: 15, paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" }} android_ripple={{ color: "#bbb", radius: 150 }}>
            <Text>{moment(inputDateTime).format("LT")}</Text>
          </Pressable>

          <View style={{ width: "100%", flexDirection: "row", justifyContent: "flex-end", marginTop: 10, marginBottom: 5, paddingRight: 20 }}>
            {newOrEditMode === "edit" && (
              <Pressable onPress={deleteReminderForNote} style={{ padding: 10 }} android_ripple={{ color: "#bbb", radius: 60 }}>
                <Text style={{ color: "blue", fontSize: 15 }}>Delete</Text>
              </Pressable>
            )}

            <Pressable onPress={() => setNoteReminderModal(false)} style={{ padding: 10 }} android_ripple={{ color: "#bbb", radius: 60 }}>
              <Text style={{ color: "blue", fontSize: 15 }}>Cancel</Text>
            </Pressable>

            <Pressable onPress={setOrChangeReminderForNote} style={{ padding: 10 }} android_ripple={{ color: "#bbb", radius: 60 }}>
              <Text style={{ color: "blue", fontSize: 15 }}>Set</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {dateTimePickerMode && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            minWidth: '300px'
          }}>
            <h3 style={{ margin: '0 0 15px 0', textAlign: 'center' }}>
              Select {dateTimePickerMode === 'date' ? 'Date' : 'Time'}
            </h3>
            <input
              type={dateTimePickerMode}
              defaultValue={
                dateTimePickerMode === 'date' 
                  ? moment(inputDateTime).format('YYYY-MM-DD')
                  : moment(inputDateTime).format('HH:mm')
              }
              onChange={(e) => onDateTimeInputChange(e, dateTimePickerMode)}
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '16px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                marginBottom: '15px'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => setDateTimePickerMode(null)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#f0f0f0',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default NoteReminderModal
