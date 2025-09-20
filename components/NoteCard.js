import { Pressable, StyleSheet, View, Dimensions } from 'react-native'
import React from 'react'
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming, withSpring, interpolate } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../style/theme';
import NoteCardText from './NoteCardText';

// "isActive" is used in the situation of dragging the note and to check if currently it is being dragged
const NoteCard = ({ note, isActive = false, onPress = () => { }, onLongPress = () => { }, moveNoteToTrash, isAddedInSelection = false }) => {

  const { width: SCREEN_WIDTH } = Dimensions.get("window");
  const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.4;
  const translateX = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const panGesture = useAnimatedGestureHandler({
    onStart: () => {
      scale.value = withSpring(0.98);
    },
    onActive: e => {
      translateX.value = e.translationX;
      const deleteProgress = Math.min(Math.abs(e.translationX) / Math.abs(TRANSLATE_X_THRESHOLD), 1);
      opacity.value = interpolate(deleteProgress, [0, 0.8, 1], [1, 0.6, 0.3]);
    },
    onEnd: () => {
      const shouldBeRemoved = translateX.value < TRANSLATE_X_THRESHOLD;
      if (shouldBeRemoved) {
        translateX.value = withTiming(-SCREEN_WIDTH, { duration: 200 }, (isFinished) => {
          if (isFinished) runOnJS(moveNoteToTrash)(note.id);
        });
        opacity.value = withTiming(0, { duration: 200 });
      } else {
        translateX.value = withSpring(0);
        opacity.value = withSpring(1);
      }
      scale.value = withSpring(1);
    }
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [{
      translateX: translateX.value,
    }, {
      scale: withTiming(isActive ? 1.05 : scale.value, { duration: 200 })
    }],
    opacity: opacity.value,
  }));

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{
      scale: withTiming(isAddedInSelection ? 0.96 : 1, { duration: 200 })
    }]
  }));


  return (
    <View>
      <GestureHandlerRootView>
        <PanGestureHandler onGestureEvent={panGesture} activeOffsetX={-10}>
          <Animated.View style={rStyle}>
            <Animated.View style={cardStyle}>
              {isAddedInSelection ? (
                <LinearGradient
                  colors={theme.PRIMARY_GRADIENT}
                  style={styles({ isAddedInSelection }).gradientContainer}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Pressable
                    onPress={onPress}
                    onLongPress={onLongPress}
                    android_ripple={{ color: "rgba(255,255,255,0.3)", radius: 200 }}
                    style={styles({ isAddedInSelection }).noteCard}
                    delayLongPress={500}
                  >
                    <NoteCardText note={note} />
                  </Pressable>
                </LinearGradient>
              ) : (
                <Pressable
                  onPress={onPress}
                  onLongPress={onLongPress}
                  android_ripple={{ color: theme.PRIMARY_COLOR + '20', radius: 200 }}
                  style={styles({ isAddedInSelection }).noteCard}
                  delayLongPress={500}
                >
                  <NoteCardText note={note} />
                </Pressable>
              )}
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </View>
  );
}


export default NoteCard


const styles = ({ isAddedInSelection }) => StyleSheet.create({
  gradientContainer: {
    borderRadius: theme.RADIUS.LG,
    marginHorizontal: theme.SPACING.MD,
    marginVertical: theme.SPACING.SM,
    padding: 2, // Border width for gradient
    ...theme.ELEVATION.COLORED,
  },
  noteCard: [{
    borderRadius: theme.RADIUS.LG,
    backgroundColor: theme.BACKGROUND_PRIMARY,
    borderWidth: 0,
    marginHorizontal: isAddedInSelection ? 0 : theme.SPACING.MD,
    marginVertical: isAddedInSelection ? 0 : theme.SPACING.SM,
    overflow: 'hidden',
    minHeight: 80,
    ...(isAddedInSelection ? theme.ELEVATION.NONE : theme.ELEVATION.MEDIUM),
  },
  isAddedInSelection ? {
    backgroundColor: theme.BACKGROUND_GLASS,
    marginHorizontal: 0,
    marginVertical: 0,
  } : {}]
})
