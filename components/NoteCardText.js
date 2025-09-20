import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { convertToXTimeAgo } from '../utils/dateformat';
import moment from 'moment';
import theme from '../style/theme';

const NoteCardText = ({ note }) => {
  const isReminderTimePassed = new Date(note.reminder?.dateTime).getTime() < new Date().getTime();

  return (
    <View style={{ 
      paddingHorizontal: theme.SPACING.LG, 
      paddingTop: theme.SPACING.MD, 
      paddingBottom: theme.SPACING.LG 
    }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: theme.SPACING.SM }}>
        {note.color && (
          <View style={{ 
            marginRight: theme.SPACING.SM, 
            borderRadius: theme.RADIUS.FULL, 
            width: 12, 
            height: 12, 
            backgroundColor: note.color 
          }}></View>
        )}
        <Text style={{ 
          flex: 1, 
          color: theme.TEXT_MUTED, 
          fontSize: theme.FONT_SIZES.SM,
          fontWeight: '500'
        }}>{convertToXTimeAgo(note.updatedAt)}</Text>
        {note.isBookmarked && (
          <Ionicons name={"bookmark"} size={18} color={theme.WARNING} style={{ marginHorizontal: theme.SPACING.XS }} />
        )}
        {note.isPinned && (
          <Ionicons name={"pin"} size={18} color={theme.INFO} style={{ marginHorizontal: theme.SPACING.XS }} />
        )}
      </View>

      {note.labels.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ 
          flexDirection: "row", 
          alignItems: "center", 
          paddingBottom: theme.SPACING.SM 
        }}>
          {note.labels?.map(label => (
            <Text key={label} style={{ 
              marginRight: theme.SPACING.SM, 
              paddingVertical: theme.SPACING.XS, 
              paddingHorizontal: theme.SPACING.SM, 
              backgroundColor: theme.BACKGROUND_TERTIARY, 
              color: theme.TEXT_SECONDARY, 
              borderRadius: theme.RADIUS.SM, 
              fontSize: theme.FONT_SIZES.XS,
              fontWeight: '600'
            }}>{label}</Text>
          ))}
        </ScrollView>
      )}

      {note.reminder?.dateTime && (
        <View style={{ 
          flexDirection: "row", 
          alignSelf: "flex-start", 
          marginBottom: theme.SPACING.SM, 
          paddingVertical: theme.SPACING.XS, 
          paddingHorizontal: theme.SPACING.SM, 
          backgroundColor: isReminderTimePassed ? theme.ERROR + '20' : theme.INFO + '20', 
          borderRadius: theme.RADIUS.SM,
          borderLeftWidth: 3,
          borderLeftColor: isReminderTimePassed ? theme.ERROR : theme.INFO,
        }}>
          <Ionicons 
            name="alarm-outline" 
            size={16} 
            color={isReminderTimePassed ? theme.ERROR : theme.INFO} 
            style={{ marginRight: theme.SPACING.XS }} 
          />
          <Text style={[{ 
            color: isReminderTimePassed ? theme.ERROR : theme.INFO, 
            fontSize: theme.FONT_SIZES.XS,
            fontWeight: '600'
          }, isReminderTimePassed && { textDecorationLine: 'line-through' }]}>
            {moment(note.reminder?.dateTime).format("lll")}
          </Text>
        </View>
      )}

      <Text numberOfLines={5} style={{ 
        color: theme.TEXT_PRIMARY, 
        fontSize: theme.FONT_SIZES.MD, 
        lineHeight: 24,
        fontWeight: '400'
      }}> {note.text} </Text>
    </View>
  )
}

export default NoteCardText
