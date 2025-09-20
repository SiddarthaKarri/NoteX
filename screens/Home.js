import { View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Notes from '../components/Notes';
import ActionButton from '../components/ActionButton';
import NotesPageHeader from '../components/NotesPageHeader';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredNotes, setFilteredNotes] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (!isSearchMode) setSearchValue("");
  }, [isSearchMode]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#f8fafc', '#f1f5f9', '#e2e8f0']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        {/* Header */}
        <NotesPageHeader
          {...{
            selectedNotes,
            setSelectedNotes,
            setFilteredNotes,
            isSearchMode,
            setIsSearchMode,
            searchValue,
            setSearchValue
          }}
        />

        {/* Notes list */}
        <Notes
          {...{
            selectedNotes,
            setSelectedNotes,
            filteredNotes,
            isSearchMode,
            setIsSearchMode,
            searchValue
          }}
        />

        {/* Floating Add Note Button */}
        <ActionButton onPress={() => navigation.navigate("AddNote")} />
      </LinearGradient>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
});