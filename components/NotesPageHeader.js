import { View, Text, Pressable, Alert, TextInput, ToastAndroid } from 'react-native'
import React, { useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useGlobalContext } from '../context/context';
import { getData, storeData } from '../utils/storage';
import { getDefaultHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import theme from '../style/theme';

const NotesPageHeader = ({ selectedNotes, setSelectedNotes, setFilteredNotes, isSearchMode, setIsSearchMode, searchValue, setSearchValue }) => {

  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();
  const headerHeight = getDefaultHeaderHeight(frame, false, insets.top);
  const { notes, setNotes } = useGlobalContext();
  const navigation = useNavigation();

  // useFocusEffect(useCallback(() => {
  //   return () => setIsSearchMode(false);
  // }, [setIsSearchMode]));

  useEffect(() => {
    if (searchValue === "") setFilteredNotes(null);
    else setFilteredNotes(notes.filter(note => note.text.toLowerCase().includes(searchValue.toLowerCase())));
  }, [searchValue, notes, setFilteredNotes]);

  const handleDeleteMany = async () => {
    try {
      const notesToTrash = selectedNotes.map(selectedId => notes.find(note => note.id === selectedId));
      const trashNotes = (await getData("trashNotes")) || [];
      const newTrashNotesArr = [...trashNotes, ...notesToTrash];
      await storeData("trashNotes", newTrashNotesArr);

      const newNotesArr = notes.filter(note => !selectedNotes.includes(note.id));
      await storeData("notes", newNotesArr);
      setNotes(newNotesArr);
      ToastAndroid.show("Note moved to trash", ToastAndroid.SHORT);
    }
    catch (err) {
      Alert.alert("Error", "Some error is there!!");
    }
  }

  const handleCloseSelection = () => {
    setSelectedNotes([]);
  }

  const handleSearchBtnClick = () => {
    setIsSearchMode(true);
  }

  const handleCloseSearch = () => {
    setIsSearchMode(false);
  }

  const handleTextChange = (text) => {
    setSearchValue(text);
  }


  return (
    <LinearGradient
      colors={['rgba(255,255,255,0.98)', 'rgba(248,250,252,0.95)']}
      style={{ 
        height: headerHeight, 
        paddingTop: insets.top, 
        justifyContent: "center", 
        borderBottomWidth: 0,
        ...theme.ELEVATION.MEDIUM
      }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >

      {!isSearchMode ? (
        <>
          {selectedNotes.length == 0 ? (
            <View style={{ 
              flexDirection: "row", 
              alignItems: "center", 
              paddingHorizontal: theme.SPACING.LG, 
              paddingVertical: theme.SPACING.SM 
            }}>
              <Pressable 
                style={{ 
                  padding: theme.SPACING.SM, 
                  marginRight: theme.SPACING.SM,
                  borderRadius: theme.RADIUS.MD,
                  backgroundColor: 'rgba(102, 126, 234, 0.1)'
                }} 
                onPress={() => navigation.openDrawer()}
                android_ripple={{ color: theme.PRIMARY_COLOR + '30', radius: 20 }}
              >
                <Ionicons name="menu-outline" size={24} color={theme.PRIMARY_COLOR} />
              </Pressable>
              <Text style={{ 
                fontSize: theme.FONT_SIZES.XXL, 
                color: theme.TEXT_PRIMARY,
                fontWeight: theme.FONT_WEIGHTS.BOLD,
                flex: 1,
                letterSpacing: 0.5
              }}>NoteX</Text>
              <Pressable 
                style={{ 
                  width: 44, 
                  height: 44, 
                  borderRadius: theme.RADIUS.MD, 
                  justifyContent: "center", 
                  alignItems: "center",
                  backgroundColor: 'rgba(102, 126, 234, 0.1)'
                }} 
                onPress={handleSearchBtnClick} 
                android_ripple={{ color: theme.PRIMARY_COLOR + '30', radius: 22 }}
              >
                <Ionicons name="search" size={22} color={theme.PRIMARY_COLOR} />
              </Pressable>
            </View>
          ) : (
            <View style={{ 
              flexDirection: "row", 
              alignItems: "center", 
              paddingHorizontal: theme.SPACING.MD, 
              paddingVertical: theme.SPACING.SM 
            }}>
              <Pressable 
                style={{ 
                  padding: theme.SPACING.SM,
                  borderRadius: theme.RADIUS.MD,
                  backgroundColor: 'rgba(71, 85, 105, 0.1)'
                }} 
                onPress={handleCloseSelection} 
                android_ripple={{ color: theme.TEXT_MUTED + '30', radius: 20 }}
              >
                <Ionicons name="chevron-back" size={22} color={theme.TEXT_PRIMARY} />
              </Pressable>
              <Text style={{ 
                marginLeft: theme.SPACING.MD, 
                color: theme.TEXT_PRIMARY, 
                fontSize: theme.FONT_SIZES.LG,
                fontWeight: theme.FONT_WEIGHTS.SEMIBOLD,
                flex: 1
              }}>{selectedNotes.length} selected</Text>
              <Pressable 
                style={{ 
                  padding: theme.SPACING.SM,
                  borderRadius: theme.RADIUS.MD,
                  backgroundColor: 'rgba(239, 68, 68, 0.1)'
                }} 
                onPress={handleDeleteMany} 
                android_ripple={{ color: theme.ERROR + '30', radius: 20 }}
              >
                <Ionicons name="trash" size={22} color={theme.ERROR} />
              </Pressable>
            </View>
          )}
        </>
      ) : (
        <View style={{ 
          height: "100%", 
          flexDirection: "row", 
          alignItems: "center", 
          paddingTop: 5, 
          backgroundColor: 'rgba(255,255,255,0.9)',
          borderRadius: theme.RADIUS.LG,
          marginHorizontal: theme.SPACING.MD,
          ...theme.ELEVATION.SMALL
        }}>
          <Pressable 
            style={{ 
              margin: 10, 
              width: 40, 
              height: 40, 
              justifyContent: "center", 
              alignItems: "center",
              borderRadius: theme.RADIUS.MD
            }} 
            onPress={handleCloseSearch} 
            android_ripple={{ color: "#ccc", radius: 20 }}
          >
            <Ionicons name="arrow-back" size={22} color="#888" />
          </Pressable>
          <TextInput 
            value={searchValue} 
            onChangeText={handleTextChange} 
            autoFocus 
            style={{ 
              flex: 1, 
              height: "100%", 
              fontSize: 16,
              color: theme.TEXT_PRIMARY
            }} 
            placeholder="Search notes..." 
            placeholderTextColor={theme.TEXT_MUTED}
          />
          <Pressable 
            style={{ 
              margin: 10, 
              width: 40, 
              height: 40, 
              justifyContent: "center", 
              alignItems: "center",
              borderRadius: theme.RADIUS.MD
            }} 
            onPress={() => setSearchValue("")} 
            android_ripple={{ color: "#ccc", radius: 20 }}
          >
            <Ionicons name="close" size={22} color="#888" />
          </Pressable>
        </View>
      )}

    </LinearGradient>
  )
}

export default NotesPageHeader
